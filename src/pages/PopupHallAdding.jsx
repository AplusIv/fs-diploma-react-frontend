import { useState } from "react"
import PopupInput from "./PopupInput";


const PopupHallAdding = ({ initialItem = {}, halls, buttonTitle, onAddCallback, setAdding, edit, handleChange, handlePopup, children }) => {
  // const [newItem, setNewItem] = useState({
  //   id: `${++lastId}`
  // });
  const [newItem, setNewItem] = useState(initialItem);
  console.log({ newItem });


  const handleAddData = () => {
    console.log('добавление нового элемента в массив');
    onAddCallback(newItem);

    setNewItem(initialItem);
    // setAdding(false);
    handlePopup('hide popup');
  }

  const onChangeItemData = (editedValue, name) => {
    setNewItem({ ...newItem, [name]: editedValue });
  }

  return (
    <div className="popup__row add-item">    
      <label>Название зала:{' '}
        <PopupInput
          name="title"
          type="text"
          autoComplete="on"
          placeholder="Введите название зала"
          edit={!edit}
          onChangeCallback={onChangeItemData} />
      </label>
      <button className="conf-step__button conf-step__button-accent" onClick={handleAddData}>{buttonTitle}</button>
    </div>
  )
}

export default PopupHallAdding