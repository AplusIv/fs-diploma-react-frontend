import { useState } from "react"
import PopupInput from "./PopupInput";


const PopupHallAdding = ({ initialItem = {}, buttonTitle, onAddCallback, handlePopup, children }) => {
  // const [newItem, setNewItem] = useState({
  //   id: `${++lastId}`
  // });
  const [newItem, setNewItem] = useState(initialItem);
  console.log({ newItem });


  const handleAddData = (e) => {
    e.preventDefault();
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
    <form onSubmit={handleAddData}>
      <div className="popup__row add-item">
        <label>Название зала:{' '}
          <PopupInput
            name="title"
            type="text"
            autoComplete="on"
            placeholder="Введите название зала"
            // edit={!edit}
            onChangeCallback={onChangeItemData} />
        </label>
        <button type="submit" className="conf-step__button conf-step__button-accent" onSubmit={handleAddData}>{buttonTitle}</button>
      </div>
    </form>
  )
}

export default PopupHallAdding