import { useState } from "react";
import PopupInput from "./PopupInput";
import PopupSelect from "./PopupSelect";


const PopupChangeSession = ({ editedElement, halls, onChangeCallback, onDeleteCallback, selectedIndex, setSelectedIndex, isEdit, handleSubmit }) => {
  const [newItem, setNewItem] = useState(editedElement);
  console.log({ newItem });
  

  // редактируемый зал
  const initialHallTitle = halls.find(hall => hall.id === newItem.hall_id).title;

  const handleData = () => {
    console.log('изменение элемента в массиве');
    onChangeCallback(newItem, newItem.id);

    // setNewItem({});
    // setAdding(false);
    // handlePopup('hide popup');
  }

  const handleDelete = () => {  
    onDeleteCallback(editedElement);
    setNewItem({});
    // setAdding(false);
  }

  const onChangeItemData = (editedValue, name) => {
    if (name === "hall_id") {
      const editedHallId = halls.find(hall => hall.title === editedValue).id;
      setNewItem({ ...newItem, [name]: editedHallId });
    } else {
      setNewItem({ ...newItem, [name]: editedValue });
    }
  }

  return (
    <>
      <li className="popup__row">
        <label> Зал:{' '}
          {<PopupSelect
            // info={sessionInfo}
            initialValue={initialHallTitle}
            optionsData={halls}
            name="hall_id"
            edit={isEdit}
            onChangeCallback={onChangeItemData} />}
        </label>
        <label>Время сеанса:{' '}
          <PopupInput
            // info={sessionInfo}
            initialValue={editedElement.time}
            name="time"
            type="time"
            autoComplete="on"
            edit={isEdit}
            onChangeCallback={onChangeItemData} />
        </label>
        {isEdit ?
          <button className="conf-step__button conf-step__button-regular" onClick={() => {           
            setSelectedIndex(undefined);
            handleData();
          }}>Принять изменения</button>
          : <button className="conf-step__button conf-step__button-regular" onClick={() => setSelectedIndex(selectedIndex)}>Редактировать сеанс</button>}
       
        <button type="button" className="conf-step__button conf-step__button-warning" onClick={handleDelete} >Удалить сеанс</button>
      </li>
    </>
  )
}

export default PopupChangeSession