import { Link, useLoaderData, useParams } from 'react-router-dom';
import poster1 from '../../img/client/poster1.jpg';
import poster2 from '../../img/client/poster2.jpg'
import MovieInfo from './MovieInfo';
import MovieSessions from './MovieSessions';
// import { getSessionsByDate } from '../../services/DBUpdater';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSessionsByDate } from '../../redux/slices/sessionsByDateSlice';

import dayjs from 'dayjs';
import { compareFnByDateAssending } from '../../services/sorterFunctions';


const MovieList = (/* { halls, movies, sessions, places, tickets } */) => {
  // console.log(sessions);
  // console.log(movies);

  // const { halls, movies, places, tickets } = useLoaderData();

  // Redux
  const hallsRedux = useSelector(state => state.guestHallsReducer.halls);
  console.log({ hallsRedux });
  const moviesRedux = useSelector(state => state.guestMoviesReducer.movies);
  console.log({ moviesRedux });
  const placesRedux = useSelector(state => state.guestPlacesReducer.places);
  console.log({ placesRedux });
  const sessionsByDateRedux = useSelector(state => state.sessionsByDateReducer.sessionsByDate);
  console.log({ sessionsByDateRedux });

  // сатусы загрузки данных
  const hallsReduxLoading = useSelector(state => state.guestHallsReducer.loading);
  console.log({ hallsReduxLoading });
  const moviesReduxLoading = useSelector(state => state.guestMoviesReducer.loading);
  console.log({ moviesReduxLoading });
  const placesReduxLoading = useSelector(state => state.guestPlacesReducer.loading);
  console.log({ placesReduxLoading });
  const sessionsByDateReduxLoading = useSelector(state => state.sessionsByDateReducer.loading);
  console.log({ sessionsByDateReduxLoading });

  const ticketsReduxLoading = useSelector(state => state.ticketsReducer.loading);
  console.log({ ticketsReduxLoading });
  const ordersReduxLoading = useSelector(state => state.orderReducer.loading);
  console.log({ ordersReduxLoading });


  const dispatch = useDispatch();


  const { date } = useParams();
  console.log(date);

  useEffect(() => {
    console.log('MovieList effect is on');
    // Получение сеансов на конкретные даты
    dispatch(getSessionsByDate(date));
  }, [date])

  const now = dayjs().format('YYYY-MM-DD');

  // некорректная дата/отсутствие даты в адресной строке
  if (sessionsByDateReduxLoading === 'failed') {
    return (
      <main>
        <section className='movie'>
          <h2>Вы выбрали некорректную дату.</h2>
          <p>
            <span>Дата сеансов не выбрана, либо менее текущей. <br/>Укажите корректную дату в адресной строке в допустимом формате (например, 2019-07-30) или воспользуйтесь навигатором дат. </span>
            <br/>
            <span>Также вы можете посмотреть сеансы на текущую дату по ссылке. <br/><Link to={`../schedule/${now}`}>Показать сеансы на текущую дату?</Link></span>
          </p>
        </section>
      </main>
    )
  }

  // Загрузка
  if (
    hallsReduxLoading !== 'idle' ||
    moviesReduxLoading !== 'idle' ||
    placesReduxLoading !== 'idle' ||
    sessionsByDateReduxLoading !== 'idle'
  ) {
    return (
      <main>
        <span className="loader" ></span>
      </main>
    )
  }


  if (sessionsByDateRedux && sessionsByDateRedux.length === 0) {
    return (
      <main>
        <section className='movie'>
          <h2>Сеансы на выбранную дату отсутствуют.</h2>
          <p>Выберите другую дату для поиска сеансов.</p>
        </section>
      </main>
    )
  }

  return (
    <main>
      {sessionsByDateRedux && moviesRedux.map(movie => {
        const sessionsByDateAndMovie = sessionsByDateRedux.filter(session => session.movie_id === movie.id);
        if (sessionsByDateAndMovie.length > 0) {
          sessionsByDateAndMovie.sort(compareFnByDateAssending); // сортировать массив по столбцам "дата" и "время" по возрастанию
          return (
            <section key={movie.id} className="movie">
              <MovieInfo movie={movie} poster={poster1} />
              <MovieSessions movie={movie} halls={hallsRedux} sessions={sessionsByDateAndMovie} places={placesRedux} />
            </section>
          )
        }
        return null;
      })}      
    </main>
  )
}

export default MovieList