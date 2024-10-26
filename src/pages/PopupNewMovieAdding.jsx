import { useState } from "react"
import PopupNewDataInputField from "./PopupNewDataInputField";
import PopupNewDataTextareaField from "./PopupNewDataTextareaField";


const PopupNewMovieAdding = ({ initialItem = {}, buttonTitle, onAddCallback }) => {
  const [newItem, setNewItem] = useState(initialItem);
  console.log({ newItem });


  const handleAddData = () => {
    console.log('добавление нового элемента в массив');
    onAddCallback(newItem);

    setNewItem({});
  }

  const onChangeCallback = (editedValue, name) => {
    setNewItem({ ...newItem, [name]: editedValue });
  }

  return (
    <>
      <div className="popup__row">
        <label>
          Название фильма:{' '}
          <PopupNewDataInputField
            name="title"
            type="text"
            placeholder="Название фильма"
            autoComplete="on"
            onChangeCallback={onChangeCallback} />
        </label>
      </div>

      <div className="popup__row">
        <label>
          Описание фильма:{' '}
          <PopupNewDataTextareaField
            name="description"
            rows="5"
            cols="33"
            placeholder="Введите описание фильма"
            autoComplete="on"
            onChangeCallback={onChangeCallback} />
        </label>
      </div>

      <div className="popup__row">
        <label>
          Длительность фильма:{' '}
          <PopupNewDataInputField
            type="text"
            // type="number" всё-таки длительность фильма это число
            name="duration"
            placeholder="Длительность фильма"
            autoComplete="on"
            onChangeCallback={onChangeCallback} />
        </label>
      </div>

      <div className="popup__row">
        <label>
          Название страны:{' '}
          <PopupNewDataInputField
            type="text"
            name="country"
            placeholder="Название страны"
            autoComplete="on"
            onChangeCallback={onChangeCallback} />
        </label>
      </div>

      {/* <input type="button" value={popupInfo.title} onClick={console.log('добавить фильм')} /> */}
      <button className="conf-step__button conf-step__button-accent" onClick={handleAddData}>{buttonTitle}</button>
    </>
  )
}

export default PopupNewMovieAdding