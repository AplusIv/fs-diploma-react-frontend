import { NavLink, useNavigate, useParams } from "react-router-dom"
// dayjs
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";


// обновить дни недели на русском
import updateLocale from 'dayjs/plugin/updateLocale'; // ES 2015
import { useDispatch, useSelector } from "react-redux";
import { setDays, setDaysIntervalToFuture, setDaysIntervalToPast, setRefreshDays, setSelectedDate, setSelectedDayIndex } from "../../redux/slices/pageNavigatorSlice";

dayjs.extend(updateLocale);

dayjs.updateLocale('en', {
  weekdays: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]
});


const PageNavigator = () => {
  const { date } = useParams();
  console.log('page navigator date: ', date);

  // redux
  const daysRedux = useSelector(state => state.pageNavigatorReducer.days);
  console.log({ daysRedux });
  const selectedDayIndexRedux = useSelector(state => state.pageNavigatorReducer.selectedDayIndex);
  console.log({ selectedDayIndexRedux });
  const selectedDateRedux = useSelector(state => state.pageNavigatorReducer.selectedDate);
  console.log({ selectedDateRedux });
  const firstDayRedux = useSelector(state => state.pageNavigatorReducer.daysIntervalIndexes.firstDay);
  console.log({ firstDayRedux });
  const refreshDaysStatusRedux = useSelector(state => state.pageNavigatorReducer.refreshDays);
  console.log({ refreshDaysStatusRedux });

  const dispatch = useDispatch();

  useEffect(() => {
      console.log('Page Navigator effect is on');
      // заполнение начальными данными из сервера
      dispatch(setSelectedDate(date));
      dispatch(setDays(date));
      

      // dispatch(setSelectedDate(date));
      // navigate(`./${selectedDateRedux}`);

      // if (refreshDaysStatusRedux !== 'initial days is set') {
      //   dispatch(setRefreshDays('refresh days'));
      // }
    }, [/* refreshDaysStatusRedux,  */date, /* firstDayRedux */]);


  const navigate = useNavigate();
  
  // // выбор активного дня
  // const [activeDay, setActiveDay] = useState(0);
  // const [daysInterval, setDaysInterval] = useState({
  //   firstDay: 0,
  //   lastDay: 6
  // });

  // // Для показа следующих/предыдущих дней
  // const paginateStep = 6;

  const handleActiveDay = (index, date) => {
    // console.log(index);
    // setActiveDay(index);

    dispatch(setSelectedDayIndex(index));
    dispatch(setSelectedDate(date));

    // dispatch(setRefreshDays('handle Active Day, refresh days'));
  }

  const getNextPeriodDay = (date, paginateStep) => {
    const recentDate = dayjs(date);
    const nextDate = recentDate.add(paginateStep, 'day');
    console.log({nextDate: nextDate.format('YYYY-MM-DD')});

    return nextDate.format('YYYY-MM-DD');    
  }

  const getPreviousPeriodDay = (date, paginateStep) => {
    const recentDate = dayjs(date);
    const prevDate = recentDate.subtract(paginateStep, 'day');
    console.log({nextDate: prevDate.format('YYYY-MM-DD')});

    return prevDate.format('YYYY-MM-DD');    
  }

  const handleDaysIntervalToFuture = () => {
    // setDaysInterval({
    //   firstDay: daysInterval.firstDay + paginateStep,
    //   lastDay: daysInterval.lastDay + paginateStep
    // });
    dispatch(setDaysIntervalToFuture())

    // dispatch(setRefreshDays('refresh days interval'));
  }

  const handleDaysIntervalToPast = () => {
    // if (daysInterval.firstDay > 0) {
    //   setDaysInterval({
    //     firstDay: daysInterval.firstDay - paginateStep,
    //     lastDay: daysInterval.lastDay - paginateStep
    //   });
    // }
    dispatch(setDaysIntervalToPast());
    // navigate(`./${daysRedux && daysRedux[selectedDayIndexRedux].format('YYYY-MM-DD')}`);
    
    // dispatch(setRefreshDays('refresh days interval'));
  }
  
  // const [isActive, setIsActive] = useState(true);

  // const [page, setpage] = useState(second)

  const now = dayjs();
  console.log('is it today: ', dayjs().isSame(now, 'day'));
  

  // let days = [];
  // // надо будет поместить в стейт, чтобы отображался выбранный интервал дней
  
  // for (let index = daysInterval.firstDay; index < daysInterval.lastDay; index++) {
  //   const day = now.add(index, 'day');
  //   days.push(day);
  // }

  // console.log(days);



  return (
    <nav className="page-nav">
      {firstDayRedux > 0 && <NavLink 
        // to={`./${daysRedux && daysRedux[selectedDayIndexRedux].format('YYYY-MM-DD')}`}
        to={`../schedule/${getPreviousPeriodDay(selectedDateRedux, 6)}`}

        className="page-nav__day page-nav__day_before"
        // onClick={(e) => {
        //   e.preventDefault()
        //   handleDaysIntervalToPast()}}
      >
      </NavLink>}
      {daysRedux && daysRedux.map((day, index) => (       
        (day.isSame(now, 'day')) ? 
        <NavLink 
          // key={daysRedux && daysRedux[index].format('YYYY-MM-DD')} 
          // key={nanoid()} 
          key={day.format('YYYY-MM-DD')} 

          // to={`./${day.format('YYYY-MM-DD')}`}  
          to={`../schedule/${daysRedux && daysRedux[index].format('YYYY-MM-DD')}`}
          // to={`./${selectedDateRedux}`}

          index={index} 
          className={selectedDayIndexRedux === index ? 'page-nav__day page-nav__day_today page-nav__day_chosen' : 'page-nav__day page-nav__day_today'}
          onClick={(e) => {
            // e.preventDefault();
            // handleActiveDay(index, day.format('YYYY-MM-DD'));
          }}
        >
        <span className="page-nav__day-week">{day.format('dd')}</span>
        <span className="page-nav__day-number">{day.format('D')}</span>
      </NavLink> : 
        <NavLink 
          // key={nanoid()} 
          key={day.format('YYYY-MM-DD')} 

          // to={`./${day.format('YYYY-MM-DD')}`} 
          to={`../schedule/${daysRedux && daysRedux[index].format('YYYY-MM-DD')}`}
          // to={`./${selectedDateRedux}`}


          index={index} 
          className={selectedDayIndexRedux === index ? 'page-nav__day page-nav__day_chosen' : 'page-nav__day'}
          onClick={(e) => {
            // e.preventDefault();
            // handleActiveDay(index, day.format('YYYY-MM-DD'));
          }}
        >
          <span className="page-nav__day-week">{day.format('dd')}</span>
          <span className="page-nav__day-number">{day.format('D')}</span>
        </NavLink>
      ))}
      <NavLink 
        className="page-nav__day page-nav__day_next"
        // to={`./${daysRedux && daysRedux[selectedDayIndexRedux].format('YYYY-MM-DD')}`}
        to={`../schedule/${getNextPeriodDay(selectedDateRedux, 6)}`}

        // onClick={(e) => {
        //   e.preventDefault()
        //   handleDaysIntervalToFuture()
        //   // navigate(`./${selectedDateRedux}`)
        //   // navigate(`./${daysRedux && daysRedux[selectedDayIndexRedux].format('YYYY-MM-DD')}`);
        // }}
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