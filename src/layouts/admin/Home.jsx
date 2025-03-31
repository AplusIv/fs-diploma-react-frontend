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

const Home = () => {
  const { halls, movies, sessions, places } = useLoaderData();
  
  const hallsRedux = useSelector(state => state.hallsReducer.halls);
  console.log(hallsRedux);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Get halls effect is on');

    // dispatch(getHalls());
  
    // setHallsInfo(hallsData);
    // return () => {
    //   second
    // }
  }, [])

  // вернуть
  const { loggedIn } = useContext(isLoggedContext);
  console.log({ loggedIn });

  // const navigate = useNavigate();

  // if (!loggedIn) {
  //   navigate('/login');
  // }  

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      console.log('navigate');
      // Redirect the user back to /login route
      navigate("/login", { replace: true });
    }
  }, [loggedIn]);

  if (!loggedIn) {
    return (<div>Требуется авторизация</div>)
  }

  return (
    <main className="conf-steps">

      <HallManager halls={halls} />

      <HallConfigurator halls={halls} places={places} />

      <PriceConfigurator halls={halls} />

      <SessionManager halls={halls} movies={movies} sessions={sessions} />

      <SellsConfigurator />
    </main>
  )
}

export default Home