import { useLoaderData } from 'react-router-dom'
// import poster from '../../img/admin/poster.png'

//pages
import HallManager from '../../pages/HallManager'
import HallConfigurator from '../../pages/HallConfigurator';
import PriceConfigurator from '../../pages/PriceConfigurator';
import SessionManager from '../../pages/SessionManager';
import SellsConfigurator from '../../pages/SellsConfigurator';

const Home = () => {

  
  const { halls, movies, sessions } = useLoaderData();

  // const [isActiveHeaderState, setIsActiveHeaderState] = useState(true);

  // const handleClick = (e) => {
  //   console.log(e.target.className);
  //   // if (e.target.contains)
  //   if (e.target.classList.contains('conf-step__header')) {
  //     setIsActiveHeaderState(!isActiveHeaderState);
  //   }
  //   // setIsActiveHeaderState(!isActiveHeaderState);
  // }

  return (
    <main className="conf-steps">

      <HallManager halls={ halls } />

      <HallConfigurator halls={ halls } />    
    
      <PriceConfigurator halls={ halls } />
    
      <SessionManager halls={ halls } movies={ movies } sessions={ sessions } />
    
      <SellsConfigurator/>
    </main>
  )
}

export default Home