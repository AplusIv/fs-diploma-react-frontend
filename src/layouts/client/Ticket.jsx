import QRCode from "react-qr-code"
import { Link, useLocation } from "react-router-dom"
import dayjs from "dayjs";
import { orderContext } from "../../services/OrderContext";
import { useContext, useEffect, useState } from "react";
import { getDataById } from "../../services/DBUpdater";

const Ticket = () => {
  const location = useLocation();
  // const { hall, movie, session, selectedPlaces } = location.state;
  const { selectedPlaces } = location.state;


  const {order} = useContext(orderContext);

  const [tickets, setTickets] = useState([]);
  const [session, setSession] = useState({});
  const [movie, setMovie] = useState({});
  const [hall, setHall] = useState({});


  const [isLoading, setIsLoading] = useState(true);

  // Добавить функцию получения билетов по ID заказа
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
  }, [order])

  return (
    !isLoading && <main>
          <Link to={"../client/schedule/" + dayjs().format('YYYY-MM-DD')}><h1>На главную</h1></Link>

          <section className="ticket">
            
            <header className="tichet__check">
              <h2 className="ticket__check-title">Электронный билет</h2>
            </header>
            
            <div className="ticket__info-wrapper">
              <p className="ticket__info">На фильм: <span className="ticket__details ticket__title">{movie.title}</span></p>
              {/* <p className="ticket__info">Места: <span className="ticket__details ticket__chairs">6, 7</span></p> */}
              <p className="ticket__info">Места: 
                <span className="ticket__details ticket__chairs">
                  <br></br>
                  {selectedPlaces.map(place => <span key={place.id}>Ряд: {place.row}, место: {place.place}<br></br></span>)}
                  {tickets.map(ticket => <span key={ticket.id}>Тикет: {ticket.id}<br></br></span>)}
                </span>
              </p>
              <p className="ticket__info">В зале: <span className="ticket__details ticket__hall">{hall.title}</span></p>
              <p className="ticket__info">Начало сеанса: <span className="ticket__details ticket__start">{session.time}</span></p>

              {/* <img className="ticket__info-qr" src="i/qr-code.png"/> */}
              {<QRCode className="ticket__info-qr" value={`Order # ${order.id} is paid`} />}

              <p className="ticket__hint">Покажите QR-код нашему контроллеру для подтверждения бронирования.</p>
              <p className="ticket__hint">Приятного просмотра!</p>
            </div>
          </section>     
        </main>
  )
}

export default Ticket