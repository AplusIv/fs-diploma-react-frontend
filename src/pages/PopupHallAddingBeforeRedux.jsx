import { useState } from "react"
import PopupInput from "./PopupInput";
import { useDispatch, useSelector } from "react-redux";
import { changeData } from "../redux/slices/hallPopupDataHandlerSlice";


const PopupHallAdding = ({ /* initialItem = {},  */buttonTitle, onAddCallback, handlePopup, children }) => {
  // const [newItem, setNewItem] = useState({
  //   id: `${++lastId}`
  // });

  // redux newHall data 
  const hallPopupData = useSelector(state => state.hallPopupDataReducer.hallPopupData);
  console.log({hallPopupData});

  const dispatch = useDispatch();
  // const handleChangeData = dispatch(changeData({name, editedValue}))
  // const addHallCallback = useCallback(() => dispatch(addHall()), []);
  // const hidePopupCallback = useCallback(() => dispatch(hidePopup()), []);

  

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

    // redux
    dispatch(changeData({property: name, value: editedValue}));
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