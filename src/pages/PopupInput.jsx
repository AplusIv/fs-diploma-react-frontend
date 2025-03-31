// import { useState } from "react";
import { useSelector } from "react-redux";

const PopupInput = ({ /* initialValue = "",  */belongsTo, name, type, placeholder = "", autoComplete, edit = true, onChangeCallback, selectedIndex=null }) => {
  /* // Рабочий вариант до Redux
  const [value, setValue] = useState(initialValue); */

  const hallDataValue = useSelector(state => state.hallPopupDataReducer.hallPopupData[name]); // имя поля из импута соответствует свойству объекта из состояния
  const editMovieDataValue = useSelector(state => state.popupEditMovieReducer.popupEditedMovieData[name]); // имя поля из импута соответствует свойству объекта из состояния
  const addMovieDataValue = useSelector(state => state.popupAddMovieReducer.popupAddMovieData[name]); // имя поля из импута соответствует свойству объекта из состояния
  // const editSessionDataValue = useSelector(state => state.popupEditSessionReducer.popupEditSessionData[name]); // имя поля из импута соответствует свойству объекта из состояния

  const selectedSessionIndex = useSelector(state => state.popupEditSessionsReducer.popupSelectedSession);
  const sessionData = useSelector(state => state.popupEditSessionsReducer.popupEditSessionsData[selectedIndex]);
  //   const sessionDataValue = useSelector(state => state.popupEditSessionsReducer.popupEditSessionsData[selectedIndex]);

  const addSessionDataValue = useSelector(state => state.popupAddSessionReducer.popupAddSessionData[name]); // имя поля из импута соответствует свойству объекта из состояния


  let value;

  switch (belongsTo) {
    case 'add hall':
      value = hallDataValue;
      break;
    case 'edit movie':
      value = editMovieDataValue;
      break;
    case 'add movie':
      value = addMovieDataValue;
      break;
    case 'edit session':
      value = sessionData[name];
      break;
    case 'add session':
      value = addSessionDataValue;
      break;

    default:
      break;
  }

  // const value = useSelector(state => state.hallPopupDataReducer.hallPopupData[name]); // имя поля из импута соответствует свойству объекта из состояния

  return (
    <input
      className="popup__input"
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      autoComplete={autoComplete}
      onChange={(e) => {
        // setValue(e.target.value);
        onChangeCallback && onChangeCallback(e.target.value, name);
      }}
      disabled={!edit}
      required>
    </input>
  )
}

export default PopupInput