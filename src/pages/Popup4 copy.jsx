import apiClient from "../services/jsonServerApi";
import axios from "axios";
import { useState } from "react";
import PopupBase from "./PopupBase";

const Popup4 = ({ popupInfo, halls = [], movies = [], sessions = [], handleInput, handleEdit, handleChange, handlePopup }) => {

  // Выбранный зал
  const initialSelectedHallTitle = halls[0].title;
  const [selectedHallTitle, setSelectedHallTitle] = useState(initialSelectedHallTitle);

  // Выбранный фильм
  const initialSelectedMovieTitle = movies[0].title;
  const [selectedMovieTitle, setSelectedMovieTitle] = useState(initialSelectedMovieTitle);

  // возможность редакировать инпуты
  const [isDisabled, setisDisabled] = useState(false);

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
    const filtredSessions = sessions.filter(session => session.movie_id === movies.find(movie => movie.title === selectedMovieTitle).id)


    return (
      <>
        <PopupBase popupInfo={popupInfo} handlePopup={handlePopup}>
          <div className="session-popup">
            <label>
              Выберете зал:{' '}
              <select
                value={selectedHallTitle}
                onChange={(e) => {
                  setSelectedHallTitle(e.target.value);
                  console.log(e.target.value);
                }}
                name="hall-title"
              >
                {halls.map(hall => <option key={hall.id} value={hall.title}>{hall.title}</option>)}
              </select>
            </label>

            <label>
              Выберете фильм:{' '}
              <select
                value={selectedMovieTitle}
                onChange={(e) => {
                  setSelectedMovieTitle(e.target.value);
                  console.log(e.target.value);
                }}
                name="movie-title"
              >
                {movies.map(movie => <option key={movie.id} value={movie.title}>{movie.title}</option>)}
              </select>
            </label>


            <label>
              Текущие сеансы:
              <div className="all-sessions">
                {filtredSessions.map(session =>
                  <div key={session.id}>
                    <label> Название зала:{' '}
                      <input
                        name="hall_id"
                        value={halls.find(hall => hall.id === session["hall_id"]).title}
                        onChange={handleInput}
                        disabled={isDisabled}>
                      </input>
                      <select
                        value={selectedHallTitle}
                        onChange={(e) => {
                          setSelectedHallTitle(e.target.value);
                          console.log(e.target.value);
                        }}
                        name="hall-title"
                      >
                        {halls.map(hall => <option key={hall.id} value={halls.find(hall => hall.id === session["hall_id"]).title}>{hall.title}</option>)}
                      </select>
                    </label>
                    <span> ... </span>
                    <input
                      name="time"
                      type="time"
                      value={session.time}
                      onChange={handleInput}
                      disabled={isDisabled} />
                    <button onClick={() => handleEdit(session.id)}>Редактировать сеанс</button>
                  </div>)}
              </div>
            </label>

            <button>Добавить сеанс</button>
          </div>
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

export default Popup4