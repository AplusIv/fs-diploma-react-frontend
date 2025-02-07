import { NavLink } from "react-router-dom"
// dayjs
import dayjs from "dayjs";
import { useState } from "react";
import { nanoid } from "nanoid";


// обновить дни недели на русском
import updateLocale from 'dayjs/plugin/updateLocale'; // ES 2015

dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
  weekdays: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]
});


const PageNavigator = () => {
  // выбор активного дня
  const [activeDay, setActiveDay] = useState(0);
  const [daysInterval, setDaysInterval] = useState({
    firstDay: 0,
    lastDay: 6
  });

  // Для показа следующих/предыдущих дней
  const paginateStep = 6;

  const handleActiveDay = (index) => {
    console.log(index);
    setActiveDay(index);
  }

  const handleDaysIntervalToFuture = () => {
    setDaysInterval({
      firstDay: daysInterval.firstDay + paginateStep,
      lastDay: daysInterval.lastDay + paginateStep
    });
  }

  const handleDaysIntervalToPast = () => {
    if (daysInterval.firstDay > 0) {
      setDaysInterval({
        firstDay: daysInterval.firstDay - paginateStep,
        lastDay: daysInterval.lastDay - paginateStep
      });
    }    
  }
  
  // const [isActive, setIsActive] = useState(true);

  // const [page, setpage] = useState(second)

  const now = dayjs();
  let days = [];
  // надо будет поместить в стейт, чтобы отображался выбранный интервал дней
  
  for (let index = daysInterval.firstDay; index < daysInterval.lastDay; index++) {
    const day = now.add(index, 'day');
    days.push(day);
  }

  console.log(days);


  return (
    <nav className="page-nav">
      {daysInterval.firstDay > 0 && <NavLink 
        className="page-nav__day page-nav__day_before"
        onClick={(e) => {
          e.preventDefault()
          handleDaysIntervalToPast()}}
      >
      </NavLink>}
      {days.map((day, index) => (
        day.isSame(now) ? 
        <NavLink 
          key={nanoid()} to={`./${day.format('YYYY-MM-DD')}`} 
          index={index} 
          className={activeDay === index ? 'page-nav__day page-nav__day_today page-nav__day_chosen' : 'page-nav__day page-nav__day_today'}
          onClick={(e) => {
            // e.preventDefault();
            handleActiveDay(index);
            console.log(day.format('YYYY-MM-DD'));
          }}
        >
        <span className="page-nav__day-week">{day.format('dd')}</span>
        <span className="page-nav__day-number">{day.format('D')}</span>
      </NavLink> : 
        <NavLink 
          key={nanoid()} 
          to={`./${day.format('YYYY-MM-DD')}`} 
          index={index} 
          className={activeDay === index ? 'page-nav__day page-nav__day_chosen' : 'page-nav__day'}
          onClick={(e) => {
            // e.preventDefault();
            handleActiveDay(index);
            console.log(day.format('YYYY-MM-DD'));            
          }}
        >
          <span className="page-nav__day-week">{day.format('dd')}</span>
          <span className="page-nav__day-number">{day.format('D')}</span>
        </NavLink>
      ))}
      <NavLink 
        className="page-nav__day page-nav__day_next"
        onClick={(e) => {
          e.preventDefault()
          handleDaysIntervalToFuture()}}
      >
      </NavLink>
    </nav>
  )

  // return (
  //   <nav className="page-nav">
  //     <NavLink to='#' className="page-nav__day page-nav__day_today">
  //       <span className="page-nav__day-week">{now.format('dd')}</span><span className="page-nav__day-number">{now.add(1, 'day').format('D')}</span>
  //     </NavLink>
  //     <NavLink className={({ isActive }) => (isActive ? 'page-nav__day page-nav__day_chosen' : 'page-nav__day')}>
  //       <span className="page-nav__day-week">Вт</span><span className="page-nav__day-number">1</span>
  //     </NavLink>
  //     <NavLink className={({ isActive }) => (isActive ? 'page-nav__day page-nav__day_chosen' : 'page-nav__day')}>
  //       <span className="page-nav__day-week">Ср</span><span className="page-nav__day-number">2</span>
  //     </NavLink>
  //     <NavLink className={({ isActive }) => (isActive ? 'page-nav__day page-nav__day_chosen' : 'page-nav__day')}>
  //       <span className="page-nav__day-week">Чт</span><span className="page-nav__day-number">3</span>
  //     </NavLink>
  //     <NavLink className={(state) => console.log(state)}>
  //       <span className="page-nav__day-week">Пт</span><span className="page-nav__day-number">4</span>
  //     </NavLink>
  //     <NavLink className={({ isActive }) => (isActive ? 'page-nav__day page-nav__day_chosen' : 'page-nav__day')}>
  //       <span className="page-nav__day-week">Пт</span><span className="page-nav__day-number">5</span>
  //     </NavLink>
  //     <NavLink className="page-nav__day page-nav__day_weekend">
  //       <span className="page-nav__day-week">Сб</span><span className="page-nav__day-number">6</span>
  //     </NavLink>
  //     <NavLink className="page-nav__day page-nav__day_next">
  //     </NavLink>

      
      
  //   </nav>
  // )
}

export default PageNavigator

{/* <a className="page-nav__day page-nav__day_today" href="#">
        <span className="page-nav__day-week">Пн</span><span className="page-nav__day-number">31</span>
      </a>
      <a className="page-nav__day" href="#">
        <span className="page-nav__day-week">Вт</span><span className="page-nav__day-number">1</span>
      </a>
      <a className="page-nav__day page-nav__day_chosen" href="#">
        <span className="page-nav__day-week">Ср</span><span className="page-nav__day-number">2</span>
      </a>
      <a className="page-nav__day" href="#">
        <span className="page-nav__day-week">Чт</span><span className="page-nav__day-number">3</span>
      </a>
      <a className="page-nav__day" href="#">
        <span className="page-nav__day-week">Пт</span><span className="page-nav__day-number">4</span>
      </a>
      <a className="page-nav__day page-nav__day_weekend" href="#">
        <span className="page-nav__day-week">Сб</span><span className="page-nav__day-number">5</span>
      </a>
      <a className="page-nav__day page-nav__day_next" href="#">
      </a> */}