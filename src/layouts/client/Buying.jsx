import { Link, useLocation } from "react-router-dom"
import BuyingButton from "./BuyingButton";

const Buying = () => {
  // Достаю данные из ссылки на сеанс
  const location = useLocation();
  const { hall, movie, session } = location.state;
  console.log(hall);
  console.log(movie);
  console.log(session);

  // Отрисовка мест
  let places = [];
  for (let i = 0; i < hall.places; i++) {
    places.push(<span className="buying-scheme__chair buying-scheme__chair_standart"/>);
  }

  let rows = [];
  for (let i = 0; i < hall.rows; i++) {
    rows.push(<div className="buying-scheme__row">
                      {places.map(place => place)}
                    </div>);
  }

  const currency = 'руб'

  return (    
    <main>
      <section className="buying">
        <div className="buying__info">
          <div className="buying__info-description">
            <h2 className="buying__info-title">{movie.title}</h2>
            <p className="buying__info-start">Начало сеанса: {session.time}</p>
            <p className="buying__info-hall">{hall.title}</p>          
          </div>
          <div className="buying__info-hint">
            {/* <p>Тапните дважды,</br>чтобы увеличить</p> */}
          </div>
        </div>        
        <div className="buying-scheme">
          <div className="buying-scheme__wrapper">
            {rows}
          </div>
          <div className="buying-scheme__legend">
            <div className="col">
              <p className="buying-scheme__legend-price"><span className="buying-scheme__chair buying-scheme__chair_standart"></span> Свободно (<span className="buying-scheme__legend-value">{hall.normal_price.toFixed(2)}</span>{currency})</p>
              <p className="buying-scheme__legend-price"><span className="buying-scheme__chair buying-scheme__chair_vip"></span> Свободно VIP (<span className="buying-scheme__legend-value">{hall.vip_price.toFixed(2)}</span>{currency})</p>            
            </div>
            <div className="col">
              <p className="buying-scheme__legend-price"><span className="buying-scheme__chair buying-scheme__chair_taken"></span> Занято</p>
              <p className="buying-scheme__legend-price"><span className="buying-scheme__chair buying-scheme__chair_selected"></span> Выбрано</p>                    
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
            <BuyingButton component={Link} to="../payment" className="acceptin-button" state={{movie, hall, session}}>Забронировать</BuyingButton>
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