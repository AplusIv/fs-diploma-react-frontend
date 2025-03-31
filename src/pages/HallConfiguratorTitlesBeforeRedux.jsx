import { useDispatch, useSelector } from "react-redux";

const HallConfiguratorTitles = ({ halls, name, checked, handleChange, handleInput }) => {
  const dispatch = useDispatch();
  // dispatch(getHalls());
  // dispatch(setPrices(halls));
  // redux prices 
  const hallsRedux = useSelector(state => state.hallPricesReducer.halls);
  console.log({hallsRedux});



  return (
    <ul className="conf-step__selectors-box" >
      { halls.map(hall => (
        <li key={ hall.id }>
          <input 
            type="radio" 
            className="conf-step__radio" 
            name={name} 
            value={ hall.title }
            onChange={handleChange}
            onClick={handleInput}
            // checked
            checked={checked == hall.title ? true : false}
          />
          
          <span className="conf-step__selector">{ hall.title }</span>
        </li>)
      ) }
    </ul>
  )
}

export default HallConfiguratorTitles