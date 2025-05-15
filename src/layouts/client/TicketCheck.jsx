import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setToInitialData as setToInitialDataBuyingSlice, setStateByStorageData as setDataInBuyingSlice } from "../../redux/slices/buyingSlice";
import { getNewOrderTickets, getTickets, setToInitialData as setToInitialDataTicketSlice, setStateByStorageData as setDataInTicketSlice } from "../../redux/slices/ticketSlice";
import { getOrders, setStateByStorageData as setDataInOrderSlice, setToInitialData as setToInitialDataOrderSlice } from "../../redux/slices/orderSlice";
import dayjs from "dayjs";
import Ticket from "./Ticket";

const TicketCheck = () => {
  // redux
  const hallRedux = useSelector(state => state.buyingReducer.hall);
  const movieRedux = useSelector(state => state.buyingReducer.movie);
  const sessionRedux = useSelector(state => state.buyingReducer.session);
  const orderRedux = useSelector(state => state.orderReducer.newOrder);
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

  // sessionStorage
  const hallStorage = JSON.parse(sessionStorage.getItem('hall')); // поиск сохраненных данных в хранилище
  const movieStorage = JSON.parse(sessionStorage.getItem('movie')); // поиск сохраненных данных в хранилище
  const cinemaSessionStorage = JSON.parse(sessionStorage.getItem('session')); // поиск сохраненных данных в хранилище
  const placesByHallStorage = JSON.parse(sessionStorage.getItem('placesByHall')); // поиск сохраненных данных в хранилище
  const orderStorage = JSON.parse(sessionStorage.getItem('newOrder')); // поиск сохраненных данных в хранилище
  const newOrderTicketsStorage = JSON.parse(sessionStorage.getItem('newOrderTickets')); // поиск сохраненных данных в хранилище

  useEffect(() => {
    console.log('Buying page effect is on');

    if (!orderRedux && !hallRedux && !movieRedux && !sessionRedux) {
      if (hallStorage && movieStorage && cinemaSessionStorage && placesByHallStorage && orderStorage && newOrderTicketsStorage) {
        console.log('Обновление данных из хранилища после перезагрузки страницы');
        dispatch(setDataInBuyingSlice());
        dispatch(setDataInOrderSlice());
        dispatch(setDataInTicketSlice());
      }
    }

    // const orderStorage = JSON.parse(sessionStorage.getItem('newOrder'));

    if (orderStorage) {
      console.log('get new order tickets data');
      dispatch(getNewOrderTickets({
        // url: 'api/tickets/order',
        url: 'api/guest/tickets/order',
        id: orderStorage.id,
        // id: undefined,
        // id: null,
      }))
    }
  }, []);

  // Проблемы с загрузкой (запрос вернулся с ошибкой)
  if (ticketsReduxLoading === 'failed' || ordersReduxLoading === 'failed') {
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
        {/* <ShowError/> */}
        <section className="buying">
          <br />
          <h2>Упс, что-то сломалось :( Проносим Вам свои извинения.</h2>
          <p>
            <span>Ваши билеты оформлены, чтобы их увидеть попробуйте обновить страницу.</span>
            <br />
            <span>Если проблема не устранена - обратитесь, пожалуйста, в техническую поддержку. Мы обязательно Вам поможем!</span>

            {/* <Link to={`../schedule/${dayjs().format('YYYY-MM-DD')}`}>Показать сеансы на текущую дату?</Link> */}
          </p>
        </section>
      </main>
    )
  }

  // Загрузка
  if (ticketsReduxLoading !== 'idle' || ordersReduxLoading !== 'idle') {
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
        <div>
          <span className="loader" ></span>
        </div>
        {/* <section className="buying">
          <span className="loader" ></span>
        </section> */}
      </main>
    )
  }

  // if (!orderRedux && !hallRedux && !movieRedux && !sessionRedux && placesByHallRedux) {
  if (!orderRedux && !hallRedux && !movieRedux && !sessionRedux) {

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
        {/* <Link to={`../schedule/${dayjs().format('YYYY-MM-DD')}`}><h1>На главную</h1></Link> */}
        <section className="buying">
          <h2>Не так быстро :)</h2>
          <p>
            <span>Сначала нужно выбрать сеанс, выбрать место, оплатить заказ, а потом уже пытаться увидеть всю информацию.</span>
            <br />
            <Link to={`../schedule/${dayjs().format('YYYY-MM-DD')}`}>Показать сеансы на текущую дату?</Link>
          </p>
        </section>
      </main>
    )
  }
  return (
    <Ticket />
    // <div>Ticket page</div>
  )
}

export default TicketCheck