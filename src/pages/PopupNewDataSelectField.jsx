import { useState } from "react";

const PopupNewDataSelectField = ({ optionsData, name, onChangeCallback }) => {
  const [value, setValue] = useState('');
  return (
    <select 
      className="popup__select"
      value={value}
      name={name}
      onChange={(e) => {
        const valueId = optionsData.find((optionData) => optionData.title === e.target.value).id;
        setValue(e.target.value);
        onChangeCallback && onChangeCallback(valueId, name);
      }}
    >
      {optionsData.map(optionData => <option
        key={optionData.id}
        value={optionData.title}
      >{optionData.title}
      </option>)}
    </select>
  )
}

export default PopupNewDataSelectField