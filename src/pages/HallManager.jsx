import { useState } from "react";
import HallName from "./HallName";
import SectionHeader from "./SectionHeader";
import Popup from "./Popup";

const HallManager = ({ halls }) => {

  const [isActiveHeaderState, setIsActiveHeaderState] = useState(true);

  const [isActivePopup, setIsActivePopup] = useState(false);

  const handleClick = (e) => {
    console.log(e.currentTarget.className);
    // if (e.target.contains)
    if (e.currentTarget.classList.contains('conf-step__header')) {
      setIsActiveHeaderState(!isActiveHeaderState);
    }
    // setIsActiveHeaderState(!isActiveHeaderState);
  }

  const handlePopup = (e) => {
    console.log('popup!');
    setIsActivePopup(!isActivePopup);
  }

  return (
    <section className="conf-step" >
        <Popup isActive={isActivePopup} handlePopup={handlePopup}/>

        <SectionHeader name={'Управление залами'} isActiveHeaderState={isActiveHeaderState} handleClick={handleClick}/>
        <div className="conf-step__wrapper">
          <p className="conf-step__paragraph">Доступные залы:</p>
          <ul className="conf-step__list">
            {halls.map(hall => (
              <HallName key={hall.id} hall={hall}/>
              // <li key={hall.id}>{hall.title}
              //   <button className="conf-step__button conf-step__button-trash"></button>
              // </li>
            ))}
          </ul>
          <button className="conf-step__button conf-step__button-accent" onClick={handlePopup}>Создать зал</button>
        </div>
    </section>
  )
}

export default HallManager

// loader function
// export const hallsLoader = async () => {
//   const responce = await fetch('http://localhost:4000/halls');

//   if (!responce.ok) {
//     throw Error('could not fecth data');
//   }

//   return responce.json();
// }


export const hallsLoader = async () => {
  const [halls, movies, sessions] = await Promise.all([
    fetch('http://localhost:4000/halls').then(res => res.json()),
    fetch('http://localhost:4000/movies').then(res => res.json()),
    fetch('http://localhost:4000/sessions').then(res => res.json()),
  ]);

  return { halls, movies, sessions };    
}