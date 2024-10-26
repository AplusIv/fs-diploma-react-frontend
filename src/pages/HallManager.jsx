import { useState } from "react";
import HallName from "./HallName";
import SectionHeader from "./SectionHeader";
import Popup from "./Popup";
import Popup3 from "./Popup3";
import PopupBase from "./PopupBase";
import Popup4 from "./Popup4";
import { addHallToDB, deleteHallFromDB } from "../services/DBUpdater";

const HallManager = ({ halls }) => {

  const [isActiveHeaderState, setIsActiveHeaderState] = useState(true);

  const [isActivePopup, setIsActivePopup] = useState(false);

  const [hallInfo, setHallInfo] = useState({});

  // Залы
  const [hallsInfo, setHallsInfo] = useState([...halls]);
  console.log(hallsInfo);

  // popup states:
  // statuses: 'adding film popup', 'editing film popup', 'hide popup'
  // titles: 'Добавить фильм', 'Изменить фильм', 'popup is hidden'
  // isActive: true, false (показать / скрыть)
  const [popupInfo, setPopupInfo] = useState({
    status: 'hide popup',
    title: 'popup is hidden',
    isActive: false
  });

  const handleClick = (e) => {
    console.log(e.currentTarget.className);
    // if (e.target.contains)
    if (e.currentTarget.classList.contains('conf-step__header')) {
      setIsActiveHeaderState(!isActiveHeaderState);
    }
    // setIsActiveHeaderState(!isActiveHeaderState);
  }

  const handlePopup = (e) => {
    console.log('popup!');
    setIsActivePopup(!isActivePopup);
  }

  const handleChange = (e) => {
    setHallInfo({ ...hallInfo, [e.target.name]: e.target.value });
    console.log(e.target.value);
  }

  const handlePopupStatus = (status, movie = {}) => {
    console.log(movie);
    console.log('popup status handler');
    // Object.keys(movie).length !== 0 ? setMovieInfo({...movie}) : setMovieInfo({}); // проверка на пустой объект, который передаётся в handler
    // setMovieInfo({...movie}); // обновить состояние фильма: либо добавить фильм, либо сбросить пустым объектом
    if (status === 'adding hall popup') {
      setPopupInfo({
        status: 'adding hall popup',
        title: 'Добавить зал',
        isActive: true
      })
    }
    if (status === 'hide popup') {
      setPopupInfo({
        status: 'hide popup',
        title: 'Попап неактивен',
        isActive: false
      })
    }
  }

    // Универсальный колбэк onAddCallback + функции обновления массивов сущностей

    const handleAddData = (newData) => {
      // добавление зала
      if (Object.prototype.hasOwnProperty.call(newData, "rows")) {
        handleAddHall(newData);
        addHallToDB(newData);
      }
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
      deleteHallFromDB(id);
      // if (e.target.tagName === 'BUTTON') {
        apiClient.delete(`/halls/${hall.id}`)
          .then(response => console.log(response.statusText))
          .catch(error => console.log(error))
      // }
    }
    // 
    // 
  

  // const lastId = halls.length;

  return (
    <section className="conf-step" >
      {/* <Popup isActive={isActivePopup} handlePopup={handlePopup}/> */}
      {/* <Popup3 
          popupInfo={popupInfo} 
          lastId={lastId} 
          movieInfo={hallInfo} 
          handleChange={handleChange} 
          handlePopup={handlePopupStatus}
        >
          <PopupBase popupInfo={popupInfo} handlePopup={handlePopupStatus}>
          </PopupBase>
        </Popup3> */}

      <Popup4
        popupInfo={popupInfo}
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
        <div className="conf-step__wrapper">
          <p className="conf-step__paragraph">Доступные залы:</p>
          <ul className="conf-step__list">
            {hallsInfo.map(hall => (
              <HallName key={hall.id} hall={hall} handleDeleteHall={handleDeleteHall}/>
              // <li key={hall.id}>{hall.title}
              //   <button className="conf-step__button conf-step__button-trash"></button>
              // </li>
            ))}
          </ul>
          <button className="conf-step__button conf-step__button-accent" onClick={() => handlePopupStatus('adding hall popup')}>Создать зал</button>
        </div>
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