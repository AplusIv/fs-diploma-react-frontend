import { useState } from "react";

const PopupSessionInfo = ({ sessionInfo, halls, handleSelect, handleInput, onChangeCallback }) => {
  // редактирование сеанса
  const [edit, setEdit] = useState(false);

  // const [editedSession, setEditedSession] = useState(sessionInfo);

  // редактируемый зал

  const initialHallTitle = halls.find(hall => hall.id === sessionInfo.hall_id).title;
  const [editedHallTitle, setEditedHallTitle] = useState(initialHallTitle);

  // редактируемый сеанс
  const [editedSessionTime, setEditedSessionTime] = useState(sessionInfo.time);

  const handleEdit = (id) => {
    // setEditedSessionId(id);
    // console.log(editedSessionId);
    
    setEdit(!edit);
  }

  
  return (
    <div key={sessionInfo.id}>
      <label> Зал:{' '}
        {!edit && <input
          name="hall_id"
          value={editedHallTitle}
          // value={halls.find(hall => hall.id === session["hall_id"]).title}
          // onChange={handleInput}
          disabled={!edit}>
        </input>}

        {edit && <select
          value={editedHallTitle} // сделать связь с sessionsInfo
          onChange={(e) => {
            // setSelectedHallTitle(e.target.value);
            // console.log(e.target.value);
            // console.log(e);

            setEditedHallTitle(e.target.value);

            onChangeCallback && onChangeCallback(sessionInfo.id, e.target.value, "hall-id")

            // handleInput(e);
            // console.log();
            // setSelectedHallTitle(e.target.value);
          }}
          name="hall-id"
        >
          {/* {halls.map(hall => <option key={hall.id} value={halls.find(hall => hall.id === session["hall_id"]).title} selected={true}>{hall.title}</option>)} */}
          {halls.map(hall => <option
            key={hall.id}
            value={hall.title}
            // selected={!!session.hall_id}
            // selected={true}

          >{hall.title}
          </option>)}

        </select>}
      </label>
      <span> ... </span>
      <label>Время сеанса:{' '}
        <input
          name="time"
          type="time"
          value={editedSessionTime}
          onChange={(e) => {
            setEditedSessionTime(e.target.value);
            onChangeCallback && onChangeCallback(sessionInfo.id, e.target.value, "time")
          }}
          disabled={!edit} />
      </label>
      <button onClick={() => handleEdit(sessionInfo.id)}>Редактировать сеанс</button>
    </div>
  )
}

export default PopupSessionInfo