import { Link, useLocation, useNavigate } from "react-router-dom"
import BuyingButton from "./BuyingButton";
import { nanoid } from "nanoid";
import BuyingPlace from "./BuyingPlace";
import { useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { addDataToDB, makeOrderWithTickets } from "../../services/DBUpdater";
import { orderContext } from "../../services/OrderContext";
import { useDispatch, useSelector } from "react-redux";
import { getTickets } from "../../redux/slices/ticketSlice";
import { setPlacesByHall, setSelectedPlaces, setToInitialData } from "../../redux/slices/buyingSlice";
import { compareFnByPlaceAssending } from "../../services/sorterFunctions";
import { prepareHallPlaces } from "../../services/buyingPlacesFunctions";
import { postNewOrder } from "../../redux/slices/orderSlice";
import Tooltip from "./Tooltip";

const Buying = (/* {hallRedux, movieRedux, sessionRedux, placesByHallRedux} */) => {
  // Redux
  const ticketsRedux = useSelector(state => state.ticketsReducer.tickets);
  console.log({ ticketsRedux });

  // Особо не нужно
  const ordersRedux = useSelector(state => state.orderReducer.orders);
  console.log({ ordersRedux });

  const hallRedux = useSelector(state => state.buyingReducer.hall);
  console.log({ hallRedux });
  const movieRedux = useSelector(state => state.buyingReducer.movie);
  console.log({ movieRedux });
  const sessionRedux = useSelector(state => state.buyingReducer.session);
  console.log({ sessionRedux });
  const orderRedux = useSelector(state => state.orderReducer.newOrder);
  console.log({ orderRedux });

  const placesByHallRedux = useSelector(state => state.buyingReducer.placesByHall);
  console.log({ placesByHallRedux });
  const selectedPlacesRedux = useSelector(state => state.buyingReducer.selectedPlaces);
  console.log({ selectedPlacesRedux });

  const dispatch = useDispatch();

  // useEffect(() => {
  //   console.log('Buying page effect is on');

  //   dispatch(getTickets());
  // }, []);

  const navigate = useNavigate();

  useEffect(() => {
    console.log('Buying page effect 2 is on');
    if (orderRedux) {
      console.log('new order data changed');
      navigate("../payment");
    }
  }, [orderRedux]);

  // const { order, setOrder } = useContext(orderContext);
  // console.log({ orderFromContext: order });
  // console.log({ orderFromContext: setOrder });


  // const [newOrder, setNewOrder] = useState({});
  // console.log({ newOrder });

  const [tooltip, setTooltip] = useState({
    text: '',
    active: false
  });


  // Состояние зрительских мест
  // const [placesState, setPlacesState] = useState([...placesByHallRedux]);


  // выбранные места
  const selectedPlaces = placesByHallRedux.filter(place => place.is_selected === true);

  // Отрисовка мест

  // const compareFnByPlaceAssending = (a, b) => Number(a.place) - Number(b.place); // сортировка объектов по возрастанию

  // // места в зависимости от зала
  // const prepareHallPlaces = (places, hall, sorterFn) => {

  //   let placesGroupedByRow = [];

  //   // const placesCopy = [...places];
  //   const placesByHall = places.filter(place => place.hall_id === hall.id);

  //   // placesByHall.sort(compareFn); // сортировка мест из БД


  //   for (let index = 1; index <= hall.rows; index++) {
  //     const rowPlaces = placesByHall.filter(place => place.row === index);
  //     // placesGroupedByRow.push(rowPlaces);
  //     placesGroupedByRow.push(rowPlaces.sort(sorterFn));
  //   }

  //   console.log({ placesGroupedByRow });

  //   return placesGroupedByRow;
  // }

  const buyingPlaces = prepareHallPlaces(placesByHallRedux, hallRedux, compareFnByPlaceAssending);

  // Билеты для добавления в DB при обработке кнопки "Забронировать"
  // const [ticketsToAddInDB, setTicketsToAddInDB] = useState([]);

  const handleTicketBooking = async () => {
    // const selectedPlaces = placesByHallRedux.filter(place => place.is_selected === true);

    if (selectedPlacesRedux.length > 0) {
      const ticketsToAddInDB = selectedPlacesRedux.map(selectedPlace => {
        return {
          place_id: selectedPlace.id,
          session_id: sessionRedux.id,
          status: 'booked',
        }
      });
      // dispatch(setSelectedTickets(ticketsToAddInDB));
      dispatch(postNewOrder(ticketsToAddInDB)); // создание нового заказа

      // if (ordersReduxLoading === 'idle') {
      //   navigate("../payment");
      // }

      // const newOrderData = await makeOrderWithTickets(ticketsToAddInDB, 'api/orders');
      // console.log({ newOrderData });

      // setNewOrder(newOrderData);
      // setOrder(newOrderData.newOrder);
    } else {
      const err = "Места не выбраны. Для оформления заказа нужно выбрать места";
      setTooltip({
        text: err,
        active: true
      });
      setTimeout(() => {
        setTooltip({
          text: '',
          active: false
        });
      }, 2000);

      throw new Error(err);
    }
  }

  // {buyingPlaces.map(row => <div key={nanoid()} className="buying-scheme__row">
  //       {row.map(place => <BuyingPlace key={nanoid()} place={place}/>)}
  //     </div>)}

  // let places = [];
  // for (let i = 0; i < hall.places; i++) {
  //   places.push(<span className="buying-scheme__chair buying-scheme__chair_standart"/>);
  // }

  // let rows = [];
  // for (let i = 0; i < hall.rows; i++) {
  //   rows.push(<div className="buying-scheme__row">
  //                     {places.map(place => place)}
  //                   </div>);
  // }

  const currency = 'руб';

  const handlePlaceSelected = (placeId) => {
    const modifiedPlaces = placesByHallRedux.map(place => {
      if (place.id === placeId) {
        console.log({ placeId });

        let chosenPlace = { ...place }; // копия исходного объекта, чтобы не перезаписать его

        if (place.type === 'standart' || place.type === 'vip') {
          chosenPlace.is_selected = !place.is_selected;
        }
        return chosenPlace;
      } else {
        return place;
      }
    })
    // console.log({ modifiedPlaces });

    const selectedPlaces = [...modifiedPlaces].filter(place => place.is_selected === true);
    console.log({selectedPlaces});
    

    // setPlacesState(modifiedPlaces);
    dispatch(setPlacesByHall(modifiedPlaces));


    dispatch(setSelectedPlaces(selectedPlaces));
  }

  /**
   * Получить сумму выбранных билетов
   */
  // const getTotalSum = (selectedPlaces) => {
  //   const totalSum = selectedPlaces.reduce((sum, currentPlace) => {
  //     let currentPrice;
  //     switch (currentPlace.type) {
  //       case 'standart':
  //         currentPrice = hallRedux.normal_price;
  //         break;
  //       case 'vip':
  //         currentPrice = hallRedux.vip_price;
  //         break;
  //       default:
  //         break;
  //     }
  //     return sum + currentPrice;
  //   }, 0)
  //   return totalSum;
  // }

  // // Загрузка
  // if (ticketsReduxLoading !== 'idle') {
  //   return (
  //     <main>
  //       <button onClick={() => {
  //         dispatch(setToInitialData());
  //         navigate("../schedule/" + dayjs().format('YYYY-MM-DD'));
  //       }}>
  //         Вернуться на главную
  //       </button>
  //       <Link to={"../schedule/" + dayjs().format('YYYY-MM-DD')}><h1>На главную</h1></Link>
  //       <section className="buying">
  //         <span className="loader" ></span>
  //       </section>
  //     </main>
  //   )
  // }

  return (
    <main>
      <button 
        style={{padding: '5px', marginBottom: '10px'}} 
        onClick={() => {
        dispatch(setToInitialData());
        navigate("../schedule/" + dayjs().format('YYYY-MM-DD'));
      }}>
        Вернуться на главную
      </button>
      <br/>
      {/* <Link to={"../schedule/" + dayjs().format('YYYY-MM-DD')}><h1>На главную</h1></Link> */}
      <section className="buying">
        <div className="buying__info">
          <div className="buying__info-description">
            <h2 className="buying__info-title">{movieRedux.title}</h2>
            <p className="buying__info-start">Начало сеанса: {sessionRedux.time}</p>
            <p className="buying__info-hall">{hallRedux.title}</p>
          </div>
          {/* <div className="buying__info-hint">
            <p>Тапните дважды,<br/>чтобы увеличить</p>
          </div> */}
        </div>
        <div className="buying-scheme">
          <div className="buying-scheme__wrapper">
            {/* {rows} */}
            {buyingPlaces.map(row => <div key={nanoid()} className="buying-scheme__row">
              {row.map(place => (<BuyingPlace
                key={nanoid()}
                place={place}
                handlePlaceSelected={handlePlaceSelected}
                tickets={ticketsRedux.filter(ticket => ticket.session_id === sessionRedux.id)}
              />))}
            </div>)}
          </div>
          <div className="buying-scheme__legend">
            <div className="col">
              <p className="buying-scheme__legend-price">
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span> Свободно
                (<span className="buying-scheme__legend-value">{hallRedux.normal_price.toFixed(2)}</span> {currency})
              </p>
              <p className="buying-scheme__legend-price">
                <span className="buying-scheme__chair buying-scheme__chair_vip"></span> Свободно VIP
                (<span className="buying-scheme__legend-value">{hallRedux.vip_price.toFixed(2)}</span> {currency})
              </p>
            </div>
            <div className="col">
              <p className="buying-scheme__legend-price">
                <span className="buying-scheme__chair buying-scheme__chair_taken"></span> Занято
              </p>
              <p className="buying-scheme__legend-price">
                <span className="buying-scheme__chair buying-scheme__chair_selected"></span> Выбрано
              </p>
            </div>
          </div>
        </div>
        {/* <button className="acceptin-button" onClick="location.href='payment.html'" >Забронировать</button> */}
        {/* <button className="acceptin-button" onClick="location.pathname='../payment'" >Забронировать</button> */}
        {/*location.pathname='../payment'  */}
        {/* <BuyingButton component={Link} to='../payment' relative="path">Забронировать</BuyingButton> */}

        {/* <Link to='../payment' relative="path">
            <BuyingButton component="button" className="acceptin-button">Забронировать</BuyingButton>
          </Link> */}

        <button className="acceptin-button" onClick={handleTicketBooking}>Забронировать</button>
        {tooltip.active && <Tooltip text={tooltip.text} />}
        {/* <BuyingButton component={Link} to="../payment" className="acceptin-button" state={{ movieRedux, hallRedux, sessionRedux, selectedPlaces, tickets: ticketsRedux.filter(ticket => ticket.session_id === sessionRedux.id) }} onClick={handleTicketBooking}>Забронировать</BuyingButton> */}
      </section>
    </main>
  )
}

export default Buying


/* 
<div className="buying-scheme">
          <div className="buying-scheme__wrapper">
            <div className="buying-scheme__row">
              <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
              <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
              <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
              </div>  

              <div className="buying-scheme__row">
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                <span className="buying-scheme__chair buying-scheme__chair_taken"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
              </div>  

              <div className="buying-scheme__row">
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
              </div>  

              <div className="buying-scheme__row">
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_vip"></span>
                <span className="buying-scheme__chair buying-scheme__chair_vip"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
              </div>  

              <div className="buying-scheme__row">
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_vip"></span><span className="buying-scheme__chair buying-scheme__chair_vip"></span>
                <span className="buying-scheme__chair buying-scheme__chair_vip"></span><span className="buying-scheme__chair buying-scheme__chair_vip"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
              </div>  

              <div className="buying-scheme__row">
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_vip"></span><span className="buying-scheme__chair buying-scheme__chair_taken"></span>
                <span className="buying-scheme__chair buying-scheme__chair_taken"></span><span className="buying-scheme__chair buying-scheme__chair_taken"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
              </div>  

              <div className="buying-scheme__row">
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_vip"></span><span className="buying-scheme__chair buying-scheme__chair_taken"></span>
                <span className="buying-scheme__chair buying-scheme__chair_taken"></span><span className="buying-scheme__chair buying-scheme__chair_vip"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
              </div>  

              <div className="buying-scheme__row">
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_selected"></span>
                <span className="buying-scheme__chair buying-scheme__chair_selected"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
                <span className="buying-scheme__chair buying-scheme__chair_disabled"></span><span className="buying-scheme__chair buying-scheme__chair_disabled"></span>
              </div>  

              <div className="buying-scheme__row">
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_taken"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_taken"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_taken"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
              </div>  

              <div className="buying-scheme__row">
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_taken"></span>
                <span className="buying-scheme__chair buying-scheme__chair_taken"></span><span className="buying-scheme__chair buying-scheme__chair_taken"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span><span className="buying-scheme__chair buying-scheme__chair_standart"></span>
              </div>
          </div>
          <div className="buying-scheme__legend">
            <div className="col">
              <p className="buying-scheme__legend-price"><span className="buying-scheme__chair buying-scheme__chair_standart"></span> Свободно (<span className="buying-scheme__legend-value">250</span>руб)</p>
              <p className="buying-scheme__legend-price"><span className="buying-scheme__chair buying-scheme__chair_vip"></span> Свободно VIP (<span className="buying-scheme__legend-value">350</span>руб)</p>            
            </div>
            <div className="col">
              <p className="buying-scheme__legend-price"><span className="buying-scheme__chair buying-scheme__chair_taken"></span> Занято</p>
              <p className="buying-scheme__legend-price"><span className="buying-scheme__chair buying-scheme__chair_selected"></span> Выбрано</p>                    
            </div>
          </div>
        </div>
        <button className="acceptin-button" onClick="location.href='payment.html'" >Забронировать</button>
*/