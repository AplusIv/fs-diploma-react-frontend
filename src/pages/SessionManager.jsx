import { useState } from 'react';
import poster from '../img/admin/poster.png'
import SectionButtons from './SectionButtons'


import SectionHeader from './SectionHeader'
// import Popup from './Popup';
// import Popup2 from './Popup2';
import Popup3 from './Popup3';
import PopupBase from './PopupBase';

const SessionManager = ({ halls, movies, sessions }) => {
  const [isActiveHeaderState, setIsActiveHeaderState] = useState(true);

  const [isActivePopup, setIsActivePopup] = useState(false);

  // const [activeMovie, setActiveMovie] = useState({});

  // const initialMovie = {...activeMovie};

  const [movieInfo, setMovieInfo] = useState({});
  console.log(movieInfo);

  // 'adding film popup', 'editing film popup', 'hide popup'
  const [popupStatus, setPopupStatus] = useState('hide popup');

  // const handlePopupStatus = (status) => {
  //   setPopupStatus(status);
  //   console.log('popup state changed');    
  // }


  const handleClick = (e) => {
    console.log(e.currentTarget.className);
    // if (e.target.contains)
    if (e.currentTarget.classList.contains('conf-step__header')) {
      setIsActiveHeaderState(!isActiveHeaderState);
    }
    // setIsActiveHeaderState(!isActiveHeaderState);
  }

  const handlePopup = (status) => {
    console.log('popup2!');
    setIsActivePopup(!isActivePopup);
    setPopupStatus(status);
    setMovieInfo({}); // сбросить информацию о выбранном фильме для добавления / закрытия формы
  }

  const handlePopup3 = (movie, status) => {
    console.log(movie);
    handlePopup(status);
    // setActiveMovie({...movie});
    setMovieInfo({...movie});
    // setIsActivePopup(!isActivePopup);
  }

  const handleChange = (e) => {
    setMovieInfo({...movieInfo, [e.target.name]: e.target.value});
    console.log(e.target.value);    
  }

  const movieLastId = movies.length; // для добавления нового id в форме

  // const [movieInfo, setMovieInfo] = useState({
  //   title: '',
  //   description: '',
  //   duration: '',
  //   country: ''
  // })

  // const handleChange = (e) => {
  //   setMovieInfo({...movieInfo, [e.target.name]: e.target.value});
  //   console.log(e.target.value);    
  // }

  return (
    <section className="conf-step">
      {/* <Popup2 isActive={isActivePopup} handlePopup={handlePopup}/> */}
      <Popup3 popupStatus={popupStatus} movieLastId={movieLastId} movieInfo={movieInfo} handleChange={handleChange} isActive={isActivePopup} popupTitle={'Изменить фильм'} handlePopup={handlePopup}>
        <PopupBase isActive={isActivePopup} popupTitle={'Изменить фильм'} handlePopup={handlePopup}>
        {/* <PopupBase> */}
        </PopupBase>
      </Popup3>

      {/* <Popup3 activeMovie={activeMovie} isActive={isActivePopup} handlePopup={handlePopup3}>
            <input 
              type="text" 
              name="title" 
              placeholder="Название фильма" 
              autoComplete="on"
              value={activeMovie.title}
              onChange={handleChange}
            />
            <textarea 
              name="description" 
              rows="5" 
              cols="33" 
              placeholder="Введите описание фильма" 
              autoComplete="on"
              value={activeMovie.description}
              onChange={handleChange}
            />
      </Popup3> */}

      <SectionHeader name={'Сетка сеансов'} isActiveHeaderState={isActiveHeaderState} handleClick={handleClick}/>
      {/* <Popup2 isActive={isActivePopup} handlePopup={handlePopup}/> */}

      
      <div className="conf-step__wrapper">
        <p className="conf-step__paragraph">
          <button className="conf-step__button conf-step__button-accent" onClick={()=>handlePopup('adding film popup')}>Добавить фильм</button>
        </p>
        <div className="conf-step__movies">
          {movies.map(movie => (
            <div key={movie.id} className="conf-step__movie" onClick={() => handlePopup3(movie, 'editing film popup')}>
              <img className="conf-step__movie-poster" alt="poster" src={poster}/>
              <h3 className="conf-step__movie-title">{movie.title}</h3>
              <p className="conf-step__movie-duration">{movie.duration} минут</p>
            </div>
            )
          )}
        </div>
        
        <div className="conf-step__seances">
          {halls.map(hall => (
              <div key={ hall.id } className="conf-step__seances-hall">
                <h3 className="conf-step__seances-title">{ hall.title }</h3>
                <div className="conf-step__seances-timeline">
                  {
                    sessions.map(session => (
                      // const duration = Number({session.duration});
                      // const sessionDurationWidth = 'calc(' + duration + '*' + '0.5)';
                      session.hall_id === hall.id ? (<div key={ session.id } className="conf-step__seances-movie"  style={ 
                                                    { width: `calc(${session.duration}px * 0.5)`, 
                                                      backgroundColor: 'rgb(133, 255, 137)', 
                                                      left: `calc((${session.time.slice(0,2)} + ${session.time.slice(3)} / 60) * 720px / 24)` 
                                                    } 
                                                    }>
                                                      <p className="conf-step__seances-movie-title">{ movies[session.movie_id - 1].title }</p> {/* нужно будет скорректировать, пока работает только для индексов от 1 и так далее */}
                                                      <p className="conf-step__seances-movie-start">{ session.time }</p>
                                                    </div>) : null
                    ))
                  }
                  {/* 
                  <div className="conf-step__seances-movie" style="width: 60px; background-color: rgb(133, 255, 137); left: 0;">
                    <p className="conf-step__seances-movie-title">Миссия выполнима</p>
                    <p className="conf-step__seances-movie-start">00:00</p>
                  </div>
                  */}
                </div>
              </div>
            )
          )}
        </div>
        <SectionButtons/> 
      </div>
    </section>
  )
}

export default SessionManager