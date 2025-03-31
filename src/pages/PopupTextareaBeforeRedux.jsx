import { useState } from "react";

const PopupTextarea = ({ elementId, initialValue = "", name, rows, cols, placeholder = "", autoComplete, edit=true, onChangeCallback }) => {
  const [value, setValue] = useState(initialValue);

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
      disabled={!edit}
      required
      minLength={10}
    >
    </textarea>
  )
}

export default PopupTextarea;