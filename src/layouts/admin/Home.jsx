import { useLoaderData, useNavigate } from 'react-router-dom'
// import poster from '../../img/admin/poster.png'

//pages
import HallManager from '../../pages/HallManager'
import HallConfigurator from '../../pages/HallConfigurator';
import PriceConfigurator from '../../pages/PriceConfigurator';
import SessionManager from '../../pages/SessionManager';
import SellsConfigurator from '../../pages/SellsConfigurator';
import { useContext, useEffect, useState } from 'react';
import { isLoggedContext } from '../../services/Context';
import { getHalls } from '../../redux/slices/hallSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getPlaces } from '../../redux/slices/placeSlice';
import { getMovies } from '../../redux/slices/movieSlice';
import { getSessions } from '../../redux/slices/sessionSlice';
import { setLoggedOut, setStateByStorageData } from '../../redux/slices/loginSlice';
import Logout from './Logout';

const Home = () => {
  // const { halls, movies, sessions, places } = useLoaderData();
  
  // const [loadingStatus, setLoadingStatus] = useState('loading');

  // загрузка основных сущностей: залы, места, фильмы, сеансы
  const hallsRedux = useSelector(state => state.hallsReducer.halls);
  console.log({hallsRedux});
  const placesRedux = useSelector(state => state.placesReducer.places);
  console.log({ placesRedux });
  const moviesRedux = useSelector(state => state.moviesReducer.movies);
  console.log({ moviesRedux });
  const sessionsRedux = useSelector(state => state.sessionsReducer.sessions);
  console.log({ sessionsRedux });

  const loginRedux = useSelector(state => state.loginReducer.loggedIn);
  console.log({loginRedux});


  // статусы загрузки данных
  const hallsReduxLoading = useSelector(state => state.hallsReducer.loading);
  console.log({hallsReduxLoading});
  const placesReduxLoading = useSelector(state => state.placesReducer.loading);
  console.log({ placesReduxLoading });
  const moviesReduxLoading = useSelector(state => state.moviesReducer.loading);
  console.log({ moviesReduxLoading });
  const sessionsReduxLoading = useSelector(state => state.sessionsReducer.loading);
  console.log({ sessionsReduxLoading });


  const dispatch = useDispatch();

  useEffect(() => {
    console.log('hallConfigurator effect is on');

    // dispatch(setStateByStorageData()); // синхронизация с хранилищем при перезагрузке

    dispatch(getHalls()); // загрузка залов
    dispatch(getPlaces()); // загрузка зрительских мест
    dispatch(getMovies()); // загрузка фильмов
    dispatch(getSessions()); // загрузка сеансов

    // setLoadingStatus('loaded');
  }, []);

  /* // вернуть
  const { loggedIn } = useContext(isLoggedContext);
  console.log({ loggedIn }); */

  // const navigate = useNavigate();
 

  const navigate = useNavigate();

  

  // useEffect(() => {
  //   if (!loginRedux) {
  //     console.log('navigate');
  //     // Redirect the user back to /login route
  //     navigate("/login", { replace: true });
  //   }
  //   // navigate("/", { replace: true });
  // }, [loginRedux]);




  // if (!loginRedux) {
  //   return (<div>Требуется авторизация</div>)
  // }

  
  // if (!loggedIn) {
  //   navigate('/login');
  // } 

  /* useEffect(() => {
    if (!loggedIn) {
      console.log('navigate');
      // Redirect the user back to /login route
      navigate("/login", { replace: true });
    }
  }, [loggedIn]);

  if (!loggedIn) {
    return (<div>Требуется авторизация</div>)
  } */

  // return (
  //   hallsReduxLoading === 'idle' &&
  //   placesReduxLoading === 'idle' && 
  //   moviesReduxLoading === 'idle' && 
  //   sessionsReduxLoading === 'idle' && 
  //   <main className="conf-steps">
  //     <HallManager halls={hallsRedux} />
  //     <HallConfigurator/>
  //     <PriceConfigurator/>
  //     <SessionManager halls={hallsRedux} movies={moviesRedux} sessions={sessionsRedux} />
  //     <SellsConfigurator />
  //   </main>
  // )




  // // пользователь не авторизован
  // if (
  //   hallsReduxLoading === 'failed' || 
  //   placesReduxLoading === 'failed' || 
  //   moviesReduxLoading === 'failed' || 
  //   sessionsReduxLoading === 'failed'
  // ) {
  //   // добавить статусы при ошибке 
    
  //   // написать isLoggedIn
  //   console.log('navigate');
  //   // Redirect the user back to /login route
  //   navigate("/login", { replace: true });
  // }

  return (
    <main className="conf-steps">
      <HallManager/>
      <HallConfigurator/>
      <PriceConfigurator/>
      <SessionManager/>
      {/* {hallsReduxLoading === 'idle' && <HallManager halls={hallsRedux} />} */}
      {/* {hallsReduxLoading === 'idle' && placesReduxLoading === 'idle' && <HallConfigurator halls={hallsRedux} places={placesRedux} />} */}
      {/* {hallsReduxLoading === 'idle' && <PriceConfigurator halls={hallsRedux} />} */}
      {/* {hallsReduxLoading === 'idle' && moviesReduxLoading === 'idle' && sessionsReduxLoading === 'idle' && <SessionManager halls={hallsRedux} movies={moviesRedux} sessions={sessionsRedux} />} */}

      <SellsConfigurator />

      {/* <HallManager halls={halls} /> */}
      {/* <HallConfigurator halls={halls} places={places} /> */}
      {/* <PriceConfigurator halls={halls} /> */}
      {/* <SessionManager halls={halls} movies={movies} sessions={sessions} /> */}



    </main>
  )
}

export default Home