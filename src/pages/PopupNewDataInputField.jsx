import { useState } from "react";

const PopupNewDataInputField = ({ name, type, placeholder='', autoComplete, onChangeCallback }) => {
  const [value, setValue] = useState('');
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
    >
    </input>
  )
}

export default PopupNewDataInputField