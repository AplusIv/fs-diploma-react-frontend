import { useState } from "react";
import PopupInputField from "./PopupInputField";
import PopupSelectField from "./PopupSelectField";

const PopupSessionInfo = ({ sessionInfo, halls, onChangeCallback }) => {
  // редактирование сеанса
  const [edit, setEdit] = useState(false);

  // редактируемый зал
  const initialHallTitle = halls.find(hall => hall.id === sessionInfo.hall_id).title;

  const handleEdit = () => {
    setEdit(!edit);
  }

  return (
    <li key={sessionInfo.id} className="popup__row">
      <label> Зал:{' '}
        {<PopupSelectField 
          info={sessionInfo}
          initialValue={initialHallTitle}
          optionsData={halls}
          name="hall_id"
          edit={!edit}
          onChangeCallback={onChangeCallback} />}
      </label>
      <label>Время сеанса:{' '}
        <PopupInputField
          info={sessionInfo}
          initialValue={sessionInfo.time}
          name="time"
          type="time"
          edit={edit}
          onChangeCallback={onChangeCallback} />
      </label>
      {edit ?
        <button onClick={handleEdit}>Принять изменения</button>
        : <button onClick={handleEdit}>Редактировать сеанс</button>}
    </li>
  )
}

export default PopupSessionInfo