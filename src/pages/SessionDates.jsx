import dayjs from "dayjs";
import { nanoid } from "nanoid";

const SessionDates = ({ days, date, handleChangeDate }) => {

  // const now = dayjs();
  // let days = [];
  
  // for (let index = 0; index < 14; index++) {
  //   const day = now.add(index, 'day');
  //   days.push(day);
  // }

  // console.log({days});
  // console.log(typeof days[0].format('YYYY-MM-DD'));
  

  return (
    <ul className="conf-step__selectors-box" >
      { days.map(day => (
        <li key={ nanoid() }>
          <input 
            type="radio" 
            name="session-dates"
            className="conf-step__radio" 
            value={ day.format('YYYY-MM-DD') }
            onChange={handleChangeDate}
            checked={date === day.format('YYYY-MM-DD') ? true : false}
          />          
          <span className="conf-step__selector">{ day.format('DD.MM.YYYY') }</span>
        </li>)
      ) }
    </ul>
  )
}

export default SessionDates