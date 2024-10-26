import { useState } from "react";

const PopupNewDataTextareaField = ({ name, rows, cols, placeholder='', autoComplete, onChangeCallback }) => {
  const [value, setValue] = useState('');
  return (
    <textarea
    className="popup__input"
      name={name}
      rows={rows}
      cols={cols}
      value={value}
      placeholder={placeholder}
      autoComplete={autoComplete}
      onChange={(e) => {
        setValue(e.target.value);
        onChangeCallback && onChangeCallback(e.target.value, name)
      }}
    >
    </textarea>
  )
}

export default PopupNewDataTextareaField