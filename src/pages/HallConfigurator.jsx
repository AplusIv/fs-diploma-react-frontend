import { useEffect, useState } from "react"

import HallConfiguratorPlaces from "./HallConfiguratorPlaces"
import HallConfiguratorTitles from "./HallConfiguratorTitles"
import SectionButtons from "./SectionButtons"
import SectionHeader from "./SectionHeader"
import axios from "axios"
import apiClient from "../services/api"
import { addPlacesToDB, addPlacesToHall, deletePlacesFromHall, deletePlacesFromHall2, /* getPlaces, */ getPlacesByHall, updateHallInDB, updateHallPlaces, updatePlacesTypes } from "../services/DBUpdater"
import { useDispatch, useSelector } from "react-redux"
import { getHalls } from "../redux/slices/hallSlice"

import { changeData, handleNewHallsAndPlaces, putPlaceData, setConfiguration, setHalls, setPlaces, setPlacesCombinedByHalls, setPlaceType, setRefreshDataStatus, setSelectedHallId } from "../redux/slices/hallPlacesSlice"
import { getPlaces } from "../redux/slices/placeSlice"
import { prepareHallPlaces } from "../services/hallConfiguratorFunctions"
import { compareFnByPlaceAssending } from "../services/sorterFunctions"

const HallConfigurator = () => {

  // Показ/скрытие секции
  const [isActiveHeaderState, setIsActiveHeaderState] = useState(true);

  const handleClick = (e) => {
    console.log(e.currentTarget.className);
    // if (e.target.contains)
    if (e.currentTarget.classList.contains('conf-step__header')) {
      setIsActiveHeaderState(!isActiveHeaderState);
    }
    // setIsActiveHeaderState(!isActiveHeaderState);
  }

  const [isLoading, setIsLoading] = useState(undefined);
  console.log({isLoading});
  
  // const [refreshData, setRefreshData] = useState(undefined);
  // console.log({refreshData});


  // Redux
  const dispatch = useDispatch();
  const hallsRedux = useSelector(state => state.hallsReducer.halls);
  const placesRedux = useSelector(state => state.placesReducer.places);

  const hallsReduxLoading = useSelector(state => state.hallsReducer.loading);
  console.log({hallsReduxLoading});
  const placesReduxLoading = useSelector(state => state.placesReducer.loading);
  console.log({ placesReduxLoading });

  const placesConfigurationRedux = useSelector(state => state.hallPLacesReducer.configuration);
  console.log({placesConfigurationRedux});

  const hallConfiguratorPlacesRedux = useSelector(state => state.hallPLacesReducer.places);
  console.log({hallConfiguratorPlacesRedux});

  const selectedHallId = useSelector(state => state.hallPLacesReducer.selectedHallId);

  const refreshDataStatusRedux = useSelector(state => state.hallPLacesReducer.refreshDataStatus);
  console.log({refreshDataStatusRedux});  


  // useEffect(() => {
  //   console.log('hallConfigurator effect is on');
  //   setIsLoading(true);

  //   dispatch(getHalls()); // загрузка залов
  //   dispatch(getPlaces()); // загрузка зрительских мест
  // }, []);

  useEffect(() => {
    console.log('hallConfigurator effect 2 is on');
    
    dispatch(setPlaces(placesRedux)); // заполнение массива зрительских мест, загруженных из placeSlice при помощи эффекта
    dispatch(setHalls(hallsRedux));
    dispatch(setConfiguration(hallsRedux)); // заполнение конфигурации количества рядов/мест данными залов, загруженных из hallSlice при помощи эффекта

    setIsLoading(false);
    // setRefreshData('nothing to refresh');
    // dispatch(setRefreshDataStatus('data refreshed'));

    if (refreshDataStatusRedux !== 'initial data is loaded') {
      dispatch(setRefreshDataStatus('data refreshed'));
    }
  }, [hallsRedux, placesRedux, refreshDataStatusRedux])

  
  // показ выбранного зала
  const handleChange = (e) => {
    dispatch(setSelectedHallId(e.target.value));
  }

  const handleInput = (e) => {
    const {name, value} = e.target;
    // redux
    dispatch(changeData({property: name, value})); 
  }

  const handleRefresh = () => {
    // setRefreshData('refresh data');
    dispatch(setRefreshDataStatus('refresh data')); // перезапуск стартового useEffect

    /* // before Redux
    // (1) Возврат к БД конфигурации для всех залов
    let refreshedConfigurations = [];
    halls.forEach(hall => {
      const configuration = {
        hall_id: hall.id,
        rows: hall.rows,
        places: hall.places
      }
      refreshedConfigurations.push(configuration);
    })

    setConfigurations(refreshedConfigurations);

    // Возврат к местам, сохраненным в БД
    setPlacesState(handlePlaceStateFromDBData(places)); */
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submit');

    // 1) Есть ли изменения в конфигурации залов
    let configurationHallDiffs = []; // Залы с новой конфигурацией
    let sameConfigurationHalls = []; // Залы с неизменившейся конфигурацией
    hallsRedux.filter(hallData => {
      const configuration = placesConfigurationRedux.find(configuration => configuration.hall_id === hallData.id);

      if (!(hallData.rows === configuration.rows && hallData.places === configuration.places)) {
        configurationHallDiffs.push({ ...hallData, rows: configuration.rows, places: configuration.places });
        return true;
      } else {
        sameConfigurationHalls.push({...hallData});
        return false;
      }
    })

    console.log({ configurationHallDiffs }); // Залы, где изменилась конфигурация мест
    console.log({ sameConfigurationHalls });

    // Все залы, где изменились типы мест
    const getDiffs = (arr1, arr2) => {
      return arr1.filter(arr1El => {
        const arr2El = arr2.find(el => el.row === arr1El.row && el.place === arr1El.place && el.hall_id === arr1El.hall_id);
        if (arr2El) return (arr1El.type !== arr2El.type) ? true : false;
      })
    };
   
    const arrDiffs = getDiffs(hallConfiguratorPlacesRedux, placesRedux);
    const diffsMap = arrDiffs.map(diff => diff.hall_id);
    const uniqueDiffs = [...new Set(diffsMap)]; // добавить единожды номера залов
    console.log({uniqueDiffs});

    // 2) В массивы собираются данные для обновления на сервере
    let updatePlaceTypeArray = []; // места с прежней конфигурацией мест, где нужно обновить типы мест
    
    let updateHallConfigurationArray = []; // измененная конфигурация зала/залов
    let updateNewPlaceTypeArray = []; // места с новой конфигурацией мест

    uniqueDiffs.forEach(hall_id => {
      const differentHallConfiguration = configurationHallDiffs.find(configuration => configuration.id === hall_id);
      if (differentHallConfiguration) {
        console.log('зал с изменённой конфигурацией -> обновить зал и места');
        const updatedHall = {
            id: differentHallConfiguration.id,
            title: differentHallConfiguration.title,
            rows: differentHallConfiguration.rows,
            places: differentHallConfiguration.places,
            normal_price: Number(differentHallConfiguration.normal_price).toFixed(2),
            vip_price: Number(differentHallConfiguration.vip_price).toFixed(2),
          };

        updateHallConfigurationArray.push(updatedHall);
        updateNewPlaceTypeArray.push({
          hall_id,
          places: hallConfiguratorPlacesRedux.filter(place => place.hall_id === hall_id),
        });
      } else {
        console.log('зал с прежней конфигурацией -> обновить места');
        updatePlaceTypeArray.push({
          hall_id,
          places: hallConfiguratorPlacesRedux.filter(place => place.hall_id === hall_id),
        });
      }
    });

    // redux
    // 3) Вызов экшенов для изменения залов, количества мест и типов мест
    if (updateHallConfigurationArray.length > 0) {
      // изменить конфигурацию залов, удалить прежние места и создать новые, обновить типы мест
      dispatch(handleNewHallsAndPlaces({
        hallDataArray: updateHallConfigurationArray, 
        placeDataArray: [...updateNewPlaceTypeArray, ...updatePlaceTypeArray], // обновить все изменённые типы мест одним запросом
      }));
    } else if (updatePlaceTypeArray.length > 0) {
      // изменить только типы мест
      dispatch(putPlaceData(updatePlaceTypeArray));
    }
  }
  
  const handlePlaceType = (placeId) => {
    dispatch(setPlaceType(placeId));
  }

  if (hallsReduxLoading !== 'idle' || placesReduxLoading !== 'idle') {
    return (
      <section className="conf-step" > 
        <SectionHeader name={'Конфигурация залов'} isActiveHeaderState={isActiveHeaderState} handleClick={handleClick} />
        <div className="conf-step__wrapper">
          <span className="loader" ></span>
        </div>
      </section>
    )
  }

  return (
    <section className="conf-step">
      <SectionHeader name={'Конфигурация залов'} isActiveHeaderState={isActiveHeaderState} handleClick={handleClick} />

      {<div className="conf-step__wrapper">
        <form onSubmit={handleSubmit}>
          <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
          {/* <HallConfiguratorTitles halls={halls} name="chairs-hall" handleChange={handleChange}/> */}
          <HallConfiguratorTitles name="chairs-hall" handleChange={handleChange}/>

          <p className="conf-step__paragraph">Укажите количество рядов и максимальное количество кресел в ряду:</p>
          <div className="conf-step__legend">
            <label className="conf-step__label">Рядов, шт
              <input
                type="text"
                name="rows"
                className="conf-step__input"
                value={placesConfigurationRedux.length > 0 ?
                  placesConfigurationRedux.find(configuration => configuration.hall_id === selectedHallId).rows
                  :
                  ''
                }
                onChange={handleInput}
                placeholder="10" />
            </label>
            <span className="multiplier">x</span>
            <label className="conf-step__label">Мест, шт
              <input
                type="text"
                name="places"
                className="conf-step__input"
                value={placesConfigurationRedux.length > 0 ?
                  placesConfigurationRedux.find(configuration => configuration.hall_id === selectedHallId).places
                  :
                  ''
                }
                onChange={handleInput}
                placeholder="8" />
            </label>
          </div>
          <p className="conf-step__paragraph">Теперь вы можете указать типы кресел на схеме зала:</p>
          <div className="conf-step__legend">
            <span className="conf-step__chair conf-step__chair_standart"></span> — обычные кресла
            <span className="conf-step__chair conf-step__chair_vip"></span> — VIP кресла
            <span className="conf-step__chair conf-step__chair_disabled"></span> — заблокированные (нет кресла)
            <p className="conf-step__hint">Чтобы изменить вид кресла, нажмите по нему левой кнопкой мыши</p>
          </div>

          <div className="conf-step__hall">
            {placesConfigurationRedux.length > 0 ? <HallConfiguratorPlaces
              places={prepareHallPlaces(
                hallConfiguratorPlacesRedux, 
                placesConfigurationRedux.find(configuration => configuration.hall_id === selectedHallId), 
                hallsRedux.find(hall => hall.id === selectedHallId), 
                compareFnByPlaceAssending)}
              handlePlaceType={handlePlaceType}
            /> : null}
          </div>

          <SectionButtons handleRefresh={handleRefresh} />
        </form>
      </div>}
    </section>
  )
}

export default HallConfigurator