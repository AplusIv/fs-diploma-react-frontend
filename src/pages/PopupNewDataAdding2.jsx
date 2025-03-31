// import { useState } from "react"
import PopupSelect from "./PopupSelect";
import PopupInput from "./PopupInput";
import { useDispatch, useSelector } from "react-redux";
import { changeData, setToInitialData } from "../redux/slices/popupAddSessionHandlerSlice";
// import { setData, setSelectedMovieTitle } from "../redux/slices/popupEditSessionsHandlerSlice";


const PopupNewDataAdding2 = ({ /* initialItem = {},  */halls, movies, sessions, buttonTitle, onAddCallback,/*  setAdding, */ edit }) => {
  // before redux
  // const [newItem, setNewItem] = useState(initialItem);
  // console.log({ newItem });

  // redux added session data 
  const popupData = useSelector(state => state.popupAddSessionReducer.popupAddSessionData);
  console.log({ popupData });

  const dispatch = useDispatch();


  const handleAddData = (e) => {
    e.preventDefault();
    
    console.log('добавление нового элемента в массив');
    // redux
    onAddCallback(popupData);
    dispatch(setToInitialData());

    // // обновить список редактируемых фильмов
    // dispatch(setSelectedMovieTitle({title: 'Утиные истории'})); 
    // dispatch(setData({movies, sessions}));
    
    // before redux
    // onAddCallback(newItem);

    // setNewItem(initialItem);
    // setAdding(false);
  }

  // const onChangeItemData = (editedValue, name) => {
  //   if (name === "hall_id") {
  //     const editedHallId = halls.find(hall => hall.title === editedValue).id;
  //     setNewItem({ ...newItem, [name]: editedHallId });
  //   } else if (name === "movie_id") {
  //     const editedMovieId = movies.find(movie => movie.title === editedValue).id;
  //     setNewItem({ ...newItem, [name]: editedMovieId });
  //   } else {
  //     setNewItem({ ...newItem, [name]: editedValue });
  //   }
  // }
  const onChangeItemData = (editedValue, name) => {
    dispatch(changeData({ property: name, value: editedValue }))
  }

  return (
    <form onSubmit={handleAddData}>
      <div className="popup__row add-item">
        <label> Зал:{' '}
          <PopupSelect
            belongsTo='add session'
            // initialValue={(halls.length > 0) ? halls[0].title : ''}
            optionsData={halls}
            name="hall_id"
            edit={!edit}
            onChangeCallback={onChangeItemData}
          />
        </label>
        <label> Фильм:{' '}
          <PopupSelect
            belongsTo='add session'
            // initialValue={(movies.length > 0) ? movies[0].title : ''}
            optionsData={movies}
            name="movie_id"
            edit={!edit}
            onChangeCallback={onChangeItemData}
          />
        </label>
        <label>Время сеанса:{' '}
          <PopupInput
            belongsTo='add session'
            name="time"
            type="time"
            autoComplete="on"
            edit={!edit}
            onChangeCallback={onChangeItemData} />
        </label>
        <label>Дата сеанса:{' '}
          <PopupInput
            belongsTo='add session'
            name="date"
            type="date"
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