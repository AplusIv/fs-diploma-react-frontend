import { useState } from "react";

const PopupInput = ({ initialValue = "", name, type, placeholder = "", autoComplete, edit, onChangeCallback }) => {
  const [value, setValue] = useState(initialValue);

  return (
    <input
      className="popup__input"
      name={name}
      type={type}
      value={value}
      placeholder={placeholder}
      autoComplete={autoComplete}
      onChange={(e) => {
        setValue(e.target.value);
        onChangeCallback && onChangeCallback(e.target.value, name)
      }}
      disabled={!edit}>
    </input>

    // (elementId) ? <input 
    //   className="popup__input"
    //   name={name}
    //   type={type}
    //   value={value}
    //   onChange={(e) => {
    //     setValue(e.target.value);
    //     onChangeCallback && onChangeCallback(e.target.value, name)
    //   }}
    //   disabled={!edit}>
    // </input>
    // :
    // <input
    // className="popup__input"
    //   name={name}
    //   type={type}
    //   value={value}
    //   placeholder={placeholder}
    //   autoComplete={autoComplete}
    //   onChange={(e) => {
    //     setValue(e.target.value);
    //     onChangeCallback && onChangeCallback(e.target.value, name)
    //   }}
    // >
    // </input>
  )
}

export default PopupInput