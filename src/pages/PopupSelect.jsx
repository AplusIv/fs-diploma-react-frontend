import { useState } from "react";

const PopupSelect = ({ initialValue = "", optionsData, name, edit=true, onChangeCallback }) => {
  const [value, setValue] = useState(initialValue);
  return (
    <select
      className="popup__select"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        onChangeCallback && onChangeCallback(e.target.value, name);
      }}
      name={name} 
      disabled={!edit}
      required
    >
      {optionsData.map(optionData => <option
        key={optionData.id}
        value={optionData.title}
      >{optionData.title}
      </option>)}
    </select>
  )
}

export default PopupSelect