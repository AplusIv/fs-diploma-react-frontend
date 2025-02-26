import { useState } from "react"

import HallConfiguratorPlaces from "./HallConfiguratorPlaces"
import HallConfiguratorTitles from "./HallConfiguratorTitles"
import SectionButtons from "./SectionButtons"
import SectionHeader from "./SectionHeader"
import axios from "axios"
import apiClient from "../services/api"
import { addPlacesToDB, addPlacesToHall, deletePlacesFromHall, deletePlacesFromHall2, getPlaces, getPlacesByHall, updateHallInDB, updateHallPlaces, updatePlacesTypes } from "../services/DBUpdater"

const HallConfigurator = ({ halls, places }) => {

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

  // места с сервера
  const placesData = [...places];
  console.log({ placesData });

  let placesByHall = [];

  halls.forEach(hall => {
    const filteredPlaces = places.filter(place => place.hall_id === hall.id);
    placesByHall.push(filteredPlaces);
  })

  console.log({ placesByHall });


  // выбранный зал (для выгрузки плана зала)
  const [hall, setHall] = useState((halls.length > 0) ? halls[0] : undefined);

  // выбранное название зала
  const [checked, setChecked] = useState((halls.length > 0) ? halls[0].title : undefined);

  // Количество рядов/мест в залах
  let initialConfigurations = [];
  halls.forEach(hall => {
    const configuration = {
      hall_id: hall.id,
      rows: hall.rows,
      places: hall.places
    }
    initialConfigurations.push(configuration);
  })

  const [configurations, setConfigurations] = useState(initialConfigurations);
  console.log({ configurations });

  
  // Функции сравнения для сортировки массивов
  const compareFn = (a, b) => Number(a.id) - Number(b.id); // сортировка объектов по возрастанию
  const compareFnByPlaceAssending = (a, b) => Number(a.place) - Number(b.place); // сортировка объектов по возрастанию

  // Создание состояния для мест на основе переданных данных из БД
  const handlePlaceStateFromDBData = (places) => {
    return places.map(place => {
      return {
        id: place.id,
        // configuration_id: `${++PlaceId}`,
        hall_id: place.hall_id,
        row: place.row,
        place: place.place,
        type: place.type,
        // is_free: true,
        is_selected: true
      };
    })
  }

  const [placesState, setPlacesState] = useState(handlePlaceStateFromDBData(places));
  // const [placesState, setPlacesState] = useState(initialPlaces);
  console.log({ placesState });

  // места в зависимости от зала
  const prepareHallPlaces = (places, configuration, hall, sorterFn) => {

    let placesGroupedByRow = [];

    // const placesCopy = [...places];
    const placesByHall = places.filter(place => place.hall_id === hall.id);

    // placesByHall.sort(compareFn); // сортировка мест из БД


    for (let index = 1; index <= configuration.rows; index++) {
      const rowPlaces = placesByHall.filter(place => place.row === index);
      // placesGroupedByRow.push(rowPlaces);
      placesGroupedByRow.push(rowPlaces.sort(sorterFn));
    }

    console.log({ placesGroupedByRow });

    return placesGroupedByRow;
  }

  // показ выбранного зала
  const handleChange = (e) => {
    console.log(checked);

    console.log('handleChange');
    setChecked(e.target.value);

    const chosenHall = halls.find(hall => hall.title === e.target.value); // возвращаю нужный зал

    console.log(chosenHall);
    setHall((previousHall) => ({ ...previousHall, ...chosenHall }));
  }

  // создание новых мест по заданной конфигурации (для изменения конфигурации зала)
  const handleNewPlaces = (configuration, placeId, sorterFn) => {
    const newPlaces = [];
    const placesAmount = configuration.rows * configuration.places;

    let p = 1; // первое место

    let r = 1; // первый ряд

    for (let index = 0; index < placesAmount; index++) {

      const hallPlace = {
        id: ++placeId,
        hall_id: configuration.hall_id,
        row: r,
        place: p,
        type: "standart",
        is_selected: true
      };

      newPlaces.push(hallPlace);

      p++;

      if (p > configuration.places) {
        r++;
        p = 1;
      }
    }

    newPlaces.sort(sorterFn);
    console.log({ newPlaces });
    return newPlaces;
  }

  const handleInput = (e) => {
    console.log('handleInput');

    // setConfiguration({...configuration, [e.target.name]: Number(e.target.value)});
    // console.dir(e.target.name);
    // console.log(e.target.value);


    const newConfigurations = configurations.map(configuration => {
      if (configuration.hall_id === hall.id) {
        return { ...configuration, [e.target.name]: Number(e.target.value) }
      } else {
        return configuration;
      }
    })

    setConfigurations(newConfigurations);

    // Подготовка новых мест при изменившейся конфигурации зала
    const sortedStatePlaces = [...placesState].sort(compareFn);

    const filtredSortedStatePlaces = sortedStatePlaces.filter(place => !(place.hall_id === hall.id)); // удаление мест с прошлой конфигурацией
    console.log({ filtredSortedStatePlaces });

    const newConfiguration = newConfigurations.find(configuration => configuration.hall_id === hall.id);

    const lastStatePlacesId = filtredSortedStatePlaces[filtredSortedStatePlaces.length - 1].id;
    console.log({ lastStatePlacesId });

    const newPlacesOfCurrentHall = handleNewPlaces(newConfiguration, lastStatePlacesId, compareFn); // создание мест с изменённой конфигурацией

    const newPlaces = [...filtredSortedStatePlaces, ...newPlacesOfCurrentHall];

    setPlacesState(newPlaces);
  }

  const handleRefresh = () => {
    console.log('refresh');

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
    setPlacesState(handlePlaceStateFromDBData(places));
  }

  // рабочий вариант
  // const handleHallConfiguration = async (hall) => {
  //   console.log(hall);

  //   // const findedHall = halls.find(o => o.id === hall.hall_id);
  //   const updatedHall = {
  //     title: hall.title,
  //     rows: hall.rows,
  //     places: hall.places,
  //     normal_price: Number(hall.normal_price).toFixed(2),
  //     vip_price: Number(hall.vip_price).toFixed(2)
  //   };

  //   await updateHallInDB(hall.id, updatedHall); // обновить зал
  //   await deletePlacesFromHall(hall.id); // удалить прошлые места из БД
  //   await addPlacesToDB(hall); // заполнить новыми данными БД изменённой конфигурацией

  //   await handleUpdatePlaces(findPLacesToUpdate, hall);
  // }

  const handleHallConfiguration = async (hall) => {
    console.log(hall);

    // const findedHall = halls.find(o => o.id === hall.hall_id);
    const updatedHall = {
      title: hall.title,
      rows: hall.rows,
      places: hall.places,
      normal_price: Number(hall.normal_price).toFixed(2),
      vip_price: Number(hall.vip_price).toFixed(2)
    };

    await updateHallInDB(hall.id, updatedHall); // обновить зал
    await deletePlacesFromHall2(hall.id); // удалить прошлые места из БД
    await addPlacesToHall(hall.id, updatedHall); // заполнить новыми местами БД с изменённой конфигурацией зала

    // вернуть
    // await handleUpdatePlaces(placesState.filter(place => place.hall_id === hall.id), hall);
    await handleUpdatePlaces(placesState.filter(place => place.hall_id === hall.id), hall.id); // обновить типы мест (при необходимости)
  }


  const findPLacesToUpdate = (places, hall) => {
    let putRequestDatas = [];

    // const DBPlacesByHall = places.filter(place => place.hall_id === hall.id);
    const DBPlacesByHall = places.filter(place => place.hall_id === hall.id);
    const StatePlacesByHall = placesState.filter(place => place.hall_id === hall.id);

    StatePlacesByHall.filter(statePlace => {
      const DBPlace = DBPlacesByHall.find(place => place.row === statePlace.row && place.place === statePlace.place);

      if (!(DBPlace.type === statePlace.type)) {
        putRequestDatas.push({ ...DBPlace, type: statePlace.type });
        return true;
      }
    })

    console.log({ putRequestDatas });
    return putRequestDatas;
  }

  // рабочий вариант
  // const handleUpdatePlaces = async (findPlacesFn, hall) => {
  //   const placesFromDB = await getPlaces();
  //   console.log({ placesFromDB });

  //   const putRequestDatas = findPlacesFn(placesFromDB, hall)

  //   if (putRequestDatas.length > 0) {
  //     await updatePlacesTypes(putRequestDatas);
  //   } else {
  //     console.log('Места для обновления отсутствуют');
  //   }
  // }


  const handleUpdatePlaces = async (findPlacesFn, hall_id) => {
    await updateHallPlaces(findPlacesFn, hall_id);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submit');

    // 1) Есть ли изменения в конфигурации залов
    let configurationHallDiffs = []; // Залы с новой конфигурацией
    let sameConfigurationHalls = []; // Залы с неизменившейся конфигурацией
    halls.filter(hallData => {
      const configuration = configurations.find(configuration => configuration.hall_id === hallData.id);

      // return (!(hallData.rows === configuration.rows && hallData.places === configuration.places))

      if (!(hallData.rows === configuration.rows && hallData.places === configuration.places)) {
        configurationHallDiffs.push({ ...hallData, rows: configuration.rows, places: configuration.places });
        return true;
      } else {
        sameConfigurationHalls.push({...hallData});
        return false;
      }
    })

    // console.log({ configurationHallDiffs }); // Залы, где изменилась конфигурация мест
    // console.log({ sameConfigurationHalls });

    // Все залы, где изменились типы мест
    const getDiffs = (arr1, arr2) => {
      return arr1.filter(arr1El =>{
        const arr2El = arr2.find(el => el.row === arr1El.row && el.place === arr1El.place && el.hall_id === arr1El.hall_id);
        if (arr2El) return (arr1El.type !== arr2El.type) ? true : false;
      })
    };
   
    const arrDiffs = getDiffs(placesState, places);
    const diffsMap = arrDiffs.map(diff => diff.hall_id);
    const uniqueDiffs = [...new Set(diffsMap)]; // добавить единожды номера залов
    console.log({uniqueDiffs});

    uniqueDiffs.forEach(hall_id => {
      const differentHallConfiguration = configurationHallDiffs.find(configuration => configuration.id === hall_id);
      if (differentHallConfiguration) {
        console.log('зал с изменённой конфигурацией -> обновить зал и места');
        handleHallConfiguration(differentHallConfiguration);
      } else {
        console.log('зал с прежней конфигурацией -> обновить места');
        handleUpdatePlaces(placesState.filter(place => place.hall_id === hall_id), hall_id);
      }
      // вернуть рабочий вариант
      // handleUpdatePlaces(findPLacesToUpdate, hall); // Обновить типы мест (если требуется)
    });

    // 2) Есть изменения в конфигурации залов
    // if (configurationHallDiffs.length > 0) {
    //   console.log('залы с изменённой конфигурацией');
    //   configurationHallDiffs.forEach(hall => {
    //     handleHallConfiguration(hall);
    //   })
    // } 

    // 3) Нет изменений в конфигурации залов
    // if (sameConfigurationHalls.length > 0) {
    //   // console.log('залы с прежней конфигурацией');
      
    //   // // Все залы, где изменились типы мест
    //   // const diffs = (arr1, arr2) => {
    //   //   return arr1.filter(arr1El =>{
    //   //     const arr2El = arr2.find(el => el.row === arr1El.row && el.place === arr1El.place && el.hall_id === arr1El.hall_id);
    //   //     if (arr2El) return (arr1El.type !== arr2El.type) ? true : false;
    //   //   })
    //   // };
     
    //   // const arrDiffs = diffs(placesState, places);
    //   // const diffsMap = arrDiffs.map(diff => diff.hall_id);
    //   // const uniqueDiffs = [...new Set(diffsMap)]; // добавить единожды номера залов
    //   // console.log({uniqueDiffs});

    //   // uniqueDiffs.forEach(hall_id => {
    //   //   const differentHallConfiguration = configurationHallDiffs.find(configuration => configuration.hall_id === hall_id);
    //   //   if (differentHallConfiguration) {
    //   //     console.log('зал с изменённой конфигурацией -> обновить зал и места');
    //   //     handleHallConfiguration(differentHallConfiguration);
    //   //   } else {
    //   //     console.log('зал с прежней конфигурацией -> обновить места');
    //   //     handleUpdatePlaces(placesState.filter(place => place.hall_id === hall_id), hall_id);
    //   //   }
    //   //   // вернуть рабочий вариант
    //   //   // handleUpdatePlaces(findPLacesToUpdate, hall); // Обновить типы мест (если требуется)
    //   // });
      
    //   // // рабочий вариант
    //   // sameConfigurationHalls.forEach(hall => {
    //   //   handleUpdatePlaces(placesState.filter(place => place.hall_id === hall.id), hall.id);
    //   //   // вернуть рабочий вариант
    //   //   // handleUpdatePlaces(findPLacesToUpdate, hall); // Обновить типы мест (если требуется)
    //   // })
    // }
  }
  
  const handlePlaceType = (placeId) => {
    console.log('handlePlaceType');

    const modifiedPlaces = placesState.map(place => {
      if (place.id === placeId) {
        console.log({ placeId });

        let chosenPlace = { ...place }; // копия исходного объекта, чтобы не перезаписать его

        switch (place.type) {
          case 'standart':
            chosenPlace.type = 'vip';
            break;
          case 'vip':
            chosenPlace.type = 'disabled';
            break;
          case 'disabled':
            chosenPlace.type = 'standart';
            break;
        }
        return chosenPlace;
      } else {
        return place;
      }
    })
    console.log({ modifiedPlaces });

    setPlacesState(modifiedPlaces);
  }

  return (
    <section className="conf-step">
      <SectionHeader name={'Конфигурация залов'} isActiveHeaderState={isActiveHeaderState} handleClick={handleClick} />

      <div className="conf-step__wrapper">
        <form onSubmit={handleSubmit}>
          <p className="conf-step__paragraph">Выберите зал для конфигурации:</p>
          <HallConfiguratorTitles halls={halls} name="chairs-hall" handleChange={handleChange} checked={checked} />
          <p className="conf-step__paragraph">Укажите количество рядов и максимальное количество кресел в ряду:</p>
          <div className="conf-step__legend">
            <label className="conf-step__label">Рядов, шт
              <input
                type="text"
                name="rows"
                className="conf-step__input"
                value={configurations.find(configuration => configuration.hall_id === hall.id).rows}
                onChange={handleInput}
                placeholder="10" />
            </label>
            <span className="multiplier">x</span>
            <label className="conf-step__label">Мест, шт
              <input
                type="text"
                name="places"
                className="conf-step__input"
                value={configurations.find(configuration => configuration.hall_id === hall.id).places}
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
            <HallConfiguratorPlaces
              // hall={ hall } 
              places={prepareHallPlaces(placesState, configurations.find(configuration => configuration.hall_id === hall.id), hall, compareFnByPlaceAssending)}
              handlePlaceType={handlePlaceType}
            />
          </div>

          <SectionButtons handleRefresh={handleRefresh} />
        </form>
      </div>
    </section>
  )
}

export default HallConfigurator