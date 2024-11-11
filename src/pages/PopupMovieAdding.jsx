import { useState } from "react"
import PopupInput from "./PopupInput";
import PopupTextarea from "./PopupTextarea";


const PopupMovieAdding = ({ initialItem = {}, buttonTitle, onAddCallback, handlePopup }) => {
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
      <div className="popup__row">
        <label>
          Название фильма:{' '}
          <PopupInput
            name="title"
            type="text"
            placeholder="Название фильма"
            autoComplete="on"
            // edit={!edit}
            onChangeCallback={onChangeItemData} />
        </label>
      </div>

      <div className="popup__row">
        <label>
          Описание фильма:{' '}
          <PopupTextarea
            name="description"
            rows="5"
            cols="33"
            placeholder="Введите описание фильма"
            autoComplete="on"
            onChangeCallback={onChangeItemData} />
        </label>
      </div>

      <div className="popup__row">
        <label>
          Длительность фильма:{' '}
          <PopupInput
            type="text"
            // type="number" всё-таки длительность фильма это число
            name="duration"
            placeholder="Длительность фильма"
            autoComplete="on"
            onChangeCallback={onChangeItemData} />
        </label>
      </div>

      <div className="popup__row">
        <label>
          Название страны:{' '}
          <PopupInput
            type="text"
            name="country"
            placeholder="Название страны"
            autoComplete="on"
            onChangeCallback={onChangeItemData} />
        </label>
      </div>

      <button type="submit" className="conf-step__button conf-step__button-accent" onSubmit={handleAddData}>{buttonTitle}</button>
    </form>
  )
}

export default PopupMovieAdding