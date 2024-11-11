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
import PopupChangeSessions2 from "./PopupChangeSessions2";

const Popup4 = ({ popupInfo, halls = [], movies = [], sessions = [], editedElement = {}, handleInput, handleSelect, onChangeCallback, onAddCallback, onDeleteCallback, edit, handleChange, handlePopup }) => {

  // Выбранный зал
  // const initialSelectedHallTitle = halls[0].title;
  // const [selectedHallTitle, setSelectedHallTitle] = useState(initialSelectedHallTitle);

  // // Выбранный фильм
  // let initialSelectedMovieTitle;
  // movies.length > 0 ? initialSelectedMovieTitle = movies[0].title : null;
  // // const initialSelectedMovieTitle = movies[0].title;
  // const [selectedMovieTitle, setSelectedMovieTitle] = useState(initialSelectedMovieTitle);

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

  // const handleSelectedMovieTitle = (value, name) => {
  //   console.log(name, value);
  //   setSelectedMovieTitle(value);
  // }


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
            onDeleteCallback={onDeleteCallback}
            buttonTitle={'Изменить фильм'}
            handlePopup={handlePopup} />
        </PopupBase>
      </>
    )
  }

  if (popupInfo.status === 'editing sessions') {
    // const filtredSessions = sessions.filter(session => session.movie_id === movies.find(movie => movie.title === selectedMovieTitle).id)


    return (
      <>
        <PopupBase popupInfo={popupInfo} handlePopup={handlePopup}>
          <PopupChangeSessions2
          // selectedMovieTitle={selectedMovieTitle}
          // handleSelectedMovieTitle={handleSelectedMovieTitle}
          movies={movies}
          sessions={sessions}
          halls={halls}
          // filtredSessions={filtredSessions}
          lastSessionId={lastSessionId}
          onChangeCallback={onChangeCallback}
          onAddCallback={onAddCallback}
          onDeleteCallback={onDeleteCallback}
          />
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