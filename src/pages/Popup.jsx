import apiClient from "../services/jsonServerApi";
import axios from "axios";
import { useState } from "react";
import cross from '../img/admin/cross.png';

const Popup = ({isActive, handlePopup}) => {

  const [hallValue, setHallValue] = useState('');



  const handleHallAdding = (e) => {
    e.preventDefault();

    console.log('Post request is here');

    /* fetch("http://localhost:4000/halls", {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         'id': '342',
         'title': hallValue,
         'rows': '20',
         'places': '14',
         'normal_price': 240.00,
         'vip_price': 570.00
      })
  }).then(response => response.json())
  .then(response => {
        console.log(response);
      }) */

    // axios
    //   .get("http://localhost:4000/halls")
    //   .then((response) => response.json())
    //   .then(response => {
    //     console.log(response);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    apiClient.post('/halls', {
        // 'id': '342',
        'title': hallValue,
        'rows': '20',
        'places': '14',
        'normal_price': 240.00,
        'vip_price': 570.00
    }).then(response => {

      console.log(response);

    //     apiClient.post('/login', {
    //         email: email,
    //         password: password
    //     }).then(response => {
    //         console.log(response)
    //     })
    });

    // !isActive;
    handlePopup(!isActive);
  }
  
  const activeClass = isActive ? ' active' : '';
  return (
    <div className={"popup" + activeClass}>
      <div className="popup__container">
        <div className="popup__content">
          <div className="popup__dismiss" onClick={handlePopup}>
            <img src={cross}/>    
          </div>
          <div className="popup__header">
            <div className="popup__title">Добавить зал</div>
          </div>
          <div className="popup__wrapper">
            {/* <input type="submit" value="Добавить зал" onSubmit={handleSubmit} /> */}
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
      </div>
    </div>
  )
}

export default Popup