import QRCode from "react-qr-code"
import { Link, useLocation, useNavigate } from "react-router-dom"
import dayjs from "dayjs";
import { orderContext } from "../../services/OrderContext";
import { useContext, useEffect, useState } from "react";
import { getDataById } from "../../services/DBUpdater";
import { useDispatch, useSelector } from "react-redux";
import { setToInitialData as setToInitialDataBuyingSlice, setStateByStorageData as setDataInBuyingSlice } from "../../redux/slices/buyingSlice";
import { getNewOrderTickets, getTickets, setToInitialData as setToInitialDataTicketSlice, setStateByStorageData as setDataInTicketSlice } from "../../redux/slices/ticketSlice";
import { getOrders, setStateByStorageData as setDataInOrderSlice, setToInitialData as setToInitialDataOrderSlice } from "../../redux/slices/orderSlice";


const Ticket = () => {
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

  let ticketsStr = ''; // строка с данными о билетах для передачи в qr code


  // Добавить запрос с обновлением выкупленных билетов


  /* const location = useLocation();
  // const { hall, movie, session, selectedPlaces } = location.state;
  const { selectedPlaces } = location.state;


  const {order} = useContext(orderContext);

  const [tickets, setTickets] = useState([]);
  const [session, setSession] = useState({});
  const [movie, setMovie] = useState({});
  const [hall, setHall] = useState({}); */


  // const [isLoading, setIsLoading] = useState(true);

  /* // Добавить функцию получения билетов по ID заказа
  useEffect(() => {
    (async () => {
      const ticketsByOrderId = await getDataById('api/tickets/order', order.id);
      console.log({ticketsByOrderId});
      setTickets(ticketsByOrderId);

      // Очень долгие запросы...
      // сеанс
      const session = await getDataById('api/sessions', ticketsByOrderId[0].session_id);
      console.log({session});
      setSession(session);

      // фильм
      const movie = await getDataById('api/movies', session.movie_id);
      console.log({movie});
      setMovie(movie);

      // зал
      const hall = await getDataById('api/halls', session.hall_id);
      console.log({hall});
      setHall(hall);
      
      setIsLoading(!isLoading); // прогрузка данных
      console.log({isLoading});      
    })() // IIFE
    // const sessionsByDate = getSessionsByDate(date);
    // console.log({sessionsByDate});
    // setSessionsByDateState(sessionsByDate);
    // 1. Добавить изменение даты сеанса
    // 2. Убрать дефолтное значение 25.06.2024

    console.log('effect is on');
    
    // return () => {
    //   second
    // }
  }, [order]) */

  return (
    <main>
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
          <h2 className="ticket__check-title">Электронный билет</h2>
        </header>

        <div className="ticket__info-wrapper">
          <p className="ticket__info">На фильм: <span className="ticket__details ticket__title">{movieRedux.title}</span></p>
          {/* <p className="ticket__info">Места: <span className="ticket__details ticket__chairs">6, 7</span></p> */}
          <p className="ticket__info">Места:
            <span className="ticket__details ticket__chairs">
              <br></br>
              {newOrderTicketsRedux.map((ticket, index) => {
                const placeId = ticket.place_id;
                const bookedPlace = placesByHallRedux.find(place => place.id === placeId);
                console.log({bookedPlace});
                
                ticketsStr += `${++index}) ticket id: ${ticket.id}, row: ${bookedPlace.row}, place: ${bookedPlace.place}, status: ${ticket.status}.\n` // для вывода в qr коде
                
                return (<span key={bookedPlace.id}>{++index}) id билета: {ticket.id}, ряд: {bookedPlace.row}, место: {bookedPlace.place}, статус билета: {ticket.status === 'paid' ? 'оплачен' : 'не оплачен'}<br/></span>)
              })}
            </span>
          </p>
          <p className="ticket__info">В зале: <span className="ticket__details ticket__hall">{hallRedux.title}</span></p>
          <br/>
          <br/>
          <p className="ticket__info">Дата сеанса: <span className="ticket__details ticket__date">{dayjs(sessionRedux.date).format('DD.MM.YYYY')}</span></p>
          <p className="ticket__info">Начало сеанса: <span className="ticket__details ticket__start">{sessionRedux.time}</span></p>

          {/* <img className="ticket__info-qr" src="i/qr-code.png"/> */}
          {<QRCode className="ticket__info-qr" value={`Order # ${orderRedux.id} is paid.\n` + ticketsStr } />}

          <p className="ticket__hint">Покажите QR-код нашему контроллеру для подтверждения бронирования.</p>
          <p className="ticket__hint">Приятного просмотра!</p>
        </div>
      </section>
    </main>
  )
}

export default Ticket