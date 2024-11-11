import { useState } from "react";
import PopupInput from "./PopupInput";
import PopupTextarea from "./PopupTextarea";


const PopupChangeForm = ({ editedElement, onChangeCallback, buttonTitle, handlePopup, onDeleteCallback }) => {
  console.log({editedElement});
  
  const [newItem, setNewItem] = useState(editedElement);
  console.log({ newItem });

  const handleData = (e) => {
    e.preventDefault();
    console.log('изменение элемента в массиве');
    onChangeCallback(newItem, newItem.id);

    setNewItem({});
    // setAdding(false);
    handlePopup('hide popup');
  }

  const handleDelete = () => {  
    onDeleteCallback(editedElement);
    setNewItem({});
    // setAdding(false);
    handlePopup('hide popup');
  }

  const onChangeItemData = (editedValue, name) => {
    setNewItem({ ...newItem, [name]: editedValue });
  }
  return (
    <form onSubmit={handleData}>
      <div className="popup__row">
        <label> Название:{' '}
          <PopupInput
            // elementId={editedElement}
            initialValue={editedElement.title}
            name="title"
            type="text"
            placeholder="Название фильма"
            autoComplete="on"
            edit={true}
            onChangeCallback={onChangeItemData} />
        </label>
      </div>
      <div className="popup__row">
        <label> Описание:{' '}
          <PopupTextarea
            // elementId={editedElement}
            initialValue={editedElement.description}
            name="description"
            placeholder="Название фильма"
            autoComplete="on"
            edit={true}
            onChangeCallback={onChangeItemData} />
        </label>
      </div>
      <div className="popup__row">
        <label> Длительность, мин:{' '}
          <PopupInput
            // elementId={editedElement}
            initialValue={editedElement.duration}
            name="duration"
            type="text"
            // type="text" number возможно лучше
            placeholder="Название фильма"
            autoComplete="on"
            edit={true}
            onChangeCallback={onChangeItemData} />
        </label>
      </div>
      <div>
        <label> Производство:{' '}
          <PopupInput
            // elementId={editedElement}
            initialValue={editedElement.country}
            name="country"
            type="text"
            placeholder="Производство фильма"
            autoComplete="on"
            edit={true}
            onChangeCallback={onChangeItemData} />
        </label>
      </div>
      <button type="submit" className="conf-step__button conf-step__button-accent" onSubmit={handleData}>{buttonTitle}</button>

      <button type="button" className="conf-step__button conf-step__button-warning" onClick={handleDelete}>Удалить фильм</button>
    </form>
  )
}

export default PopupChangeForm