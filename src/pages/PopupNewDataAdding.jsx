import { useState } from "react"
import PopupNewDataSelectField from "./PopupNewDataSelectField";
import PopupNewDataInputField from "./PopupNewDataInputField";


const PopupNewDataAdding = ({ initialItem = {}, halls, movies, buttonTitle, onAddCallback, setAdding, edit, handleChange, handlePopup, children }) => {
  // const [newItem, setNewItem] = useState({
  //   id: `${++lastId}`
  // });
  const [newItem, setNewItem] = useState(initialItem);
  console.log({ newItem });




  const handleAddData = () => {
    console.log('добавление нового элемента в массив');
    onAddCallback(newItem);

    setNewItem({});
    setAdding(false);
  }

  const onChangeCallback = (editedValue, name) => {
    setNewItem({ ...newItem, [name]: editedValue });
  }

  return (
    <div className="popup__row add-item">
      <label> Зал:{' '}
        {<PopupNewDataSelectField
          optionsData={halls}
          name="hall_id"
          onChangeCallback={onChangeCallback} />}
      </label>
      <label> Фильм:{' '}
        {<PopupNewDataSelectField
          optionsData={movies}
          name="movie_id"
          onChangeCallback={onChangeCallback} />}
      </label>
      <label>Время сеанса:{' '}
        <PopupNewDataInputField
          name="time"
          type="time"
          onChangeCallback={onChangeCallback} />
      </label>
      <button className="conf-step__button conf-step__button-accent" onClick={handleAddData}>{buttonTitle}</button>
    </div>
  )
}

export default PopupNewDataAdding