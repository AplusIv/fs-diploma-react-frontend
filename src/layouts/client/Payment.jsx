// qrcode
import QRCode from "react-qr-code";

import { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import BuyingButton from "./BuyingButton";
import dayjs from "dayjs";
import { useContext } from "react";
import { orderContext } from "../../services/OrderContext";
import { updateOrderAndTicketStatus } from "../../services/DBUpdater";

const Payment = () => {
  const location = useLocation();
  const { hall, movie, session, selectedPlaces, tickets } = location.state;
  console.log({selectedPlaces});
  console.log({session});  
  console.log({tickets});
  // console.log({order});
  
  
  const {order, setOrder} = useContext(orderContext);
    console.log({orderFromContext: order});
  
  
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

  const handleOrderPay = async () => {
    const updateOrderData = {
      id: order.id,
      // sum: order.sum,
      is_paid: true,
    }
    
    await updateOrderAndTicketStatus(updateOrderData, `api/orders`); // можно написать универсальную функцию

    setOrder({...order, is_paid: true})
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


  return (
    
    // paymentState === false ? 
      <main>
        <Link to={"../client/schedule/" + dayjs().format('YYYY-MM-DD')}><h1>На главную</h1></Link>

        <section className="ticket">
          
          <header className="tichet__check">
            <h2 className="ticket__check-title">Вы выбрали билеты:</h2>
          </header>
          
          <div className="ticket__info-wrapper">
            <p className="ticket__info">На фильм: <span className="ticket__details ticket__title">{movie.title}</span></p>
            <p className="ticket__info">Места: 
              <span className="ticket__details ticket__chairs">
                <br></br>
                {selectedPlaces.map(place => <span key={place.id}>Ряд: {place.row}, место: {place.place}<br></br></span>)}
              </span>
            </p>
            {/* добавить таблицу tickets, неподтвержденные билеты */}
            {/* {selectedPlaces.map(place => <span key={place.id}>Ряд: {place.row}, место: {place.place}<br></br></span>)} */}
            <p className="ticket__info">В зале: <span className="ticket__details ticket__hall">{hall.title}</span></p>
            <p className="ticket__info">Начало сеанса: <span className="ticket__details ticket__start">{session.time}</span></p>
            <p className="ticket__info">Стоимость: <span className="ticket__details ticket__cost">{order.sum}</span> рублей</p>

            {/* <button className="acceptin-button" onClick="location.href='ticket.html'" >Получить код бронирования</button> */}
            {/* <BuyingButton component="button" onClick={handleClick} className="acceptin-button" >Получить код бронировния</BuyingButton> */}
            <BuyingButton component={Link} to="../ticket" onClick={handleOrderPay} state={{ movie, hall, session, selectedPlaces }} className="acceptin-button" >Получить код бронировния</BuyingButton>


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