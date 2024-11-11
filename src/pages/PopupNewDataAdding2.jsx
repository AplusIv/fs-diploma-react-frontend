import { useState } from "react"
import PopupSelect from "./PopupSelect";
import PopupInput from "./PopupInput";


const PopupNewDataAdding2 = ({ initialItem = {}, halls, movies, buttonTitle, onAddCallback, setAdding, edit, handleChange, handlePopup, children }) => {
  // const [newItem, setNewItem] = useState({
  //   id: `${++lastId}`
  // });
  const [newItem, setNewItem] = useState(initialItem);
  console.log({ newItem });


  const handleAddData = (e) => {
    e.preventDefault();
    console.log('submit adding form');
    
    console.log('добавление нового элемента в массив');
    onAddCallback(newItem);

    setNewItem(initialItem);
    setAdding(false);
  }

  const onChangeItemData = (editedValue, name) => {
    if (name === "hall_id") {
      const editedHallId = halls.find(hall => hall.title === editedValue).id;
      setNewItem({ ...newItem, [name]: editedHallId });
    } else if (name === "movie_id") {
      const editedMovieId = movies.find(movie => movie.title === editedValue).id;
      setNewItem({ ...newItem, [name]: editedMovieId });
    } else {
      setNewItem({ ...newItem, [name]: editedValue });
    }
  }

  return (
    <form onSubmit={handleAddData}>
      <div className="popup__row add-item">
        <label> Зал:{' '}
          <PopupSelect
            initialValue={halls[0].title}
            optionsData={halls}
            name="hall_id"
            edit={!edit}
            onChangeCallback={onChangeItemData}
          />
        </label>
        <label> Фильм:{' '}
          <PopupSelect
            initialValue={movies[0].title}
            optionsData={movies}
            name="movie_id"
            edit={!edit}
            onChangeCallback={onChangeItemData}
          />
        </label>
        <label>Время сеанса:{' '}
          <PopupInput
            name="time"
            type="time"
            autoComplete="on"
            edit={!edit}
            onChangeCallback={onChangeItemData} />
        </label>
        <button type="submit" className="conf-step__button conf-step__button-accent" onSubmit={handleAddData}>{buttonTitle}</button>
      </div>
    </form>
  )
}

export default PopupNewDataAdding2