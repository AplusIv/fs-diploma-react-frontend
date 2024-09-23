// import apiClient from "../services/jsonServerApi";
// import axios from "axios";
// import { useState } from "react";
import cross from '../img/admin/cross.png'

const PopupBase = ({isActive, popupTitle='', handlePopup, children}) => {

  /* const [movieInfo, setMovieInfo] = useState({
    title: '',
    description: '',
    duration: '',
    country: ''
  })
  
  const handleChange = (e) => {
    setMovieInfo({...movieInfo, [e.target.name]: e.target.value});
    console.log(e.target.value);    
  }

  const handleMovieAdding = (e) => {
    e.preventDefault();

    console.log('movie adding request');

    apiClient.post('/movies', {
      ...movieInfo
    }).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    })
  } */

  const activeClass = isActive ? ' active' : '';
  
  return (
    // <></>
    <div className={"popup" + activeClass}>
      <div className="popup__container">
        <div className="popup__content">
          <div className="popup__dismiss" onClick={()=>handlePopup('hide popup')}>
            <img src={cross}/>
          </div>
          <div className="popup__header">
            {/* <div className="popup__title">{popupTitle}</div> */}
            {/* {popupTitle} ? <div className="popup__title">{popupTitle}</div> : <div className="popup__title">popup is hidden</div> */}
            <div className="popup__title">{popupTitle}</div>
          </div>
          <div className="popup__wrapper">
            {children}
            {/* <input 
              type="text" 
              name="title" 
              placeholder="Название фильма" 
              autoComplete="on"
              value={movieInfo.title}
              onChange={handleChange}
            />
            <textarea 
              name="description" 
              rows="5" 
              cols="33" 
              placeholder="Введите описание фильма" 
              autoComplete="on"
              value={movieInfo.description}
              onChange={handleChange}
            />
            <input 
              type="text" 
              // type="number" всё-таки длительность фильма это число
              name="duration" 
              placeholder="Длительность фильма" 
              autoComplete="on"
              value={movieInfo.duration}
              onChange={handleChange}
            />
            <input 
              type="text" 
              name="country" 
              placeholder="Название страны" 
              autoComplete="on"
              value={movieInfo.country}
              onChange={handleChange}
            /> */}
            {/* <input type="button" value={popupTitle} onClick={handleMovieAdding}/> */}
          </div>
        </div>
      </div>
    </div>
    /* 
    "id": "4",
      "title": "Рим атакует",
      "description": "Просто кино",
      "duration": "140",
      "country": "Италия"
    
    */


    // <div className={"popup" + activeClass}>Popup2
    //   <div className="popup__container">
    //     <div className="popup__title">Заголовок</div>
    //     <div className="popup__content">
    //       <div className="popup__header">Хэдер</div>
    //       <div className="popup__wrapper">Какой-то контент</div>
    //       Какой-то контент 2
    //     </div>
    //   </div>
    // </div>
    // { isActive == true ? (<div>Popup</div>) : null }
    // <div className={"popup" + activeClass}>
    //   {<div className="popup__container">
    //     <div className="popup__title">Заголовок</div>
    //     <div className="popup__content">
    //       <div className="popup__header">Хэдер</div>
    //       <div className="popup__wrapper">Какой-то контент</div>
    //       Какой-то контент 2
    //     </div>
    //   </div>}
      /* <div className="popup__container">
        <div className="popup__content">
          <div className="popup__dismiss" onClick={handlePopup}>x</div>
          <div className="popup__header">
            <div className="popup__title">Добавить зал</div>
          </div>
          <div className="popup__wrapper">Какой-то контент
            <input 
              type="text" 
              name="hall-name" 
              placeholder="Название зала" 
              value={hallValue}
              onChange={(e) => setHallValue(e.target.value)}
            />
            <input type="button" value="Добавить зал" onClick={handleHallAdding}/>
          </div>
        </div>
      </div> */
    // </div>
  )
}

export default PopupBase