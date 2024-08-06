import { Link, useLocation } from "react-router-dom";
import BuyingButton from "./BuyingButton";

const Payment = () => {
  const location = useLocation();
  const { hall, movie, session } = location.state;
  console.log(hall);
  console.log(movie);
  console.log(session);

  return (
    <main>
      <section className="ticket">
        
        <header className="tichet__check">
          <h2 className="ticket__check-title">Вы выбрали билеты:</h2>
        </header>
        
        <div className="ticket__info-wrapper">
          <p className="ticket__info">На фильм: <span className="ticket__details ticket__title">{movie.title}</span></p>
          <p className="ticket__info">Места: <span className="ticket__details ticket__chairs">6, 7</span></p>
          {/* добавить таблицу tickets, неподтвержденные билеты */}
          <p className="ticket__info">В зале: <span className="ticket__details ticket__hall">{hall.title}</span></p>
          <p className="ticket__info">Начало сеанса: <span className="ticket__details ticket__start">{session.time}</span></p>
          <p className="ticket__info">Стоимость: <span className="ticket__details ticket__cost">600</span> рублей</p>

          {/* <button className="acceptin-button" onClick="location.href='ticket.html'" >Получить код бронирования</button> */}
          <BuyingButton component={Link} to="../ticket" className="acceptin-button" state={{movie, hall, session}}>Забронировать</BuyingButton>


          <p className="ticket__hint">После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал.</p>
          <p className="ticket__hint">Приятного просмотра!</p>
        </div>
      </section>     
    </main>
  )
}

export default Payment