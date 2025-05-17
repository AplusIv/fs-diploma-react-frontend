// import poster from '../../img/admin/poster.png'
import { useEffect } from 'react';
// redux
import { getHalls, setStateByStorageData as setHallsErrorStorageData } from '../../redux/slices/hallSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getPlaces, setStateByStorageData as setPlacesErrorStorageData } from '../../redux/slices/placeSlice';
import { getMovies, setStateByStorageData as setMoviesErrorStorageData } from '../../redux/slices/movieSlice';
import { getSessions, setStateByStorageData as setSessionsErrorStorageData } from '../../redux/slices/sessionSlice';

//pages
import HallManager from '../../pages/HallManager'
import HallConfigurator from '../../pages/HallConfigurator';
import PriceConfigurator from '../../pages/PriceConfigurator';
import SessionManager from '../../pages/SessionManager';
import SellsConfigurator from '../../pages/SellsConfigurator';

const Home = () => {
  // загрузка основных сущностей: залы, места, фильмы, сеансы
  const hallsRedux = useSelector(state => state.hallsReducer.halls);
  console.log({ hallsRedux });
  const placesRedux = useSelector(state => state.placesReducer.places);
  console.log({ placesRedux });
  const moviesRedux = useSelector(state => state.moviesReducer.movies);
  console.log({ moviesRedux });
  const sessionsRedux = useSelector(state => state.sessionsReducer.sessions);
  console.log({ sessionsRedux });

  // статусы загрузки данных
  const hallsReduxLoading = useSelector(state => state.hallsReducer.loading);
  console.log({ hallsReduxLoading });
  const placesReduxLoading = useSelector(state => state.placesReducer.loading);
  console.log({ placesReduxLoading });
  const moviesReduxLoading = useSelector(state => state.moviesReducer.loading);
  console.log({ moviesReduxLoading });
  const sessionsReduxLoading = useSelector(state => state.sessionsReducer.loading);
  console.log({ sessionsReduxLoading });

  // статусы наличия ошибок при загрузке основных данных
  const hallsReduxErrorStatus = useSelector(state => state.hallsReducer.errorStatus);
  console.log({ hallsReduxErrorStatus });
  const placesReduxErrorStatus = useSelector(state => state.placesReducer.errorStatus);
  console.log({ placesReduxErrorStatus });
  const moviesReduxErrorStatus = useSelector(state => state.moviesReducer.errorStatus);
  console.log({ moviesReduxErrorStatus });
  const sessionsReduxErrorStatus = useSelector(state => state.sessionsReducer.errorStatus);
  console.log({ sessionsReduxErrorStatus });

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Home page effect is on');
    dispatch(setHallsErrorStorageData()); // синхронизация с хранилищем при перезагрузке
    dispatch(setPlacesErrorStorageData()); // синхронизация с хранилищем при перезагрузке
    dispatch(setMoviesErrorStorageData()); // синхронизация с хранилищем при перезагрузке
    dispatch(setSessionsErrorStorageData()); // синхронизация с хранилищем при перезагрузке

    dispatch(getHalls()); // загрузка залов
    dispatch(getPlaces()); // загрузка зрительских мест
    dispatch(getMovies()); // загрузка фильмов
    dispatch(getSessions()); // загрузка сеансов
  }, []);

  // пользователь не является администратором
  if (hallsReduxLoading === 'failed' &&
    placesReduxLoading === 'failed' &&
    moviesReduxLoading === 'failed' &&
    sessionsReduxLoading === 'failed') {

    return (hallsReduxErrorStatus === 403 &&
      placesReduxErrorStatus === 403 &&
      moviesReduxErrorStatus === 403 &&
      sessionsReduxErrorStatus === 403) ?
      (
        <main className="conf-steps">
          <section className="conf-step" >
            <div className="conf-step__wrapper">
              <p>
                <h1>Текущий пользователь не обладает правами администратора для просмотра этой страницы.</h1>
              </p>
            </div>
          </section>
        </main>
      ) :
      (
        <main className="conf-steps">
          <section className="conf-step" >
            <div className="conf-step__wrapper">
              <p>
                <h1>Упс, всё сломалось, попробуйте перезагрузить страницу.</h1>
              </p>
            </div>
          </section>
        </main>
      )
  }

  return (
    <main className="conf-steps">
      <HallManager />
      <HallConfigurator />
      <PriceConfigurator />
      <SessionManager />
      <SellsConfigurator />
    </main>
  )
}

export default Home