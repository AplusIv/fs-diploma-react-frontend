import { useLoaderData, useNavigate } from 'react-router-dom'
// import poster from '../../img/admin/poster.png'

//pages
import HallManager from '../../pages/HallManager'
import HallConfigurator from '../../pages/HallConfigurator';
import PriceConfigurator from '../../pages/PriceConfigurator';
import SessionManager from '../../pages/SessionManager';
import SellsConfigurator from '../../pages/SellsConfigurator';
import { useContext } from 'react';
import { isLoggedContext } from '../../services/Context';

const Home = () => {
 

  // const {status} = useLoaderData();
  // console.log({statusLoader: status});

  // const navigate = useNavigate();

  // if (status === 401) {
  //   return navigate('/login');
  // } 
  
  const { halls, movies, sessions, places } = useLoaderData();

  // const [isActiveHeaderState, setIsActiveHeaderState] = useState(true);

  // const handleClick = (e) => {
  //   console.log(e.target.className);
  //   // if (e.target.contains)
  //   if (e.target.classList.contains('conf-step__header')) {
  //     setIsActiveHeaderState(!isActiveHeaderState);
  //   }
  //   // setIsActiveHeaderState(!isActiveHeaderState);
  // }

  // вернуть
  const {loggedIn} = useContext(isLoggedContext); 
  console.log({loggedIn});
  
  const navigate = useNavigate();

  if (!loggedIn) {
    navigate('/login');
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