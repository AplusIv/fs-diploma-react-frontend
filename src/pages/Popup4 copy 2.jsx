import apiClient from "../services/jsonServerApi";
import axios from "axios";
import { useState } from "react";
import PopupBase from "./PopupBase";
import PopupSessionInfo from "./PopupSessionInfo";
import PopupNewDataAdding from "./PopupNewDataAdding";
import PopupInputField from "./PopupInputField";
import PopupSelectField from "./PopupSelectField";
import PopupNewDataInputField from "./PopupNewDataInputField";
import PopupNewDataSelectField from "./PopupNewDataSelectField";
import PopupNewDataTextareaField from "./PopupNewDataTextareaField";
import PopupNewMovieAdding from "./PopupNewMovieAdding";
import PopupInput from "./PopupInput";
import PopupChangeForm from "./PopupChangeForm";
import PopupSelect from "./PopupSelect";
import PopupChangeSessionsForm from "./PopupChangeSessionsForm";
import PopupNewDataAdding2 from "./PopupNewDataAdding2";
import PopupHallAdding from "./PopupHallAdding";
import PopupMovieAdding from "./PopupMovieAdding";
import PopupChangeSessions from "./PopupChangeSessions";

const Popup4 = ({ popupInfo, halls = [], movies = [], sessions = [], editedElement = {}, handleInput, handleSelect, onChangeCallback, onAddCallback, edit, handleChange, handlePopup }) => {

  // Выбранный зал
  // const initialSelectedHallTitle = halls[0].title;
  // const [selectedHallTitle, setSelectedHallTitle] = useState(initialSelectedHallTitle);

  // Выбранный фильм
  let initialSelectedMovieTitle;
  movies.length > 0 ? initialSelectedMovieTitle = movies[0].title : null;
  // const initialSelectedMovieTitle = movies[0].title;
  const [selectedMovieTitle, setSelectedMovieTitle] = useState(initialSelectedMovieTitle);

  // Выбранный зал
  // const initialSelectedMovieTitle = movies[0].title;
  // const [selectedHallTitle, setSelectedHallTitle] = useState('');


  // возможность редакировать инпуты
  const [isDisabled, setisDisabled] = useState(false);

  // добавить/отменить добавление сеанса
  const [isAdding, setIsAdding] = useState(false);

  // const [edit, setEdit] = useState(false)F

  // возмоность обновления сеансов
  // const [edit, setEdit] = useState(true)


  // const handleEdit = (id) => {
  //   // setEditedSessionId(id);
  //   console.log(editedSessionId);

  //   setEdit(!edit);
  // }

  // Ids
  let lastSessionId = sessions.length;
  let lastHallId = halls.length;
  let lastMovieId = movies.length;

  const handleSelectedMovieTitle = (value, name) => {
    console.log(name, value);
    setSelectedMovieTitle(value);
  }


  if (popupInfo.status === 'adding film popup') {
    return (
      <PopupBase popupInfo={popupInfo} handlePopup={handlePopup}>
        <PopupMovieAdding
          initialItem={
            {
              id: `${++lastMovieId}`,
            }}
          buttonTitle={'Добавить фильм'}
          onAddCallback={onAddCallback}
          handlePopup={handlePopup}
        />
        {/* <PopupNewMovieAdding
          initialItem={
            {
              id: `${++lastMovieId}`,
            }}
          buttonTitle={'Добавить фильм'}
          onAddCallback={onAddCallback} /> */}
      </PopupBase>
    )
  }

  if (popupInfo.status === 'adding hall popup') {
    return (
      <PopupBase popupInfo={popupInfo} handlePopup={handlePopup}>
        <PopupHallAdding
          initialItem={
            {
              id: `${++lastHallId}`,
              rows: 5,
              places: 6,
              normal_price: 250.00,
              vip_price: 500.50
            }}
          buttonTitle={'Добавить зал'}
          onAddCallback={onAddCallback}
          handlePopup={handlePopup} />
      </PopupBase>
    )
  }

  if (popupInfo.status === 'editing film popup') {
    return (
      <>
        <PopupBase popupInfo={popupInfo} handlePopup={handlePopup}>
          <PopupChangeForm
            editedElement={editedElement}
            onChangeCallback={onChangeCallback}
            buttonTitle={'Изменить фильм'}
            handlePopup={handlePopup} />
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
              Выберете фильм (Новый селект):{' '}
              <PopupSelect
                initialValue={selectedMovieTitle}
                // defaultValue={movies[0].title}
                optionsData={movies}
                name="movie-title"
                edit={true}
                onChangeCallback={handleSelectedMovieTitle} />
            </label>

            <label>
              Текущие сеансы (новое):
              <PopupChangeSessions
                selectedMovieTitle={selectedMovieTitle}
                sessions={sessions}
                movies={movies}
                sessionsByMovie={filtredSessions}
                halls={halls}
                onChangeCallback={onChangeCallback} />
              {/* <ul className="all-sessions">
                {filtredSessions.map(session =>
                  <PopupChangeSessionsForm
                    key={session.id}
                    editedElement={session}
                    halls={halls}
                    // handleSelect={handleSelect} 
                    // handleInput={handleInput}
                    onChangeCallback={onChangeCallback}
                  // handlePopup={handlePopup}
                  // handleEdit={handleEdit}
                  />
                )}
              </ul> */}
            </label>

            <div>
              {isAdding ?
                <button
                  className="conf-step__button conf-step__button-accent"
                  onClick={() => setIsAdding(!isAdding)}>Отменить добавление сеанса</button>
                : <button
                  className="conf-step__button conf-step__button-accent"
                  onClick={() => setIsAdding(!isAdding)}>Добавить сеанс</button>}
            </div>

            {isAdding && <PopupNewDataAdding2
              initialItem={
                {
                  id: `${++lastSessionId}`,
                  date: "25.06.2024"
                }}
              halls={halls}
              movies={movies}
              buttonTitle={'Подтвердить'}
              onAddCallback={onAddCallback}
              setAdding={setIsAdding}
            >
            </PopupNewDataAdding2>}



            <label>
              Выберете фильм:{' '}
              <select
                className="popup__select"
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
              <ul className="all-sessions">
                {filtredSessions.map(session =>
                  <PopupSessionInfo
                    key={session.id}
                    sessionInfo={session}
                    halls={halls}
                    // handleSelect={handleSelect} 
                    // handleInput={handleInput}
                    onChangeCallback={onChangeCallback}
                  // handleEdit={handleEdit}
                  />
                )}
              </ul>
            </label>

            {/* <button onClick={() => console.log('edit')}>Добавить сеанс</button> */}
            <div>
              {isAdding ?
                <button
                  className="conf-step__button conf-step__button-accent"
                  onClick={() => setIsAdding(!isAdding)}>Отменить добавление сеанса</button>
                : <button
                  className="conf-step__button conf-step__button-accent"
                  onClick={() => setIsAdding(!isAdding)}>Добавить сеанс</button>}
            </div>

            {isAdding && <PopupNewDataAdding
              initialItem={
                {
                  id: `${++lastSessionId}`,
                  date: "25.06.2024"
                }}
              halls={halls}
              movies={movies}
              buttonTitle={'Подтвердить'}
              onAddCallback={onAddCallback}
              setAdding={setIsAdding}
            >
            </PopupNewDataAdding>}


            <div className="new-sessions">

            </div>

            <p className="conf-step__paragraph">
              <button className="conf-step__button conf-step__button-accent">Подтвердить изменения</button>
            </p>
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