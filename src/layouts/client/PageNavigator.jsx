import { NavLink } from "react-router-dom"
// dayjs
import dayjs from "dayjs";
// обновить дни недели на русском


const PageNavigator = () => {
  const now = dayjs();
  let days = [];
  // надо будет поместить в стейт, чтобы отображался выбранный интервал дней

  for (let index = 0; index < 6; index++) {
    const day = now.add(index, 'day');
    days.push(day);
  }

  console.log(days);
  return (
    <nav className="page-nav">
      {days.map(day => (
        day.isSame(now) ? <NavLink to='#' className={({ isActive }) => (isActive ? 'page-nav__day page-nav__day_today page-nav__day_chosen' : 'page-nav__day page-nav__day_today')}>
        <span className="page-nav__day-week">{day.format('dd')}</span>
        <span className="page-nav__day-number">{day.format('D')}</span>
      </NavLink> : 
        <NavLink to='#' className={({ isActive }) => (isActive ? 'page-nav__day page-nav__day_chosen' : 'page-nav__day')}>
          <span className="page-nav__day-week">{day.format('dd')}</span>
          <span className="page-nav__day-number">{day.format('D')}</span>
        </NavLink>
      ))}
      <NavLink className="page-nav__day page-nav__day_next">
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