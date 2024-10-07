import { useState } from "react"
import apiClient from "../services/jsonServerApi"

import HallConfiguratorPlaces from "./HallConfiguratorPlaces"
import HallConfiguratorTitles from "./HallConfiguratorTitles"
import SectionButtons from "./SectionButtons"
import SectionHeader from "./SectionHeader"
import axios from "axios"

const HallConfigurator = ({ halls, places }) => {

  // места с сервера
  const placesData = [...places];
  console.log({ placesData });

  // let data;
  apiClient.get(`/places`)
    .then(response => {
      console.log(response);
      // data = response.data;
    })
    .catch(error => {
      console.error(error.response.status);
    });


  // выбранный зал (для выгрузки плана зала)
  const [hall, setHall] = useState(halls[0]);

  // выбранное название зала
  const [checked, setChecked] = useState('Зал 1');

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

  // Создание стандартных зрительских мест при заданной конфигурации и количестве залов
  const makeStandartPlaces = (halls, configurations, sorterFn) => {
    let placesArray = [];
    let PlaceId = -1;
    halls.forEach(hall => {
      // const configuration = hall.rows * hall.places;
      const configuration = configurations.find(configuration => configuration.hall_id === hall.id);
      const placesAmount = configuration.rows * configuration.places;
      console.log({ placesAmount });

      let p = 1; // первое место

      let r = 1; // первый ряд

      for (let index = 0; index < placesAmount; index++) {
        // lastPlaceId = +lastPlaceId + 1;
        const hallPlace = {
          id: `${++PlaceId}`,
          hall_id: hall.id,
          row: r,
          place: p,
          type: "standart",
          is_free: true,
          is_selected: true
        };

        placesArray.push(hallPlace);

        p++;

        if (p > configuration.places) {
          r++;
          p = 1;
        }
      }

      placesArray.sort(sorterFn);
      console.log({ placesArray });

    });

    return placesArray;
  }



  // зрительские места (новая версия)
  const compareFn = (a, b) => Number(a.id) - Number(b.id); // сортировка объектов по возрастанию

  const placesArray = makeStandartPlaces(halls, configurations, compareFn);

  console.log({ places });


  let initialPlaces;

  console.log(placesArray.length === places.length);

  // (placesArray.length === places.length) ? initialPlaces = [...places] : initialPlaces = [...placesArray]

  if (places.length > 0) {
    initialPlaces = places.map(place => {
      return { ...place };
    })
  } else {
    initialPlaces = [...placesArray];
  }

  // if (placesArray.length === places.length) {
  //   initialPlaces = places.map(place => {
  //     return { ...place };
  //   })
  // } else {
  //   initialPlaces = [...placesArray];
  // }

  initialPlaces.sort(compareFn);
  console.log({ initialPlaces });

  // const [placesState, setPlacesState] = useState(places);
  const [placesState, setPlacesState] = useState(initialPlaces);
  console.log({ placesState });

  // состояние в зависимости от зала
  // const placesStateCopy = [...placesState];
  // const initialHallPlaces = placesStateCopy.filter(place => place.hall_id === hall.id);
  // initialHallPlaces.sort(compareFn);

  // const [hallPlaces, setHallPlaces] = useState(initialHallPlaces);
  // console.log({ hallPlaces });


  // Показ/скрытие секции
  const [isActiveHeaderState, setIsActiveHeaderState] = useState(true);


  // const prepareHallPlaces = (places, configuration) => {
  //   let rowsGroupedByRow = [];

  //   places.sort(compareFn); // сортировка мест из БД

  //   for (let index = 1; index <= configuration.rows; index++) {
  //     const row = places.filter(place => place.row === index);
  //     rowsGroupedByRow.push(row);
  //   }
  //   return rowsGroupedByRow;
  // }

  const prepareHallPlaces = (places, configuration, hall) => {

    let placesGroupedByRow = [];

    const placesCopy = [...places];
    const placesByHall = placesCopy.filter(place => place.hall_id === hall.id);

    placesByHall.sort(compareFn); // сортировка мест из БД


    for (let index = 1; index <= configuration.rows; index++) {
      const rowPlaces = placesByHall.filter(place => place.row === index);
      placesGroupedByRow.push(rowPlaces);
    }

    console.log({ placesGroupedByRow });

    return placesGroupedByRow;
  }

  const handleClick = (e) => {
    console.log(e.currentTarget.className);
    // if (e.target.contains)
    if (e.currentTarget.classList.contains('conf-step__header')) {
      setIsActiveHeaderState(!isActiveHeaderState);
    }
    // setIsActiveHeaderState(!isActiveHeaderState);
  }

  const handleChange = (e) => {
    console.log(checked);

    console.log('handleChange');
    setChecked(e.target.value);

    const chosenHall = halls.find(hall => hall.title === e.target.value); // возвращаю нужный зал

    console.log(chosenHall);
    setHall((previousHall) => ({ ...previousHall, ...chosenHall }));

    // const allPlacesCopy = [...placesState];
    // const changedHallPlaces = allPlacesCopy.filter(place => place.hall_id === chosenHall.id);
    // changedHallPlaces.sort(compareFn);
    // setHallPlaces(changedHallPlaces);
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

    const newPlaces = makeStandartPlaces(halls, newConfigurations, compareFn);

    console.log({ newPlaces });

    setPlacesState(newPlaces);
  }

  const handleRefresh = () => {
    console.log('refresh');

    // Возврат к конфигурации
    const refreshedConfigurations = configurations.map(configuration => {
      if (configuration.hall_id === hall.id) {
        return { ...configuration, rows: Number(hall.rows), places: Number(hall.places) }
      } else {
        return configuration;
      }
    })

    setConfigurations(refreshedConfigurations);
    // setConfiguration((previousConfiguration) => ({...previousConfiguration, rows: Number(hall.rows), places: Number(hall.places)}));

    let refreshedPlaces;

    if (places.length > 0) {
      apiClient.get(`/places`)
        .then(response => {
          console.log(response);
          const placesData = response.data;

          // сброс всех мест к сохраненным в БД
          // const refreshedPlaces = placesData.map(placeData => placeData);
          refreshedPlaces = [...placesData];
          setPlacesState(refreshedPlaces);

          // const filteredByHallPlaces = refreshedPlaces.filter(place => place.hall_id === hall.id);
          // filteredByHallPlaces.sort(compareFn);
          // console.log({ filteredByHallPlaces });

          // setHallPlaces(filteredByHallPlaces);

          // console.log({ hallPlaces });
        })
        .catch(error => {
          console.error(error.response.status);
        });

    } else {
      refreshedPlaces = makeStandartPlaces(halls, refreshedConfigurations, compareFn);
      setPlacesState(refreshedPlaces);

      // const filteredByHallPlaces = refreshedPlaces.filter(place => place.hall_id === hall.id);
      // filteredByHallPlaces.sort(compareFn);
      // console.log({ filteredByHallPlaces });

      // setHallPlaces(filteredByHallPlaces);

      // console.log({ hallPlaces });
    }
  }

  const handleSubmit2 = (e) => {
    e.preventDefault();
    console.log('submit2');

    // Обновление конфигурации мест в залах
    apiClient.get(`/halls`)
      .then(response => {
        console.log(response);
        const hallsData = [...response.data];

        // есть ли изменения с сохранеными в БД
        const newHallsData = hallsData.map(hallData => {
          const configuration = configurations.find(configuration => configuration.hall_id === hallData.id);

          if (!(hallData.rows === configuration.rows && hallData.places === configuration.places)) {
            return { ...hallData, rows: configuration.rows, places: configuration.places }
          }
        });

        // если есть (массив непустой), то (1) обновить конфигурацию в БД
        const filteredNewHallsData = newHallsData.filter(data => data !== undefined);
        if (filteredNewHallsData.length !== 0) {
          console.log(filteredNewHallsData);

          let putRequests = filteredNewHallsData.map(newHallData => apiClient.put(`/halls/${newHallData.id}`, newHallData));
          axios.all(putRequests).then(response => console.log(response)).catch(error => console.log(error));

          // (2) Обновление зрительских мест в БД при изменившейся конфигурации залов
          apiClient.get(`/places`)
            .then(response => {
              console.log(response.data);
              const placesData = response.data;

              // если есть сохраненные места в БД
              if (placesData.length !== 0) {
                // Очистим таблицу Places
                let deleteRequests = placesData.map(place => apiClient.delete(`/places/${place.id}`));
                axios.all(deleteRequests).then((data) => {
                  console.log(data);
                  
                  // Заполним заново новыми данными
                  let postRequests = [];

                  for (let index = 0; index < placesState.length; index++) {
                    const element = { ...placesState[index] };
                    postRequests.push(apiClient.post(`/places`, element));
                  }
                  axios.all(postRequests)
                    .then(response => {
                      console.log(response);
                      
                      // Проверка записи в БД
                      apiClient.get(`/places`).then(response => console.log(response));
                    })
                    .catch(error => console.log(error));

                  // apiClient.get(`/places`).then(response => console.log(response));
                });

                // // Заполним заново новыми данными
                // let postRequests = [];

                // for (let index = 0; index < placesState.length; index++) {
                //   const element = { ...placesState[index] };
                //   postRequests.push(apiClient.post(`/places`, element));
                // }
                // axios.all(postRequests).then((data) => console.log(data));
              } else {
                // если мест нет в БД, просто сохраним места из состояния
                let requests = placesState.map(place => apiClient.post(`/places`, place));
                axios.all(requests)
                  .then(response => {
                    console.log(response);
                    apiClient.get(`/places`).then(response => console.log(response));
                  })
                  .catch(error => console.log(error));



                // apiClient.get(`/places`).then(response => console.log(response));
              }
            })
            .catch(error => console.log(error));
        } else {
          console.log('конфигурация мест не изменилась, здесь нужно сохранить изменения типов мест в БД');
          
          // получить места из БД
          apiClient.get(`/places`)
            .then(response => {
              console.log(response.data);
              const placesData = response.data;

              // если есть сохраненные места в БД
              if (placesData.length !== 0) {
                if (placesState.length === placesData.length) {
                  const placesDataCopy = [...placesData];
                  placesDataCopy.sort(compareFn);

                  const placesDiffs = placesState.filter((place, index) => place.type !== placesDataCopy[index].type);

                  console.log({placesDiffs});
                  
                  // если нашлись изменения в массиве БД по сравнению с массивом из состояния
                  if (placesDiffs.length > 0) {
                    let putRequests = placesDiffs.map(diffPlace => apiClient.put(`/places/${diffPlace.id}`, diffPlace));
                    // axios.all(putRequests).then(response => console.log(response)).catch(error => console.log(error));

                    axios.all(putRequests)
                      .then(response => {
                        console.log(response);
                        apiClient.get(`/places`).then(response => console.log(response));
                      })
                      .catch(error => console.log(error));

                  }
                }
              } else {
                // Сохранить конфигурацию из текущего состояния в БД
                let requests = placesState.map(place => apiClient.post(`/places`, place));
                // axios.all(requests).then((data) => console.log(data));

                axios.all(requests)
                  .then(response => {
                    console.log(response);
                    apiClient.get(`/places`).then(response => console.log(response));
                  })
                  .catch(error => console.log(error));


                // apiClient.get(`/places`).then(response => console.log(response));
              }
              
            }).catch(error => console.log(error))
        }
      }).catch(error => console.log(error));


    // apiClient.get(`/halls`)
    //   .then(response => {
    //     console.log(response);
    //     const hallsData = [...response.data];
    //     const modifiedHallsConfigurations = hallsData.filter(hall => {
    //       const modifiedConfiguration = configurations.find(configuration => configuration.hall_id === hall.id);

    //       return (!(hall.rows === modifiedConfiguration.rows && hall.places === modifiedConfiguration.places)); // вернуть hall, где изменились значения конфигурации мест по сравнению с сохраненными
    //     });
    //     // Если данные изменились (массив вернулся не пустой)
    //     if (modifiedHallsConfigurations.length !== 0) {
    //       modifiedHallsConfigurations.forEach(modifiedConfiguration => {
    //         const configuration = configurations.find(configuration => configuration.hall_id === modifiedConfiguration.id);

    //         // Обновление данных, отправка запроса на сервер
    //         const data = { ...modifiedConfiguration, rows: configuration.rows, places: configuration.places }
    //         console.log({ data });

    //         // put axios
    //         apiClient.put(`/halls/${hall.id}`,
    //           data)
    //           .then(response => console.log(response))
    //           .catch(error => console.error(error));
    //       });
    //     }
    //   })
    //   .catch(error => console.log(error));
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

    // const modifiedHallPlaces = modifiedPlaces.filter(modifiedPlace => modifiedPlace.hall_id === hall.id)
    // modifiedHallPlaces.sort(compareFn);

    // setHallPlaces(modifiedHallPlaces);
    // setAllPlaces2([...modifiedPlaces]);
  }

  return (
    <section className="conf-step">
      <SectionHeader name={'Конфигурация залов'} isActiveHeaderState={isActiveHeaderState} handleClick={handleClick} />

      <div className="conf-step__wrapper">
        <form onSubmit={handleSubmit2}>
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
              places={prepareHallPlaces(placesState, configurations.find(configuration => configuration.hall_id === hall.id), hall)}
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