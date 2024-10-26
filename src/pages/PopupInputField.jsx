import { useState } from "react";

const PopupInputField = ({ info, initialValue, name, type, edit, onChangeCallback }) => {
  const [value, setValue] = useState(initialValue);
  return (
    <input 
      className="popup__input"
      name={name}
      type={type}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        onChangeCallback && onChangeCallback(info.id, e.target.value, name)
      }}
      disabled={!edit}>
    </input>
  )
}

export default PopupInputField