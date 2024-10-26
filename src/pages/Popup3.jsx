import apiClient from "../services/jsonServerApi";
import axios from "axios";
import { useState } from "react";
import PopupBase from "./PopupBase";

const Popup3 = ({ popupInfo, lastId, movieInfo, handleChange, handlePopup }) => {

  // const initialMovie = activeMovie;
  // console.log(initialMovie);


  // const [movieInfo, setMovieInfo] = useState({
  //   title: '',
  //   description: '',
  //   duration: '',
  //   country: ''
  // })



  // const [movieInfo, setMovieInfo] = useState(initialMovie);
  // console.log(movieInfo);


  // const handleChange = (e) => {
  //   setMovieInfo({...movieInfo, [e.target.name]: e.target.value});
  //   console.log(e.target.value);    
  // }

  // Функционал: Добавление нового фильма
  const handleMovieAdding = (e) => {
    e.preventDefault();

    console.log('movie adding request');

    apiClient.post('/movies', {
      id: `${lastId + 1}`,
      ...movieInfo
    }).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    })

    handlePopup('hide popup'); // скрыть popup после отправки запроса
  }

  // Функционал: Изменение существующего фильма
  const handleMovieEditing = (e) => {
    e.preventDefault();

    console.log('movie editing request');

    apiClient.put(`/movies/${movieInfo.id}`, {
      ...movieInfo
    }).then(response => {
      console.log(response);
    }).catch(error => {
      console.log(error);
    })

    handlePopup('hide popup'); // скрыть popup после отправки запроса
  }

  // Функционал: Добавление нового зала
  const handleHallAdding = (e) => {
    e.preventDefault();

    console.log('Hall adding request');

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
      id: `${lastId + 1}`,
      ...movieInfo,
      'rows': '20',
      'places': '14',
      'normal_price': 240.00,
      'vip_price': 570.00
    }).then(response => {

      console.log(response);
    });

    handlePopup('hide popup'); // скрыть popup после отправки запроса
  }

  if (popupInfo.status === 'adding film popup') {
    return (
      <PopupBase popupInfo={popupInfo} handlePopup={handlePopup}>
        <input
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
        />
        <input type="button" value={popupInfo.title} onClick={handleMovieAdding} />
      </PopupBase>
    )
  }
  // const activeClass = isActive ? ' active' : '';

  // console.dir(activeMovie);

  if (popupInfo.status === 'editing film popup') {
    return (
      <>
        <PopupBase popupInfo={popupInfo} handlePopup={handlePopup}>
          <input
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
          />
          <input type="button" value={popupInfo.title} onClick={handleMovieEditing} />
        </PopupBase>
      </>
    )
  }

  if (popupInfo.status === 'adding hall popup') {
    return (
      <>
        <PopupBase popupInfo={popupInfo} handlePopup={handlePopup}>
          <input
            type="text"
            name="title"
            placeholder="Название зала"
            autoComplete="on"
            value={movieInfo.title}
            onChange={handleChange}
          />
          <input type="button" value="Добавить зал" onClick={handleHallAdding} />
        </PopupBase>
      </>
    )
  }

  if (popupInfo.status === 'editing sessions') {
    return (
      <>
        <PopupBase popupInfo={popupInfo} handlePopup={handlePopup}>
          <label>
            Выберете зал:
            <select name="hall">
              <option value="apple">Apple</option>
              <option value="banana">Banana</option>
              <option value="orange">Orange</option>
            </select>
          </label>


          <select>


          </select>
          {/* <input
            type="text"
            name="title"
            placeholder="Название зала"
            autoComplete="on"
            value={movieInfo.title}
            onChange={handleChange}
          />
          <input type="button" value="Добавить зал" onClick={handleHallAdding} /> */}
        </PopupBase>
      </>
    )
  }

  if (popupInfo.status === 'hide popup') {
    // return null;
    return (
      <PopupBase popupInfo={popupInfo} handlePopup={handlePopup}></PopupBase>
    )
  }
}

export default Popup3