import { useState } from "react";

const PopupSelectField = ({ info, initialValue, optionsData, name, edit, onChangeCallback }) => {
  const [value, setValue] = useState(initialValue);
  return (
    <select 
      className="popup__select"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        onChangeCallback && onChangeCallback(info.id, e.target.value, name);
      }}
      name={name} disabled={edit}
    >
      {optionsData.map(optionData => <option
        key={optionData.id}
        value={optionData.title}
      >{optionData.title}
      </option>)}
    </select>
  )
}

export default PopupSelectField