import { useState } from 'react';
import poster from '../img/admin/poster.png'
import SectionButtons from './SectionButtons'


import SectionHeader from './SectionHeader'

const SessionManager = ({ halls, movies, sessions }) => {
  const [isActiveHeaderState, setIsActiveHeaderState] = useState(true);

  const handleClick = (e) => {
    console.log(e.currentTarget.className);
    // if (e.target.contains)
    if (e.currentTarget.classList.contains('conf-step__header')) {
      setIsActiveHeaderState(!isActiveHeaderState);
    }
    // setIsActiveHeaderState(!isActiveHeaderState);
  }

  return (
    <section className="conf-step">
      <SectionHeader name={'Сетка сеансов'} isActiveHeaderState={isActiveHeaderState} handleClick={handleClick}/>
      <div className="conf-step__wrapper">
        <p className="conf-step__paragraph">
          <button className="conf-step__button conf-step__button-accent">Добавить фильм</button>
        </p>
        <div className="conf-step__movies">
          {movies.map(movie => (
            <div key={movie.id} className="conf-step__movie">
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