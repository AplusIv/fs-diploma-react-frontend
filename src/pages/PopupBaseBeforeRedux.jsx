// import apiClient from "../services/jsonServerApi";
// import axios from "axios";
// import { useState } from "react";
import cross from '../img/admin/cross.png'

const PopupBase = ({popupInfo, handlePopup, children}) => {

  const activeClass = popupInfo.isActive ? ' active' : '';
  
  return (
    // <></>
    <div className={"popup" + activeClass}>
      <div className="popup__container">
        <div className="popup__content popup__text">
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