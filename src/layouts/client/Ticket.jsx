import QRCode from "react-qr-code"
import { Link, useLocation } from "react-router-dom"

const Ticket = () => {
  const location = useLocation();
  const { hall, movie, session, selectedPlaces } = location.state;

  return (
    <main>
          <Link to="../client"><h1>На главную</h1></Link>

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
                </span>
              </p>
              <p className="ticket__info">В зале: <span className="ticket__details ticket__hall">{hall.title}</span></p>
              <p className="ticket__info">Начало сеанса: <span className="ticket__details ticket__start">{session.time}</span></p>

              {/* <img className="ticket__info-qr" src="i/qr-code.png"/> */}
              {<QRCode className="ticket__info-qr" value='your tickets here' />}

              <p className="ticket__hint">Покажите QR-код нашему контроллеру для подтверждения бронирования.</p>
              <p className="ticket__hint">Приятного просмотра!</p>
            </div>
          </section>     
        </main>
  )
}

export default Ticket