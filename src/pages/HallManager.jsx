import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import HallName from "./HallName";
import SectionHeader from "./SectionHeader";
import Popup4 from "./Popup4";

// import { addHall, hidePopup } from "../redux/slices/popupSlice";
import { addHall, hidePopup } from "../redux/slices/hallPopupSlice";
import { deleteHall, postHallData, setToInitialData } from "../redux/slices/hallPopupDataHandlerSlice";

const HallManager = () => {

  const [isActiveHeaderState, setIsActiveHeaderState] = useState(true);

  const handleClick = (e) => {
    console.log(e.currentTarget.className);
    // if (e.target.contains)
    if (e.currentTarget.classList.contains('conf-step__header')) {
      setIsActiveHeaderState(!isActiveHeaderState);
    }
    // setIsActiveHeaderState(!isActiveHeaderState);
  }

  // popup states:
  // statuses: 'adding film popup', 'editing film popup', 'hide popup'
  // titles: 'Добавить фильм', 'Изменить фильм', 'popup is hidden'
  // isActive: true, false (показать / скрыть)
  // const [popupInfo, setPopupInfo] = useState({
  //   status: 'hide popup',
  //   title: 'popup is hidden',
  //   isActive: false
  // });

  // redux popupInfo

  const hallPopupInfoRedux = useSelector(state => state.hallPopupInfoReducer.hallPopupInfo);
  console.log({ hallPopupInfoRedux });

  const hallsRedux = useSelector(state => state.hallsReducer.halls);
  console.log({ hallsRedux });

  const hallsReduxLoading = useSelector(state => state.hallsReducer.loading);
  console.log({ hallsReduxLoading });

  const dispatch = useDispatch();

  // popup handlers
  const addHallCallback = useCallback(() => dispatch(addHall()), []);
  const hidePopupCallback = useCallback(() => {
    dispatch(hidePopup());
    dispatch(setToInitialData());
  }, []);

  const handlePopupStatus = (status, movie = {}) => {
    console.log(movie);
    console.log('popup status handler');
    if (status === 'adding hall popup') {
      // redux
      addHallCallback();
      // () => dispatch(addHall())(); // IIFE
      // dispatch(addHall());
    }
    if (status === 'hide popup') {
      hidePopupCallback();
    }
  }

  const handleAddData = (newData) => {
      dispatch(postHallData(newData));
  }

  const handleDeleteHall = (id) => {
    dispatch(deleteHall({ id }));
  }

  if (hallsReduxLoading !== 'idle') {
    return (
      <section className="conf-step" > 
        <SectionHeader name={'Управление залами'} isActiveHeaderState={isActiveHeaderState} handleClick={handleClick} />
        <div className="conf-step__wrapper">
          <span className="loader" ></span>
        </div>
      </section>
    )
  }

  return (
    <section className="conf-step" >
      <Popup4
        popupInfo={hallPopupInfoRedux}
        halls={hallsRedux}
        onAddCallback={handleAddData}
        handlePopup={handlePopupStatus}
      />

      <SectionHeader name={'Управление залами'} isActiveHeaderState={isActiveHeaderState} handleClick={handleClick} />
      
      {<div className="conf-step__wrapper">
        <p className="conf-step__paragraph">Доступные залы:</p>
        <ul className="conf-step__list">
          {hallsRedux.map(hall => (
            <HallName key={hall.id} hall={hall} handleDeleteHall={handleDeleteHall} />
          ))}
        </ul>
        <button className="conf-step__button conf-step__button-accent" onClick={() => addHallCallback()}>Создать зал</button>
      </div>}
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


// export const hallsLoader = async () => {
//   const [halls, movies, sessions] = await Promise.all([
//     fetch('http://localhost:4000/halls').then(res => res.json()),
//     fetch('http://localhost:4000/movies').then(res => res.json()),
//     fetch('http://localhost:4000/sessions').then(res => res.json()),
//   ]);

//   return { halls, movies, sessions };
// }