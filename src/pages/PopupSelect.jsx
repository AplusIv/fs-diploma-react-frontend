import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setData, setSelectedMovieTitle } from "../redux/slices/popupEditSessionsHandlerSlice";

const PopupSelect = ({ /* initialValue = "", */belongsTo, optionsData, name, edit=true, onChangeCallback, /* movies, */ sessions, selectedIndex=null }) => {
  // const [value, setValue] = useState(initialValue);

  const selectedMovieValue = useSelector(state => state.popupEditSessionsReducer.popupSelectedMovieTitle);
  // const editSessionDataValue = useSelector(state => state.popupEditSessionReducer.popupEditSessionData[name]); // имя поля из импута соответствует свойству объекта из состояния
  
  const selectedSessionIndex = useSelector(state => state.popupEditSessionsReducer.popupSelectedSession);
  const sessionData = useSelector(state => state.popupEditSessionsReducer.popupEditSessionsData[selectedIndex]);
  //   const sessionDataValue = useSelector(state => state.popupEditSessionsReducer.popupEditSessionsData[selectedIndex]);

  const addSessionDataValue = useSelector(state => state.popupAddSessionReducer.popupAddSessionData[name]); // имя поля из импута соответствует свойству объекта из состояния


  let value;

  switch (belongsTo) {
    case 'sessions filter':
      value = selectedMovieValue;
      break;
    case 'edit session':
      value = optionsData.find(option => option.id === sessionData[name]).title;
      break;
    case 'add session':
      value = optionsData.find(option => option.id === addSessionDataValue).title;
      break;

    default:
      break;
  }

  const dispatch = useDispatch();
  
  if (optionsData.length === 0) return null;

  return (
    <select
      className="popup__select"
      value={value}
      onChange={(e) => {
        // setValue(e.target.value);

        // redux state
        if (belongsTo === 'sessions filter') {
          dispatch(setSelectedMovieTitle({title: e.target.value})); 
          dispatch(setData({movies: optionsData, sessions}));
        } else {
          onChangeCallback && onChangeCallback(e.target.value, name);
        }
      }}
      name={name} 
      disabled={!edit}
      required
    >
      {optionsData.map(optionData => <option
        key={optionData.id}
        value={optionData.title}
      >{optionData.title}
      </option>)}
    </select>
  )
}

export default PopupSelect