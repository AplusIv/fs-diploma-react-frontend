import { useLoaderData, useNavigate } from 'react-router-dom'
// import poster from '../../img/admin/poster.png'

//pages
import HallManager from '../../pages/HallManager'
import HallConfigurator from '../../pages/HallConfigurator';
import PriceConfigurator from '../../pages/PriceConfigurator';
import SessionManager from '../../pages/SessionManager';
import SellsConfigurator from '../../pages/SellsConfigurator';
import { useContext, useEffect } from 'react';
import { isLoggedContext } from '../../services/Context';

const Home = () => {  
  const { halls, movies, sessions, places } = useLoaderData();

  // вернуть
  const {loggedIn} = useContext(isLoggedContext); 
  console.log({loggedIn});
  
  // const navigate = useNavigate();

  // if (!loggedIn) {
  //   navigate('/login');
  // }  

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      console.log('navigate');
      // Redirect the user back to /login route
      navigate("/login", { replace: true } );
    }
  }, [loggedIn]);

  if (!loggedIn) {
    return (<div>Требуется авторизация</div>)
  }

  return (
    <main className="conf-steps">

      <HallManager halls={ halls } />

      <HallConfigurator halls={ halls } places={ places }/>    
    
      <PriceConfigurator halls={ halls } />
    
      <SessionManager halls={ halls } movies={ movies } sessions={ sessions } />
    
      <SellsConfigurator/>
    </main>
  )
}

export default Home