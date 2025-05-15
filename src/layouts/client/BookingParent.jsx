import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setToInitialData } from "../../redux/slices/buyingSlice";
import dayjs from "dayjs";
import Buying from "./Buying";

const BookingParent = () => {
  
  // Redux
  const ticketsRedux = useSelector(state => state.ticketsReducer.tickets);
  console.log({ ticketsRedux });

  const hallRedux = useSelector(state => state.buyingReducer.hall);
  console.log({ hallRedux });
  const movieRedux = useSelector(state => state.buyingReducer.movie);
  console.log({ movieRedux });
  const sessionRedux = useSelector(state => state.buyingReducer.session);
  console.log({ sessionRedux });
  const placesByHallRedux = useSelector(state => state.buyingReducer.placesByHall);
  console.log({ placesByHallRedux });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (!hallRedux && !movieRedux && !sessionRedux && placesByHallRedux) {
    // if (
    //   location.state.hall === null || 
    //   location.state.movie === null || 
    //   location.state.session === null || 
    //   location.state.places === null
    // ) {
    return (
      <main>
        <button onClick={() => {
          dispatch(setToInitialData());
          navigate("../schedule/" + dayjs().format('YYYY-MM-DD'));
        }}>
          Вернуться на главную
        </button>
        <Link to={`../schedule/${dayjs().format('YYYY-MM-DD')}`}><h1>На главную</h1></Link>
        <section className="buying">
          <h2>Не так быстро :)</h2>
          <p>
            <span>Сначала нужно выбрать сеанс для выбора мест.</span>
            <br />
            <Link to={`../schedule/${dayjs().format('YYYY-MM-DD')}`}>Показать сеансы на текущую дату?</Link>
          </p>
        </section>
      </main>
    )
  } 
  
  return (
    <Buying /* hallRedux={hallRedux} movieRedux={movieRedux} sessionRedux={sessionRedux} placesByHallRedux={placesByHallRedux} *//>
    // <div>Buying Component</div>
  )
}

export default BookingParent