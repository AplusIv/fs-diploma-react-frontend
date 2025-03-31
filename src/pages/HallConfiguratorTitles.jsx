import { useDispatch, useSelector } from "react-redux";
import { setSelectedHallId } from "../redux/slices/hallPricesSlice";

const HallConfiguratorTitles = ({ halls, name, checked, handleChange, handleInput }) => {
  const dispatch = useDispatch();
  // dispatch(getHalls());
  // dispatch(setPrices(halls));
  // redux prices 
  const hallsRedux = useSelector(state => state.hallPricesReducer.halls);
  console.log({hallsRedux});

  const selectedHallIdInPriceConfigurator = useSelector(state => state.hallPricesReducer.selectedHallId);
  console.log({selectedHallIdInPriceConfigurator});

  let selectedHallId;
  // возможно нужно ещё будет что-то вроде let halls;

  switch (name) {
    case 'prices-hall':
      selectedHallId = selectedHallIdInPriceConfigurator;
      break;
    case 'chairs-hall':
      // selectedHallId = editMovieDataValue;
      break;

    default:
      break;
  }

  return (
    <ul className="conf-step__selectors-box" >
      { halls.map(hall => (
        <li key={ hall.id }>
          <input 
            type="radio" 
            className="conf-step__radio" 
            name={ name } 
            value={ hall.title }
            onChange={handleChange}
            // onChange={(e) => dispatch(setSelectedHallId(e.target.value))}
            // onClick={handleInput}
            checked={selectedHallId === hall.id}
            // checked={checked == hall.title ? true : false}
          />
          
          <span className="conf-step__selector">{ hall.title }</span>
        </li>)
      ) }
    </ul>
  )
}

export default HallConfiguratorTitles