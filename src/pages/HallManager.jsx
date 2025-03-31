import { useCallback, useEffect, useState } from "react";
import HallName from "./HallName";
import SectionHeader from "./SectionHeader";
import Popup from "../../reserve/popup-reserve/Popup";
import Popup3 from "../../reserve/popup-reserve/Popup3";
import PopupBase from "./PopupBase";
import Popup4 from "./Popup4";
import { addHallToDB, addPlacesToDB, deleteHallFromDB, deletePlacesFromHall, getHallfromDB } from "../services/DBUpdater";
import { useDispatch, useSelector } from "react-redux";
// import { addHall, hidePopup } from "../redux/slices/popupSlice";
import { addHall, hidePopup } from "../redux/slices/hallPopupSlice";
import { deleteHall, postHallData, setToInitialData } from "../redux/slices/hallPopupDataHandlerSlice";
import { getHalls } from "../redux/slices/hallSlice";


const HallManager = ({ halls }) => {

  const [isActiveHeaderState, setIsActiveHeaderState] = useState(true);

  const [isActivePopup, setIsActivePopup] = useState(false);

  const [hallInfo, setHallInfo] = useState({});


  const [ loading, setLoading ] = useState(false);
  

  // popup states:
  // statuses: 'adding film popup', 'editing film popup', 'hide popup'
  // titles: 'Добавить фильм', 'Изменить фильм', 'popup is hidden'
  // isActive: true, false (показать / скрыть)
  // const [popupInfo, setPopupInfo] = useState({
  //   status: 'hide popup',
  //   title: 'popup is hidden',
  //   isActive: false
  // });

  // redux popupInfo

  const hallPopupInfoRedux = useSelector(state => state.hallPopupInfoReducer.hallPopupInfo);
  console.log({ hallPopupInfoRedux });

  const hallsRedux = useSelector(state => state.hallsReducer.halls);
  console.log({ hallsRedux });

  const hallsReduxLoading = useSelector(state => state.hallsReducer.loading);
  console.log({ hallsReduxLoading });



 
  

  // const popupInfoRedux = useSelector(state => state.popupInfoReducer.popupInfo);
  // console.log({popupInfoRedux});

  const dispatch = useDispatch();
  const addHallCallback = useCallback(() => dispatch(addHall()), []);
  const hidePopupCallback = useCallback(() => {
    dispatch(hidePopup());
    dispatch(setToInitialData());
  }, []);


  // Залы
  const [hallsInfo, setHallsInfo] = useState([...halls]);
  // const [hallsInfo, setHallsInfo] = useState([]);

  console.log({hallsInfo});

  useEffect(() => {
    console.log('Get halls effect is on from HallManager');
    dispatch(getHalls());

    //       if (hallsReduxLoading === 'idle') {
    //     console.log('Обновить hallsInfo');
        
    //     setHallsInfo(hallsRedux);
    //       }


    // setTimeout(() => {
    //   console.log('timeout');
      
    //   if (hallsReduxLoading === 'idle') {
    //     console.log('Обновить hallsInfo');
        
    //     setHallsInfo(hallsRedux);
    //   }
    // }, 6000);

  
      // (async () => {
      //   setLoading(true);
      //   dispatch(getHalls());
      // console.log({hallsRedux});
      // // hallsRedux;
      
      // setHallsInfo(hallsRedux);

      // setLoading(false);
      // })()
    // return () => {
      
    // }
  }, [hallsInfo])


  const handleClick = (e) => {
    console.log(e.currentTarget.className);
    // if (e.target.contains)
    if (e.currentTarget.classList.contains('conf-step__header')) {
      setIsActiveHeaderState(!isActiveHeaderState);
    }
    // setIsActiveHeaderState(!isActiveHeaderState);
  }

  // const handlePopup = (e) => {
  //   console.log('popup!');
  //   setIsActivePopup(!isActivePopup);
  // }

  // const handleChange = (e) => {
  //   setHallInfo({ ...hallInfo, [e.target.name]: e.target.value });
  //   console.log(e.target.value);
  // }

  const handlePopupStatus = (status, movie = {}) => {
    console.log(movie);
    console.log('popup status handler');
    // Object.keys(movie).length !== 0 ? setMovieInfo({...movie}) : setMovieInfo({}); // проверка на пустой объект, который передаётся в handler
    // setMovieInfo({...movie}); // обновить состояние фильма: либо добавить фильм, либо сбросить пустым объектом
    if (status === 'adding hall popup') {
      // redux
      addHallCallback();
      // () => dispatch(addHall())(); // IIFE
      // dispatch(addHall());
    }
    if (status === 'hide popup') {
      // redux
      hidePopupCallback();
    }
  }

  // const handlePopupStatus = (status, movie = {}) => {
  //   console.log(movie);
  //   console.log('popup status handler');
  //   // Object.keys(movie).length !== 0 ? setMovieInfo({...movie}) : setMovieInfo({}); // проверка на пустой объект, который передаётся в handler
  //   // setMovieInfo({...movie}); // обновить состояние фильма: либо добавить фильм, либо сбросить пустым объектом
  //   if (status === 'adding hall popup') {
  //     setPopupInfo({
  //       status: 'adding hall popup',
  //       title: 'Добавить зал',
  //       isActive: true
  //     })

  //     // redux
  //     addHallCallback();
  //     // () => dispatch(addHall())(); // IIFE
  //     // dispatch(addHall());
  //   }
  //   if (status === 'hide popup') {
  //     setPopupInfo({
  //       status: 'hide popup',
  //       title: 'Попап неактивен',
  //       isActive: false
  //     })

  //     // redux
  //     hidePopupCallback();
  //   }
  // }

  // Универсальный колбэк onAddCallback + функции обновления массивов сущностей
  // рабочий, но долгий вариант 
  // const handleAddData = async (newData) => {
  //   // добавление зала
  //   if (Object.prototype.hasOwnProperty.call(newData, "rows")) {
  //     handleAddHall(newData);
  //     addHallToDB(newData);

  //     const newHall = await getHallfromDB(newData.title);
  //     console.log({newHall});
  //     await addPlacesToDB(newHall);        
  //   }
  // }

  /* // рабочий вариант без redux saga
  const handleAddData = async (newData) => {
    // добавление зала
    if (Object.prototype.hasOwnProperty.call(newData, "rows")) {
      handleAddHall(newData);
      addHallToDB(newData);

      // const newHall = await getHallfromDB(newData.title);
      // console.log({newHall});
      // await addPlacesToDB(newHall);        
    }
  } */

  /* // рабочий вариант без redux saga
  const handleDeleteHall = (id) => {

    setHallsInfo(hallsInfo.filter(hall => hall.id !== id));
    deleteHallFromDB(id);

    // deletePlacesFromHall(id);
    // if (e.target.tagName === 'BUTTON') {
    // apiClient.delete(`/halls/${hall.id}`)
    //   .then(response => console.log(response.statusText))
    //   .catch(error => console.log(error))
    // }
  } */

  const handleAddData = (newData) => {
    // добавление зала
      handleAddHall(newData);      
      // call action with saga
      // DB post request
      dispatch(postHallData(newData));

      dispatch(getHalls()); // получить залы и обновить redux halls state


      // dispatch(getHalls());

    /* if (Object.prototype.hasOwnProperty.call(newData, "rows")) {
      handleAddHall(newData);
      
      // call action with saga
      // DB post request
      dispatch(postHallData(newData));

      // addHallToDB(newData);

      // const newHall = await getHallfromDB(newData.title);
      // console.log({newHall});
      // await addPlacesToDB(newHall);        
    } */
  }

  const handleAddHall = (newHall) => {
    const updatedHalls = hallsInfo.concat(newHall);
    // return updatedSessions;

    setHallsInfo(updatedHalls);
    console.log(updatedHalls);
    console.log('зал добавлен');
  }

  const handleDeleteHall = (id) => {

    setHallsInfo(hallsInfo.filter(hall => hall.id !== id));
    // deleteHallFromDB(id);

    dispatch(deleteHall({ id })); // payload = { id }

    dispatch(getHalls()); // получить залы и обновить redux halls state
  }

  return (
    <section className="conf-step" >

      <Popup4
        popupInfo={hallPopupInfoRedux}
        // lastId={lastId}
        halls={hallsInfo}
        // movies={moviesInfo}
        // sessions={sessions}
        // sessions={sessionsInfo}
        // sessionId={sessionId}
        // movieInfo={movieInfo}
        // handleInput={handleInput}
        // handleEdit={handleEdit}
        // handleSelect={handleSelect}
        // onChangeCallback={handleChangeData}
        onAddCallback={handleAddData}
        // editedElement={movieInfo}
        // edit={edit}
        // handleChange={handleChange}
        handlePopup={handlePopupStatus}
      />

      <SectionHeader name={'Управление залами'} isActiveHeaderState={isActiveHeaderState} handleClick={handleClick} />
      {!loading&&<div className="conf-step__wrapper">
        <p className="conf-step__paragraph">Доступные залы:</p>
        <ul className="conf-step__list">
          {hallsInfo.map(hall => (
            <HallName key={hall.id} hall={hall} handleDeleteHall={handleDeleteHall} />
            // <li key={hall.id}>{hall.title}
            //   <button className="conf-step__button conf-step__button-trash"></button>
            // </li>
          ))}
        </ul>
        <button className="conf-step__button conf-step__button-accent" onClick={() => addHallCallback()}>Создать зал</button>

        {/* <button className="conf-step__button conf-step__button-accent" onClick={() => handlePopupStatus('adding hall popup')}>Создать зал</button> */}
      </div>}
    </section>
  )
}

export default HallManager

// loader function
// export const hallsLoader = async () => {
//   const responce = await fetch('http://localhost:4000/halls');

//   if (!responce.ok) {
//     throw Error('could not fecth data');
//   }

//   return responce.json();
// }


// export const hallsLoader = async () => {
//   const [halls, movies, sessions] = await Promise.all([
//     fetch('http://localhost:4000/halls').then(res => res.json()),
//     fetch('http://localhost:4000/movies').then(res => res.json()),
//     fetch('http://localhost:4000/sessions').then(res => res.json()),
//   ]);

//   return { halls, movies, sessions };
// }