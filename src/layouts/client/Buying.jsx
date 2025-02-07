import { Link, useLocation, useNavigate } from "react-router-dom"
import BuyingButton from "./BuyingButton";
import { nanoid } from "nanoid";
import BuyingPlace from "./BuyingPlace";
import { useContext, useState } from "react";
import dayjs from "dayjs";
import { addDataToDB, makeOrderWithTickets } from "../../services/DBUpdater";
import { orderContext } from "../../services/OrderContext";

const Buying = () => {
  // Достаю данные из ссылки на сеанс
  const location = useLocation();
  const { hall, movie, session, places, tickets } = location.state;
  console.log(hall);
  console.log(movie);
  console.log(session);

  const navigate = useNavigate();

  const {order, setOrder} = useContext(orderContext);
  console.log({orderFromContext: order});
  console.log({orderFromContext: setOrder});
  

  const [newOrder, setNewOrder] = useState({});
  console.log({newOrder});
  

  // Состояние зрительских мест
  const [placesState, setPlacesState] = useState([...places]);

  // выбранные места
  const selectedPlaces = placesState.filter(place => place.is_selected === true);

  // Отрисовка мест

  const compareFnByPlaceAssending = (a, b) => Number(a.place) - Number(b.place); // сортировка объектов по возрастанию

  // места в зависимости от зала
  const prepareHallPlaces = (places, hall, sorterFn) => {

    let placesGroupedByRow = [];

    // const placesCopy = [...places];
    const placesByHall = places.filter(place => place.hall_id === hall.id);

    // placesByHall.sort(compareFn); // сортировка мест из БД


    for (let index = 1; index <= hall.rows; index++) {
      const rowPlaces = placesByHall.filter(place => place.row === index);
      // placesGroupedByRow.push(rowPlaces);
      placesGroupedByRow.push(rowPlaces.sort(sorterFn));
    }

    console.log({ placesGroupedByRow });

    return placesGroupedByRow;
  }

  const buyingPlaces = prepareHallPlaces(placesState, hall, compareFnByPlaceAssending);

  // Билеты для добавления в DB при обработке кнопки "Забронировать"
  // const [ticketsToAddInDB, setTicketsToAddInDB] = useState([]);

  const handleTicketBooking = async () => {
    const ticketsToAddInDB = selectedPlaces.map(selectedPlace => {
      return {
        place_id: selectedPlace.id,
        session_id: session.id,
        status: 'booked'
      }
    });
    // await addDataToDB(ticketsToAddInDB, 'api/orders');
    const newOrderData = await makeOrderWithTickets(ticketsToAddInDB, 'api/orders');
    // setNewOrder((prevState) => ({...prevState, ...newOrderData}));
    console.log({newOrderData});
    
    setNewOrder(newOrderData);
    setOrder(newOrderData.newOrder);

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
    console.log('handlePlaceType');

    const modifiedPlaces = placesState.map(place => {
      if (place.id === placeId) {
        console.log({ placeId });

        let chosenPlace = { ...place }; // копия исходного объекта, чтобы не перезаписать его

        if (place.type === 'standart' || place.type === 'vip') {
          chosenPlace.is_selected = !place.is_selected;
          // switch (place.is_selected) {
          //   case false:
          //     chosenPlace.is_selected = true;
          //     break;
          //   case true:
          //     chosenPlace.is_selected = false;
          //     break;
          // }
        } 
        return chosenPlace;      
      } else {
        return place;
      }
    })
    // console.log({ modifiedPlaces });

    setPlacesState(modifiedPlaces);
  }

  /**
   * Получить сумму выбранных билетов
   */
  const getTotalSum = (selectedPlaces) => {
    const totalSum = selectedPlaces.reduce((sum, currentPlace) => {
      let currentPrice;
      switch (currentPlace.type) {
        case 'standart':
          currentPrice = hall.normal_price;
          break;
        case 'vip':
          currentPrice = hall.vip_price;
          break;
        default:
          break;
      }
      return sum + currentPrice;
    }, 0)  
    return totalSum;
  }

  return (
    <main>
      <button onClick={() => navigate('../client')}>
        Вернуться на главную
      </button>
      <Link to={"../client/schedule/" + dayjs().format('YYYY-MM-DD')}><h1>На главную</h1></Link>
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
            {/* {rows} */}
            {buyingPlaces.map(row => <div key={nanoid()} className="buying-scheme__row">
              {row.map(place => <BuyingPlace 
                                  key={nanoid()} 
                                  place={place} 
                                  handlePlaceSelected={handlePlaceSelected} 
                                  tickets={tickets.filter(ticket => ticket.session_id === session.id)}
                                />)}
            </div>)}
          </div>
          <div className="buying-scheme__legend">
            <div className="col">
              <p className="buying-scheme__legend-price">
                <span className="buying-scheme__chair buying-scheme__chair_standart"></span> Свободно 
                (<span className="buying-scheme__legend-value">{hall.normal_price.toFixed(2)}</span> {currency})
              </p>
              <p className="buying-scheme__legend-price">
                <span className="buying-scheme__chair buying-scheme__chair_vip"></span> Свободно VIP 
                (<span className="buying-scheme__legend-value">{hall.vip_price.toFixed(2)}</span> {currency})
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
        <BuyingButton component={Link} to="../payment" className="acceptin-button" state={{ movie, hall, session, selectedPlaces, tickets: tickets.filter(ticket => ticket.session_id === session.id) }} onClick={handleTicketBooking}>Забронировать</BuyingButton>
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