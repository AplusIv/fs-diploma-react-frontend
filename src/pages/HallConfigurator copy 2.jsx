import { useState } from "react"
import apiClient from "../services/jsonServerApi"

import HallConfiguratorPlaces from "./HallConfiguratorPlaces"
import HallConfiguratorTitles from "./HallConfiguratorTitles"
import SectionButtons from "./SectionButtons"
import SectionHeader from "./SectionHeader"

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


  // зрительские места (новая версия)
  const compareFn = (a, b) => Number(a.id) - Number(b.id); // сортировка объектов по возрастанию

  let placesArray = [];
  let PId = -1;
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
        id: `${++PId}`,
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
      // r = r+1;

      // (p > hall.places) ? p = 1 : p++;
      // p++;
    }

    placesArray.sort(compareFn);
  });

  let initialPlaces;

  console.log(placesArray.length === places.length);

  // (placesArray.length === places.length) ? initialPlaces = [...places] : initialPlaces = [...placesArray]
  if (placesArray.length === places.length) {
    initialPlaces = places.map(map => {
      return { ...map };
    })
  } else {
    initialPlaces = [...placesArray];
  }

  console.log({ initialPlaces });

  // const [placesState, setPlacesState] = useState(places);
  const [placesState, setPlacesState] = useState(initialPlaces);
  console.log({ placesState });

  // состояние в зависимости от зала
  const placesStateCopy = [...placesState];
  const initialHallPlaces = placesStateCopy.filter(place => place.hall_id === hall.id);
  initialHallPlaces.sort(compareFn);

  const [hallPlaces, setHallPlaces] = useState(initialHallPlaces);
  console.log({ hallPlaces });


  // Показ/скрытие секции
  const [isActiveHeaderState, setIsActiveHeaderState] = useState(true);

  // Количество рядов/мест в выбранном зале
  // const [configuration, setConfiguration] = useState({
  //   rows: '',
  //   places: '',
  // });

  // // Количество рядов/мест в залах
  // let initialConfigurations = [];
  // halls.forEach(hall => {
  //   const configuration = {
  //     hall_id: hall.id,
  //     rows: hall.rows,
  //     places: hall.places
  //   }
  //   initialConfigurations.push(configuration);
  // })

  // const [configurations, setConfigurations] = useState(initialConfigurations);
  // console.log({configurations});


  // список мест для разных кинозалов
  console.log(places);


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

        if (p > hall.places) {
          r++;
          p = 1;
        }
      }

      placesArray.sort(sorterFn);
      console.log({placesArray});
      
    });
    
    return placesArray;
  }







  // Прошлая версия с запросами к БД
  // Создание мест в кинозалах
  //   let allPlaces = [];
  //   // const compareFn = (a, b) => Number(a.id) - Number(b.id); // сортировка объектов по возрастанию

  //   // let lastPlaceId = (places.length > 0) ? Number(places[places.length-1].id) : -1; // если массив пустой, то вернуть последний индекс -1
  //   let lastPlaceId = -1;
  //   console.log(lastPlaceId);

  //   halls.forEach(hall => {
  //     const hallConfiguration = hall.rows * hall.places;

  //     const filteredByHallPlaces = places.filter(place => place.hall_id === hall.id);

  //     console.log({hallConfiguration});

  //     console.log(filteredByHallPlaces.length);

  //     console.log(hallConfiguration === filteredByHallPlaces.length);

  //     if (hallConfiguration !== filteredByHallPlaces.length) {
  //       // let lastPlaceId = (places.length > 0) ? Number(places[places.length-1].id) : -1; // если массив пустой, то вернуть последний индекс -1
  //       // console.log(lastPlaceId);

  //       let p = 1; // первое место

  //       let r = 1; // первый ряд

  //       for (let index = 0; index < hallConfiguration; index++) {
  //         // lastPlaceId = +lastPlaceId + 1;
  //         const hallPlace = {
  //           id: `${++lastPlaceId}`,
  //           hall_id: hall.id,
  //           row: r,
  //           place: p,
  //           type: "standart",
  //           is_free: true,
  //           is_selected: true
  //         };

  //         const checkingElement = filteredByHallPlaces.find(element => element.place === hallPlace.place && element.row === hallPlace.row);
  //         console.log(checkingElement);

  //         if (checkingElement) {
  //           allPlaces.push(checkingElement);
  //         } else {
  //           allPlaces.push(hallPlace);
  //         }

  //         p++;

  //         if (p > hall.places) {
  //           r++;
  //           p = 1;
  //         }
  //         // r = r+1;

  //         // (p > hall.places) ? p = 1 : p++;
  //         // p++;
  //       }

  //       allPlaces.sort(compareFn);
  //       console.dir(allPlaces);

  //       // allPlaces.forEach(place => {
  //       //   const data = {...place}
  //       // // put axios
  //       //   apiClient.post(`/places`, 
  //       //     data)
  //       //     .then(response => console.log(response))
  //       //     .catch(error => console.error(error));
  //       // })        
  //     }
  //   });

  //   let initialPlaces;

  //   (allPlaces.length === places.length) ? initialPlaces = [...places] : initialPlaces = [...allPlaces]

  // //   initialPlaces.forEach(place => {
  // //     const data = {...place};
  // //     apiClient.get(`/places/${place.id}`)
  // //       .then(response => console.log(response.status))
  // //       .catch(error => {
  // //         console.error(error.response.status);
  // //         if (error.response.status === 404) {
  // //           apiClient.post(`/places`, data)
  // //             .then(response => console.log(response))
  // //             .catch(error => console.error(error));
  // //         }
  // //       });
  // //  })



  // Добавление новых мест в БД (при их отсутствии)
  // for (let index = 0; index < initialPlaces.length; index++) {
  //   const data = initialPlaces[index];

  //   apiClient.get(`/places/${data.id}`)
  //     .then(response => console.log(response.status))
  //     .catch(error => {
  //       console.error(error.response.status);
  //       if (error.response.status === 404) {
  //         apiClient.post(`/places`, data)
  //           .then(response => console.log(response))
  //           .catch(error => console.error(error));
  //       }
  //     });
  // }


  //   initialPlaces.forEach(place => {
  //     const data = {...place};
  //     apiClient.get(`/places/${place.id}`)
  //       .then(response => console.log(response.status))
  //       .catch(error => {
  //         console.error(error.response.status);
  //         if (error.response.status === 404) {
  //           apiClient.post(`/places`, data)
  //             .then(response => console.log(response))
  //             .catch(error => console.error(error));
  //         }
  //       });
  //  })

  // const initialHallPlaces = allPlaces.filter(place => place.hall_id === hall.id);
  // const [hallPlaces, setHallPlaces] = useState(browsePlaces(halls, places));


  // const [allPlaces2, setAllPlaces2] = useState(initialPlaces);
  // console.log({allPlaces2});
  // console.log({initialPlaces});



  /* allPlaces2.forEach(place => {
          const data = {...place}
          // let response1;
        const getRequest = apiClient.get(`/places/${place.id}`, 
        data)
          .then(response => console.log(response))
          .catch(error => console.error(error));
          console.log(getRequest);
    if (getRequest.status === 404) {
        apiClient.post(`/places`, 
              data)
              .then(response => console.log(response))
              .catch(error => console.error(error));
    }
    }) */




  // состояние в зависимости от зала
  // const allPlaces2Copy = [...allPlaces2];
  // const initialHallPlaces = allPlaces2Copy.filter(place => place.hall_id === hall.id);
  // initialHallPlaces.sort(compareFn);

  // const [hallPlaces, setHallPlaces] = useState(initialHallPlaces);
  // console.log({hallPlaces});









  // const browsePlaces = (halls, places) => {
  //     // Создание мест в кинозалах
  //   let allPlaces = [];
  //   const compareFn = (a, b) => Number(a.id) - Number(b.id); // сортировка объектов по возрастанию

  //   let lastPlaceId = (places.length > 0) ? Number(places[places.length-1].id) : -1; // если массив пустой, то вернуть последний индекс -1
  //   console.log(lastPlaceId);

  //   halls.forEach(hall => {
  //     const hallConfiguration = hall.rows * hall.places;

  //     const filteredByHallPlaces = places.filter(place => place.hall_id === hall.id);

  //     console.log({hallConfiguration});

  //     console.log(filteredByHallPlaces.length);

  //     console.log(hallConfiguration === filteredByHallPlaces.length);

  //     if (hallConfiguration !== filteredByHallPlaces.length) {
  //       // let lastPlaceId = (places.length > 0) ? Number(places[places.length-1].id) : -1; // если массив пустой, то вернуть последний индекс -1
  //       // console.log(lastPlaceId);

  //       let p = 1; // первое место

  //       let r = 1; // первый ряд

  //       for (let index = 0; index < hallConfiguration; index++) {
  //         // lastPlaceId = +lastPlaceId + 1;
  //         const hallPlace = {
  //           id: `${++lastPlaceId}`,
  //           hall_id: hall.id,
  //           row: r,
  //           place: p,
  //           type: "standart",
  //           is_free: true,
  //           is_selected: true
  //         };

  //         const checkingElement = filteredByHallPlaces.find(element => element.place === hallPlace.place && element.row === hallPlace.row);
  //         console.log(checkingElement);

  //         if (checkingElement) {
  //           allPlaces.push(checkingElement);
  //         } else {
  //           allPlaces.push(hallPlace);
  //         }

  //         p++;

  //         if (p > hall.places) {
  //           r++;
  //           p = 1;
  //         }
  //         // r = r+1;

  //         // (p > hall.places) ? p = 1 : p++;
  //         // p++;
  //       }

  //       allPlaces.sort(compareFn);
  //       console.dir(allPlaces);

  //       // allPlaces.forEach(place => {
  //       //   const data = {...place}
  //       // // put axios
  //       //   apiClient.post(`/places`, 
  //       //     data)
  //       //     .then(response => console.log(response))
  //       //     .catch(error => console.error(error));
  //       // })        
  //     }
  //   });

  //   const initialHallPlaces = allPlaces.filter(place => place.hall_id === hall.id);
  //   return initialHallPlaces;
  // }

  // const [hallPlaces, setHallPlaces] = useState(browsePlaces(halls, places));


  const prepareHallPlaces = (places, configuration) => {
    let rowsGroupedByRow = [];
    
    places.sort(compareFn); // сортировка мест из БД
    
    for (let index = 1; index <= configuration.rows; index++) {
      const row = places.filter(place => place.row === index);
      rowsGroupedByRow.push(row);
    }
    return rowsGroupedByRow;
  }
  // const rowsCount = hall.rows;
  // // const placesCount = halls.places;
  // const placesCount = hall.places;


  // let rowsContent = [];
  // for (let i = 0; i < rowsCount; i++) {
  //   rowsContent.push(<div className="conf-step__row"/>);
  // }

  // let placesContent = [];
  // for (let i = 0; i < placesCount; i++) {
  //   placesContent.push(<span className="conf-step__chair conf-step__chair_standart"/>);
  // }

  // let rowsContent = [];
  // for (let i = 0; i < rowsCount; i++) {
  //   rowsContent.push(<div className="conf-step__row">
  //                     {placesContent.map(place => place)}
  //                   </div>);
  // }

  // const initialHallPlaces = rowsContent.map(row => row);

  // part 1 

  // const initialHallPlaces2 = places.filter(place => place.hall_id === hall.id);

  // const compareFn = (a, b) => Number(a.id) - Number(b.id); // сортировка объектов по возрастанию

  // initialHallPlaces2.sort(compareFn); // мутированный исходный массив
  // console.log(initialHallPlaces2);


  // const [hallPlaces, setHallPlaces] = useState(initialHallPlaces2);

  // const configurePlaces = (hall) => {
  //   const initialConfiguration = hall.rows * hall.places;
  //   console.log(initialConfiguration);

  //   let actualHallPlaces = [];

  //   console.log({hallPlaces});

  //   const filteredPlaces = hallPlaces.filter(place => place.hall_id === hall.id);


  //   if (initialConfiguration !== filteredPlaces.length) {
  //     const rowsCount = hall.rows;
  //     // const placesCount = halls.places;
  //     const placesCount = hall.places;

  //     let lastPlaceId = (places.length > 0) ? Number(places[places.length-1].id) : -1; // если массив пустой, то вернуть последний индекс -1
  //     console.log(lastPlaceId);

  //     let p = 1; // первое место
  //     // if (p > hall.places) {
  //     //   p = 1;
  //     // }

  //     let r = 1; // первый ряд
  //     // if (r > hall.rows) {
  //     //   r = 1;
  //     // }

  //     for (let index = 0; index < initialConfiguration; index++) {
  //       // lastPlaceId = +lastPlaceId + 1;
  //       const hallPlace = {
  //         id: `${++lastPlaceId}`,
  //         hall_id: hall.id,
  //         row: r,
  //         place: p,
  //         type: "standart",
  //         is_free: true,
  //         is_selected: true
  //       };
  //       const checkingElement = filteredPlaces.find(element => element.place === hallPlace.place);
  //       console.log(checkingElement);


  //       if (checkingElement) {
  //         actualHallPlaces.push(checkingElement);
  //       } else {
  //         actualHallPlaces.push(hallPlace);
  //       }

  //       p++;

  //       if (p > hall.places) {
  //         r++;
  //         p = 1;
  //       }
  //       // r = r+1;

  //       // (p > hall.places) ? p = 1 : p++;
  //       // p++;
  //     }

  //     actualHallPlaces.sort(compareFn);
  //     console.dir(actualHallPlaces);

  //     // const rows = [...actualHallPlaces];
  //     // let rowsGroupedByRow = [];
  //     // for (let index = 1; index <= hall.rows; index++) {
  //     //   const row = rows.filter(place => place.row === index);
  //     //   rowsGroupedByRow.push(row);
  //     // }
  //     // console.log(rowsGroupedByRow);

  //     // setHallPlaces([...rowsGroupedByRow]);


  //     // setHallPlaces([...actualHallPlaces]);
  //     return actualHallPlaces;
  //   }
  // }

  // part 1

  // const [hallPlaces, setHallPlaces] = useState(configurePlaces(hall));


  // const [hallPlaces, setHallPlaces] = useState(initialHallPlaces2);

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

    console.log('checked true');
    setChecked(e.target.value);

    const chosenHall = halls.find(hall => hall.title === e.target.value); // возвращаю нужный зал
    // const chosenHall = halls.filter(hall => hall.title === e.target.value)[0]; // возвращаю первый элемент полученного массива

    console.log(chosenHall);
    setHall((previousHall) => ({ ...previousHall, ...chosenHall }));
    // console.log(hall);

    // setConfiguration((previousConfiguration) => ({...previousConfiguration, rows: Number(chosenHall.rows), places: Number(chosenHall.places)}));

    // configurePlaces(chosenHall);
    // const changedHallPlaces = allPlaces.filter(place => place.hall_id === chosenHall.id);

    const allPlacesCopy = [...placesState];
    const changedHallPlaces = allPlacesCopy.filter(place => place.hall_id === chosenHall.id);
    changedHallPlaces.sort(compareFn);
    setHallPlaces(changedHallPlaces);


    // const allPlacesCopy = [...allPlaces2];
    // const changedHallPlaces = allPlacesCopy.filter(place => place.hall_id === chosenHall.id);

    // changedHallPlaces.sort(compareFn);
    // console.log({changedHallPlaces});

    // setHallPlaces([...changedHallPlaces]);
  }

  const handleInput = (e) => {
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




    let placesArray = [];
    let PId = -1;
    halls.forEach(hall => {
      // const configuration = hall.rows * hall.places;
      const configuration = newConfigurations.find(configuration => configuration.hall_id === hall.id);
      const placesAmount = configuration.rows * configuration.places;
      console.log({ placesAmount });

      let p = 1; // первое место

      let r = 1; // первый ряд

      for (let index = 0; index < placesAmount; index++) {
        // lastPlaceId = +lastPlaceId + 1;
        const hallPlace = {
          id: `${++PId}`,
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
        // r = r+1;

        // (p > hall.places) ? p = 1 : p++;
        // p++;
      }

      placesArray.sort(compareFn);
    });

    setPlacesState(placesArray);

    const filteredByHallPlaces = placesArray.filter(place => place.hall_id === hall.id);
    setHallPlaces(filteredByHallPlaces);
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


    if (places.length > 0) {
      // const refreshedConfigurations = configurations.map(configuration => {
      //   if (configuration.hall_id === hall.id) {
      //     return { ...configuration, rows: Number(hall.rows), places: Number(hall.places) }
      //   } else {
      //     return configuration;
      //   }
      // })

      // setConfigurations(refreshedConfigurations);
      // // setConfiguration((previousConfiguration) => ({...previousConfiguration, rows: Number(hall.rows), places: Number(hall.places)}));

      // apiClient.get(`/places`)
      //   .then(response => {
      //     console.log(response);
      //     const placesData = response.data;

      //     // сброс всех мест к сохраненным в БД
      //     // const refreshedPlaces = placesData.map(placeData => placeData);
      //     const refreshedPlaces = [...placesData];
      //     setPlacesState(refreshedPlaces);

      //     // сброс мест в выбранном зале к сохраненным в БД
      //     const filteredByHallPlaces = placesData.filter(place => place.hall_id === hall.id);
      //     filteredByHallPlaces.sort(compareFn);
      //     console.log({ filteredByHallPlaces });

      //     setHallPlaces(filteredByHallPlaces);

      //     console.log({ hallPlaces });
      //   })
      //   .catch(error => {
      //     console.error(error.response.status);
      //   });
    }

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

          const filteredByHallPlaces = refreshedPlaces.filter(place => place.hall_id === hall.id);
          filteredByHallPlaces.sort(compareFn);
          console.log({ filteredByHallPlaces });
      
          setHallPlaces(filteredByHallPlaces);
      
          console.log({ hallPlaces });
      

          // setPlacesState(refreshedPlaces);

          // // сброс мест в выбранном зале к сохраненным в БД
          // const filteredByHallPlaces = placesData.filter(place => place.hall_id === hall.id);
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

      const filteredByHallPlaces = refreshedPlaces.filter(place => place.hall_id === hall.id);
      filteredByHallPlaces.sort(compareFn);
      console.log({ filteredByHallPlaces });
  
      setHallPlaces(filteredByHallPlaces);
  
      console.log({ hallPlaces });
  
    }

    // console.log({refreshedPlaces});
    
    // setPlacesState(refreshedPlaces);

    // сброс мест в выбранном зале к сохраненным в БД
    // const filteredByHallPlaces = refreshedPlaces.filter(place => place.hall_id === hall.id);
    // filteredByHallPlaces.sort(compareFn);
    // console.log({ filteredByHallPlaces });

    // setHallPlaces(filteredByHallPlaces);

    // console.log({ hallPlaces });


    // setPlacesState(savedPlaces);
    // setAllPlaces2([...places]);
    // window.location.reload();
    // Сброс мест на стандартный тип в зале
    // const refreshedPlaces = [...hallPlaces].forEach(place => {
    //   if (place.type !== 'standart') {
    //     console.log(place);

    //     place.type = 'standart';
    //   }
    // })

    // setHallPlaces(refreshedPlaces);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit');

    // console.log(typeof configuration.places);
    // console.log(typeof configuration.rows);

    // Обновление количества мест в БД
    // if (!hall.rows === configuration.rows && hall.places === configuration.places) {
    //   const data = {...hall, ...configuration}
    //   // put axios
    //   apiClient.put(`/halls/${hall.id}`, 
    //     data)
    //     .then(response => console.log(response))
    //     .catch(error => console.error(error)); 
    // }

    // Обновление количества мест в БД для выбранного зала
    const configuration = configurations.find(configuration => configuration.hall_id === hall.id)
    console.log({configuration});
    console.log({hall});
    
    
    if (!(hall.rows === configuration.rows && hall.places === configuration.places)) {
      const data = { ...hall, rows: configuration.rows, places: configuration.places }
      console.log({ data });

      // put axios
      apiClient.put(`/halls/${hall.id}`,
        data)
        .then(response => console.log(response))
        .catch(error => console.error(error));

      // Очистка и замена мест в БД с новой конфигурацией
      const newPlaces = makeStandartPlaces(halls, configurations, compareFn);
      console.log({newPlaces});
      
      apiClient.delete('places')
        .then(response => console.log(response))
        .catch(error => console.error(error))
      
      // for (let index = 0; index < newPlaces.length; index++) {
      //   const data = newPlaces[index];
      //   apiClient.get(`/places/${data.id}`)
      //     .then(response => console.log(response.status))
      //     .catch(error => {
      //       console.error(error.response.status);
      //       if (error.response.status === 404) {
      //         apiClient.post(`/places`, data)
      //           .then(response => console.log(response))
      //           .catch(error => console.error(error));
      //       }
      //     });
      // }
      apiClient.post(`/places`, newPlaces)
        .then(response => console.log(response))
        .catch(error => console.error(error));
      setPlacesState(newPlaces);

      const newPlacesByHall = newPlaces.filter(newPlace => newPlace.id === hall.id);
      newPlacesByHall.sort(compareFn);
      
      setHallPlaces(newPlacesByHall);
    }

    // Добавление зрительских мест по всем залам в БД
    if (placesState.length > places.length) {
      // копирование и сортировка
      const sortedPlacesState = [...placesState];
      sortedPlacesState.sort(compareFn);
      
      for (let index = 0; index < sortedPlacesState.length; index++) {
        const data = sortedPlacesState[index];
        apiClient.get(`/places/${data.id}`)
          .then(response => console.log(response.status))
          .catch(error => {
            console.error(error.response.status);
            if (error.response.status === 404) {
              apiClient.post(`/places`, data)
                .then(response => console.log(response))
                .catch(error => console.error(error));
            }
          });
      }
      // placesState.forEach(place => {
      //   const data = { ...place };
      //   apiClient.get(`/places/${place.id}`)
      //     .then(response => console.log(response.status))
      //     .catch(error => {
      //       console.error(error.response.status);
      //       if (error.response.status === 404) {
      //         apiClient.post(`/places`, data)
      //           .then(response => console.log(response))
      //           .catch(error => console.error(error));
      //       }
      //     });
      // })
    }




    // Обновление типа мест в БД
    // console.log({ hallPlaces });
    console.log({placesState});
    

    placesState.forEach(place => {
      const data = { ...place }

      apiClient.get(`/places/${place.id}`)
        .then(response => {
          if (place.type !== response.data.type) {
            apiClient.put(`/places/${place.id}`, data)
              .then(response => console.log(response))
              .catch(error => console.error(error));
          }
        })
        .catch(error => console.error(error));
    })

    // window.location.reload();
  }

  const handlePlaceType = (placeId) => {
    // const {value} = e.target;

    // const modifiedPlaces = [...allPlaces2];

    // const modifiedPlaces = [...hallPlaces];

    // const chosenPlace = modifiedPlaces.find(place => place.id === placeId);
    // console.log(chosenPlace);


    // switch (chosenPlace.type) {
    //   case 'standart':
    //     chosenPlace.type = 'vip';
    //     break;
    //   case 'vip':
    //     chosenPlace.type = 'disabled';
    //     break;
    //   case 'disabled':
    //     chosenPlace.type = 'standart';
    //     break;
    // }

    console.log('handlePlaceType');
    
    const modifiedPlaces = placesState.map(place => {
      if (place.id === placeId) {
        console.log({placeId});
        
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

    const modifiedHallPlaces = modifiedPlaces.filter(modifiedPlace => modifiedPlace.hall_id === hall.id)
    modifiedHallPlaces.sort(compareFn);

    setHallPlaces(modifiedHallPlaces);
    // setAllPlaces2([...modifiedPlaces]);
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
              places={prepareHallPlaces(hallPlaces, configurations.find(configuration => configuration.hall_id === hall.id))}
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