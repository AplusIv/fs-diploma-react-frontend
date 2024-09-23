// import apiClient from "../services/jsonServerApi";
// import axios from "axios";
// import { useState } from "react";
import cross from '../img/admin/cross.png'

const PopupBase = ({popupInfo, handlePopup, children}) => {

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

  const activeClass = popupInfo.isActive ? ' active' : '';
  
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
            <div className="popup__title">{popupInfo.title}</div>
          </div>
          <div className="popup__wrapper">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PopupBase