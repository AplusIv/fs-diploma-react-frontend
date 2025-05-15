// qrcode
import QRCode from "react-qr-code";

import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import BuyingButton from "./BuyingButton";
import dayjs from "dayjs";
import { useContext } from "react";
import { orderContext } from "../../services/OrderContext";
import { updateOrderAndTicketStatus } from "../../services/DBUpdater";
import { useDispatch, useSelector } from "react-redux";
import { putNewOrderAndTickets } from "../../redux/slices/orderSlice";

// доделать
import { setToInitialData as setToInitialDataBuyingSlice, setStateByStorageData as setDataInBuyingSlice } from "../../redux/slices/buyingSlice";
import { getNewOrderTickets, getTickets, setToInitialData as setToInitialDataTicketSlice, setStateByStorageData as setDataInTicketSlice } from "../../redux/slices/ticketSlice";
import { getOrders, setStateByStorageData as setDataInOrderSlice, setToInitialData as setToInitialDataOrderSlice } from "../../redux/slices/orderSlice";


const Payment = () => {
  // redux
  const hallRedux = useSelector(state => state.buyingReducer.hall);
  const movieRedux = useSelector(state => state.buyingReducer.movie);
  const sessionRedux = useSelector(state => state.buyingReducer.session);
  const orderRedux = useSelector(state => state.orderReducer.newOrder);
  console.log({ orderRedux });
  const placesByHallRedux = useSelector(state => state.buyingReducer.placesByHall);
  const newOrderTicketsRedux = useSelector(state => state.ticketsReducer.newOrderTickets);
  console.log({ newOrderTicketsRedux });

  // сатусы загрузки данных
  const ticketsReduxLoading = useSelector(state => state.ticketsReducer.loading);
  console.log({ ticketsReduxLoading });
  const ordersReduxLoading = useSelector(state => state.orderReducer.loading);
  console.log({ ordersReduxLoading });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Payment page effect is on');
    if (orderRedux.is_paid === true) {
      console.log('new order data changed');
      navigate("../ticket");
    }
  }, [orderRedux]);

  // const location = useLocation();
  // const { hall, movie, session, selectedPlaces, tickets } = location.state;
  // console.log({ selectedPlaces });
  // console.log({ session });
  // console.log({ tickets });


  // const { order, setOrder } = useContext(orderContext);
  // console.log({ orderFromContext: order });


  // const totalSum = selectedPlaces.reduce((sum, currentPlace) => {
  //   let currentPrice;
  //   switch (currentPlace.type) {
  //     case 'standart':
  //       currentPrice = hall.normal_price;
  //       break;
  //     case 'vip':
  //       currentPrice = hall.vip_price;
  //       break;
  //     default:
  //       break;
  //   }
  //   return sum + currentPrice;
  // }, 0)

  const handleOrderPay = () => {
    // const updateOrderData = {
    //   id: order.id,
    //   // sum: order.sum,
    //   is_paid: true,
    // }

    const updateOrderData = { ...orderRedux, is_paid: true };

    dispatch(putNewOrderAndTickets(updateOrderData));
    // await updateOrderAndTicketStatus(updateOrderData, `api/orders`); // можно написать универсальную функцию

    // setOrder({ ...order, is_paid: true });
  }

  // const handleTicketBuying = async () => {
  //   const ticketsToChangeInDB = selectedPlaces.map(selectedPlace => {
  //     return {
  //       // place_id: selectedPlace.id,
  //       // session_id: session.id,
  //       status: 'paid'
  //     }
  //   });

  // }

  // // const navigate = useNavigate();
  // // 
  // const [paymentState, setPaymentState] = useState(false);

  // const handleClick = () => {
  //   setPaymentState(true);
  //   // window.location.pathname = '../ticket';
  //   // navigate('../ticket');

  //   console.log('Click buying button');
  // }

  // // Проблемы с загрузкой (запрос вернулся с ошибкой)
  // if (ticketsReduxLoading === 'failed' || ordersReduxLoading === 'failed') {
  //   return (
  //     <main>
  //       <button onClick={() => {
  //         dispatch(setToInitialDataBuyingSlice());
  //         dispatch(setToInitialDataOrderSlice());
  //         dispatch(setToInitialDataTicketSlice());

  //         navigate("../schedule/" + dayjs().format('YYYY-MM-DD'));
  //       }}>
  //         Вернуться на главную
  //       </button>
  //       <Link to={"../schedule/" + dayjs().format('YYYY-MM-DD')}><h1>На главную</h1></Link>
  //       {/* <ShowError/> */}
  //       <section className="buying">
  //         <br />
  //         <h2>Упс, что-то сломалось :( Не удалось оформить билет, проносим Вам свои извинения.</h2>
  //         <p>
  //           <span>Вернитесь на главную и повторите запрос позднее.</span>
  //           <br />
  //           {/* <Link to={`../schedule/${dayjs().format('YYYY-MM-DD')}`}>Показать сеансы на текущую дату?</Link> */}
  //         </p>
  //       </section>
  //     </main>
  //   )
  // }


  return (

    // paymentState === false ? 
    <main>
      {/* <button onClick={() => {
        // dispatch(setToInitialData());
        navigate("../schedule/" + dayjs().format('YYYY-MM-DD'));
      }}>
        Вернуться на главную
      </button> */}
      <button 
        style={{padding: '5px', marginBottom: '10px'}} 
        onClick={() => {
        // Очистка стора и хранилища
        dispatch(setToInitialDataBuyingSlice());
        dispatch(setToInitialDataOrderSlice());
        dispatch(setToInitialDataTicketSlice());

        navigate("../schedule/" + dayjs().format('YYYY-MM-DD'));
      }}>
        Вернуться на главную
      </button>
      {/* <Link to={"../schedule/" + dayjs().format('YYYY-MM-DD')}><h1>На главную</h1></Link> */}

      <section className="ticket">

        <header className="tichet__check">
          <h2 className="ticket__check-title">Вы выбрали билеты:</h2>
        </header>

        <div className="ticket__info-wrapper">
          <p className="ticket__info">На фильм: <span className="ticket__details ticket__title">{movieRedux.title}</span></p>
          <p className="ticket__info">Места:
            <span className="ticket__details ticket__chairs">
              <br></br>
              {newOrderTicketsRedux.map((ticket, index) => {
                const placeId = ticket.place_id;
                const bookedPlace = placesByHallRedux.find(place => place.id === placeId);
                console.log({ bookedPlace });

                return (<span key={bookedPlace.id}>{++index}) ряд: {bookedPlace.row}, место: {bookedPlace.place}, статус билета: {ticket.status === 'booked' ? 'забронирован' : 'не выбран'}<br /></span>)

                // return (<span key={bookedPlace.id}>- Ряд: {bookedPlace.row}, место: {bookedPlace.place}, статус билета: {ticket.status}<br/></span>)
              })}

              {/* {selectedPlaces.map(place => <span key={place.id}>Ряд: {place.row}, место: {place.place}<br></br></span>)} */}
            </span>
          </p>
          {/* добавить таблицу tickets, неподтвержденные билеты */}
          {/* {selectedPlaces.map(place => <span key={place.id}>Ряд: {place.row}, место: {place.place}<br></br></span>)} */}
          <p className="ticket__info">В зале: <span className="ticket__details ticket__hall">{hallRedux.title}</span></p>
          <br />
          <br />
          <p className="ticket__info">Дата сеанса: <span className="ticket__details ticket__date">{dayjs(sessionRedux.date).format('DD.MM.YYYY')}</span></p>
          <p className="ticket__info">Начало сеанса: <span className="ticket__details ticket__start">{sessionRedux.time}</span></p>
          <p className="ticket__info">Стоимость: <span className="ticket__details ticket__cost">{orderRedux.sum.toFixed(2)}</span> рублей</p>

          <button className="acceptin-button" onClick={handleOrderPay} >Получить код бронирования</button>
          {/* <BuyingButton component="button" onClick={handleClick} className="acceptin-button" >Получить код бронировния</BuyingButton> */}
          {/* <BuyingButton component={Link} to="../ticket" onClick={handleOrderPay} state={{ movie, hall, session, selectedPlaces }} className="acceptin-button" >Получить код бронировния</BuyingButton> */}


          <p className="ticket__hint">После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал.</p>
          <p className="ticket__hint">Приятного просмотра!</p>
        </div>
      </section>
    </main>

    // <main>
    //   <Link to="../client"><h1>На главную</h1></Link>

    //   <section className="ticket">

    //     <header className="tichet__check">
    //       <h2 className="ticket__check-title">Электронный билет</h2>
    //     </header>

    //     <div className="ticket__info-wrapper">
    //       <p className="ticket__info">На фильм: <span className="ticket__details ticket__title">{movie.title}</span></p>
    //       <p className="ticket__info">Места: <span className="ticket__details ticket__chairs">6, 7</span></p>
    //       <p className="ticket__info">В зале: <span className="ticket__details ticket__hall">{hall.title}</span></p>
    //       <p className="ticket__info">Начало сеанса: <span className="ticket__details ticket__start">{session.time}</span></p>

    //       {/* <img className="ticket__info-qr" src="i/qr-code.png"/> */}
    //       {<QRCode className="ticket__info-qr" value='your tickets here' />}

    //       <p className="ticket__hint">Покажите QR-код нашему контроллеру для подтверждения бронирования.</p>
    //       <p className="ticket__hint">Приятного просмотра!</p>
    //     </div>
    //   </section>     
    // </main>
    // )
  )
}

export default Payment