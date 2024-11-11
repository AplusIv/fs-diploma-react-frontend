import { useState } from 'react';
import poster from '../img/admin/poster.png'
import SectionButtons from './SectionButtons'


import SectionHeader from './SectionHeader'
// import Popup from './Popup';
// import Popup2 from './Popup2';
import Popup3 from './Popup3';
import PopupBase from './PopupBase';
import Popup4 from './Popup4';
import { addDataToDB, changeDataInDB, deleteDataInDB } from '../services/DBUpdater';

const SessionManager = ({ halls, movies, sessions }) => {
  const [isActiveHeaderState, setIsActiveHeaderState] = useState(true);

  // const [isActivePopup, setIsActivePopup] = useState(false);

  const [movieInfo, setMovieInfo] = useState({});
  console.log(movieInfo);

  // Сеансы
  const [sessionsInfo, setSessionsInfo] = useState([...sessions]);
  console.log(sessionsInfo);

  // Фильмы
  const [moviesInfo, setMoviesInfo] = useState([...movies]);
  console.log(moviesInfo);

  // Залы
  const [hallsInfo, setHallsInfo] = useState([...halls]);
  console.log(hallsInfo);


  // Фильмы для добавления в DB при обработке кнопки "Сохранить"
  const [moviesToAddInDB, setMoviesToAddInDB] = useState([]);

  // Сеансы для добавления в DB при обработке кнопки "Сохранить"
  const [sessionsToAddInDB, setSessionsToAddInDB] = useState([]);

  console.log({moviesToAddInDB}, {sessionsToAddInDB});

  // Фильмы для изменения в DB при обработке кнопки "Сохранить"
  const [moviesToChangeInDB, setMoviesToChangeInDB] = useState([]);

  // Сеансы для изменения в DB при обработке кнопки "Сохранить"
  const [sessionsToChangeInDB, setSessionsToChangeInDB] = useState([]);
  
  console.log({moviesToChangeInDB}, {sessionsToChangeInDB});

  // Фильмы для удаления в DB при обработке кнопки "Сохранить"
  const [moviesToDeleteInDB, setMoviesToDeleteInDB] = useState([]);

  // Сеансы для удаления в DB при обработке кнопки "Сохранить"
  const [sessionsToDeleteInDB, setSessionsToDeleteInDB] = useState([]);
  
  console.log({moviesToDeleteInDB}, {sessionsToDeleteInDB});



  // const [sessionInfo, setSessionInfo] = useState({});
  // console.log(sessionInfo);

  const [editedSessionId, setEditedSessionId] = useState('');

  // возмоность обновления сеансов
  const [edit, setEdit] = useState(true)

  // 'adding film popup', 'editing film popup', 'hide popup'
  // const [popupStatus, setPopupStatus] = useState('hide popup');

  // const handlePopupStatus = (status) => {
  //   setPopupStatus(status);
  //   console.log('popup state changed');    
  // }

  // 'Добавить фильм', 'Изменить фильм', 'popup is hidden'
  // const [popupTitle, setPopupTitle] = useState('popup is hidden');

  // popup states:
  // statuses: 'adding film popup', 'editing film popup', 'editing sessions' 'hide popup'
  // titles: 'Добавить фильм', 'Изменить фильм', 'Редактировать сеансы', 'popup is hidden'
  // isActive: true, false (показать / скрыть)
  const [popupInfo, setPopupInfo] = useState({
    status: 'hide popup',
    title: 'popup is hidden',
    isActive: false
  });

  console.log(popupInfo);


  const handlePopupStatus = (status, movie = {}) => {
    console.log(movie);
    console.log('popup status handler');
    Object.keys(movie).length !== 0 ? setMovieInfo({ ...movie }) : setMovieInfo({}); // проверка на пустой объект, который передаётся в handler
    // setMovieInfo({...movie}); // обновить состояние фильма: либо добавить фильм, либо сбросить пустым объектом
    if (status === 'adding film popup') {
      setPopupInfo({
        status: 'adding film popup',
        title: 'Добавить фильм',
        isActive: true
      })
    }
    if (status === 'editing film popup') {
      setPopupInfo({
        status: 'editing film popup',
        title: 'Изменить фильм',
        isActive: true
      })
    }
    if (status === 'editing sessions') {
      setPopupInfo({
        status: 'editing sessions',
        title: 'Редактировать сеансы',
        isActive: true
      })
    }
    if (status === 'hide popup') {
      setPopupInfo({
        status: 'hide popup',
        title: 'Попап неактивен',
        isActive: false
      })
    }
  }

  // const lastId = movies.length; // для добавления нового id в форме

  const handleClick = (e) => {
    console.log(e.currentTarget.className);
    // if (e.target.contains)
    if (e.currentTarget.classList.contains('conf-step__header')) {
      setIsActiveHeaderState(!isActiveHeaderState);
    }
    // setIsActiveHeaderState(!isActiveHeaderState);
  }

  // const handlePopup = (status) => {
  //   console.log('popup2!');
  //   setIsActivePopup(!isActivePopup);
  //   setPopupStatus(status);
  //   setMovieInfo({}); // сбросить информацию о выбранном фильме для добавления / закрытия формы
  //   // setPopupTitle('Добавить фильм');
  //   popupTitle === 'popup is hidden' ? setPopupTitle('Добавить фильм') : setPopupTitle('popup is hidden');
  // }

  // const handlePopup3 = (movie, status) => {
  //   console.log(movie);
  //   handlePopup(status);
  //   // setActiveMovie({...movie});
  //   setMovieInfo({ ...movie });
  //   // setIsActivePopup(!isActivePopup);
  //   setPopupTitle('Изменить фильм');
  // }

  const handleChange = (e) => {
    setMovieInfo({ ...movieInfo, [e.target.name]: e.target.value });
    console.log(e.target.value);
  }


  // 
  // 

  const handleChanges = (id, changeInfo, name) => {
    console.log({changeInfo, name});
    // setSessionsInfo([...sessionsInfo, [target]: changeInfo]);
    const session = sessionsInfo.find(session => session.id === id);
    console.log(session);

    let editedSession;

    if (name === "hall_id") {
      const editedHallId = halls.find(hall => hall.title === changeInfo).id;
      editedSession = {...session, [name]: editedHallId };
    } else {
      editedSession = {...session, [name]: changeInfo };
    }
    const editedSessions = sessionsInfo.map(session => {
      if (session.id === id) {
        return editedSession;
      } else {
        return session;
      }
    })

    setSessionsInfo(editedSessions);
    console.log(editedSessions);
  }

  // 
  // 

  const handleChangeData = (newData, id) => {
    // добавление сеанса
    if (Object.prototype.hasOwnProperty.call(newData, "time")) {      
      handleChangeSession(newData, id);
    } 
    // добавление фильма
    if (Object.prototype.hasOwnProperty.call(newData, "duration")) {
      handleChangeMovie(newData, id);
    }
  }

  const handleChangeSession = (newSession, id) => {
    const updatedSessions = sessionsInfo.map(session => {
      return session.id === id ? newSession : session
    })

    setSessionsInfo(updatedSessions);
    console.log(updatedSessions);
    console.log('сеанс обновлён'); 
    
    // подготовка для DB
    setSessionsToChangeInDB(sessionsToChangeInDB.concat(newSession));
  }

  const handleChangeMovie = (newMovie, id) => {
    const updatedMovies = moviesInfo.map(movie => {
      return movie.id === id ? newMovie : movie
    })

    setMoviesInfo(updatedMovies);
    console.log(updatedMovies);
    console.log('фильм обновлен');  
    
    // подготовка для DB
    setMoviesToChangeInDB(moviesToChangeInDB.concat(newMovie));
  }

  // const handleChangeData = (id, changeInfo, name, dataArray) => {
  //   console.log({changeInfo, name});
  //   const editedData = dataArray.find(data => data.id === id);
  //   console.log(editedData);

  //   // редактирование сеанса
  //   if (Object.prototype.hasOwnProperty.call(editedData, "time")) {
  //     handleChangeSession(editedData, name, changeInfo, id);
  //   }
  //   // редактирование фильма
  //   if (Object.prototype.hasOwnProperty.call(editedData, "duration")) {
  //     handleChangeMovie(editedData, name, changeInfo, id);
  //   }    
  // }

  // const handleChangeSession = (session, name, changeInfo, id) => {
  //   let editedSession;

  //   if (name === "hall_id") {
  //     const editedHallId = halls.find(hall => hall.title === changeInfo).id;
  //     editedSession = {...session, [name]: editedHallId };
  //   } else {
  //     editedSession = {...session, [name]: changeInfo };
  //   }
  //   const editedSessions = sessionsInfo.map(session => {
  //     if (session.id === id) {
  //       return editedSession;
  //     } else {
  //       return session;
  //     }
  //   })

  //   setSessionsInfo(editedSessions);
  //   console.log(editedSessions);
  // }

  // const handleChangeMovie = (movie, name, changeInfo, id) => {
  //   const editedMovie = {...movie, [name]: changeInfo };

  //   const editedMovies = moviesInfo.map(movie => {
  //     if (movie.id === id) {
  //       return editedMovie;
  //     } else {
  //       return movie;
  //     }
  //   })

  //   setMoviesInfo(editedMovies);
  //   console.log(editedMovies);
  // }

  // 
  // 

  // Универсальный колбэк onAddCallback + функции обновления массивов сущностей

  const handleAddData = (newData) => {
    // добавление сеанса
    if (Object.prototype.hasOwnProperty.call(newData, "time")) {      
      handleAddSession(newData);
    } 
    // добавление фильма
    if (Object.prototype.hasOwnProperty.call(newData, "duration")) {
      handleAddMovie(newData);
    }
  }

  const handleAddSession = (newSession) => {
    const updatedSessions = sessionsInfo.concat(newSession);
    // return updatedSessions;

    setSessionsInfo(updatedSessions);
    console.log(updatedSessions);
    console.log('сеанс добавлен'); 
    
    // подготовка для DB
    setSessionsToAddInDB(sessionsToAddInDB.concat(newSession));
  }

  const handleAddMovie = (newMovie) => {
    const updatedMovies = moviesInfo.concat(newMovie);
    // return updatedSessions;

    setMoviesInfo(updatedMovies);
    console.log(updatedMovies);
    console.log('фильм добавлен');
    
    // подготовка для DB
    setMoviesToAddInDB(moviesToAddInDB.concat(newMovie));
  }


  const handleDeleteData = (data) => {
    // удаление сеанса
    if (Object.prototype.hasOwnProperty.call(data, "time")) {      
      handleDeleteSession(data.id);
    } 
    // удаление фильма
    if (Object.prototype.hasOwnProperty.call(data, "duration")) {
      handleDeleteMovie(data.id);
    }
  }

  const handleDeleteSession = (sessionId) => {
    const updatedSessions = sessionsInfo.filter(session => session.id !== sessionId);

    setSessionsInfo(updatedSessions);
    console.log(updatedSessions);
    console.log('сеанс удалён'); 
    
    // подготовка для DB
    setSessionsToDeleteInDB(sessionsToDeleteInDB.concat(sessionId)); // массив Id
  }

  const handleDeleteMovie = (movieId) => {
    const updatedMovies = moviesInfo.filter(movie => movie.id !== movieId);

    setMoviesInfo(updatedMovies);
    console.log(updatedMovies);
    console.log('фильм удалён');

    // Также нужно удалить сеансы, связанные с этим фильмом (Laravel В помощь)
    const updatedSessions = sessionsInfo.filter(session => session.movie_id !== movieId);

    setSessionsInfo(updatedSessions);
    console.log(updatedSessions);
    console.log('удалены сеансы на конкретный удалённый фильм'); 

    
    // подготовка для DB
    setMoviesToDeleteInDB(moviesToDeleteInDB.concat(movieId));

    // найти Id связанных с фильмом сеансов и поместить в новый массив
    const sessionsToDelete = sessionsInfo.filter(session => session.movie_id === movieId)
    
    if (sessionsToDelete.length > 0) {
      setSessionsToDeleteInDB(sessionsToDeleteInDB.concat(sessionsToDelete.map(session => session.id)))
    }
  }

  // 
  // 

  const handleInput = (e) => {
    const session = sessionsInfo.find(session => session.id === editedSessionId);
    console.log(session);

    const editedSession = {...session, [e.target.name]: e.target.value };
    const editedSessions = sessionsInfo.map(session => {
      if (session.id === editedSessionId) {
        return editedSession;
      } else {
        return session;
      }
    })

    setSessionsInfo(editedSessions);
    console.log(sessionsInfo);   

    // setisDisabled(!isDisabled);
  }

  const handleSelect = (e) => {
    const session = sessionsInfo.find(session => session.id === editedSessionId);
    console.log(session);

    const editedSession = {...session, [e.target.name]: e.target.value };
    const editedSessions = sessionsInfo.map(session => {
      if (session.id === editedSessionId) {
        return editedSession;
      } else {
        return session;
      }
    })

    setSessionsInfo(editedSessions);
    console.log(sessionsInfo); 
    
    

    // setisDisabled(!isDisabled);
  }

  const handleEdit = (id) => {
    setEditedSessionId(id);
    console.log(editedSessionId);
    
    setEdit(!edit);
  }

  const handleDBUpdate = () => {
    // добавление в БД
    if (moviesToAddInDB.length > 0) {
      addDataToDB(moviesToAddInDB, '/movies');
      setMoviesToAddInDB([]);
    }
    if (sessionsToAddInDB.length > 0) {
      addDataToDB(sessionsToAddInDB, '/sessions');
      setSessionsToAddInDB([]);
    }

    // изменение сущностей в БД
    if (moviesToChangeInDB.length > 0) {
      changeDataInDB(moviesToChangeInDB, '/movies');
      setMoviesToChangeInDB([]);
    }
    if (sessionsToChangeInDB.length > 0) {
      changeDataInDB(sessionsToChangeInDB, '/sessions');
      setSessionsToChangeInDB([]);
    }

    // удаление сущностей в БД
    if (moviesToDeleteInDB.length > 0) {
      deleteDataInDB(moviesToDeleteInDB, '/movies');
      setMoviesToDeleteInDB([]);
    }
    if (sessionsToDeleteInDB.length > 0) {
      deleteDataInDB(sessionsToDeleteInDB, '/sessions');
      setSessionsToDeleteInDB([]);
    }

    // // сброс данных для подготовки к отправке в БД
    // setSessionsToAddInDB([]);
    // setMoviesToAddInDB([]);
    // setMoviesToChangeInDB([]);
    // setSessionsToChangeInDB([]);
  }

  const handleRefresh = () => {
    console.log('handleRefresh');
    
    // сброс состояний на первоначальные из БД
    setSessionsInfo([...sessions]);
    setMoviesInfo([...movies])

    // сброс данных для подготовки к отправке в БД
    setSessionsToAddInDB([]);
    setMoviesToAddInDB([]);
    setMoviesToChangeInDB([]);
    setSessionsToChangeInDB([]);
    setMoviesToDeleteInDB([]);
    setSessionsToDeleteInDB([]);

  }

  return (
    <section className="conf-step">

      
      {/* Резервный вариант */}
      {/* <Popup3
        popupInfo={popupInfo}
        lastId={lastId}
        movieInfo={movieInfo}
        handleChange={handleChange}
        handlePopup={handlePopupStatus}
      > */}
        {/* <PopupBase popupInfo={popupInfo} handlePopup={handlePopupStatus}>
        </PopupBase> */}
      {/* </Popup3> */}

      <Popup4
        popupInfo={popupInfo}
        // lastId={lastId}
        halls={hallsInfo}
        movies={moviesInfo}
        // sessions={sessions}
        sessions={sessionsInfo}
        // sessionId={sessionId}
        // movieInfo={movieInfo}
        handleInput={handleInput}
        // handleEdit={handleEdit}
        handleSelect={handleSelect}
        onChangeCallback={handleChangeData}
        onAddCallback={handleAddData}
        onDeleteCallback={handleDeleteData}
        editedElement={movieInfo}
        // edit={edit}
        // handleChange={handleChange}
        handlePopup={handlePopupStatus}
      >
        {/* <PopupBase popupInfo={popupInfo} handlePopup={handlePopupStatus}>
        </PopupBase> */}
      </Popup4>

      <SectionHeader name={'Сетка сеансов'} isActiveHeaderState={isActiveHeaderState} handleClick={handleClick} />

      <div className="conf-step__wrapper">
        {/* Рабочий вариант */}
        {/* <p className="conf-step__paragraph">
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
          */}
        <p className="conf-step__paragraph">
          <button className="conf-step__button conf-step__button-accent" onClick={() => handlePopupStatus('adding film popup')}>Добавить фильм</button>
        </p>

        <div className="conf-step__movies">
          {moviesInfo.map(movie => (
            <div key={movie.id} className="conf-step__movie" onClick={(e) => {
              console.log(window.getComputedStyle(e.currentTarget).backgroundColor);              
              handlePopupStatus('editing film popup', movie)}}>
              <img className="conf-step__movie-poster" alt="poster" src={poster} />
              <h3 className="conf-step__movie-title">{movie.title}</h3>
              <p className="conf-step__movie-duration">{movie.duration} минут</p>
            </div>
          )
          )}
        </div>

        <p className="conf-step__paragraph">
          <button className="conf-step__button conf-step__button-accent" onClick={() => handlePopupStatus('editing sessions')}>Редактировать сеансы</button>
        </p>

        <div className="conf-step__seances">
          {halls.map(hall => (
            <div key={hall.id} className="conf-step__seances-hall">
              <h3 className="conf-step__seances-title">{hall.title}</h3>
              <div className="conf-step__seances-timeline">
                {
                  // изначально sessions
                  sessionsInfo.map(session => (
                    // const duration = Number({session.duration});
                    // const sessionDurationWidth = 'calc(' + duration + '*' + '0.5)';
                    session.hall_id === hall.id ? (<div key={session.id} className="conf-step__seances-movie" style={
                      {
                        width: `calc(${session.duration}px * 0.5)`,
                        backgroundColor: 'rgb(133, 255, 137)',
                        // backgroundColor: `${window.getComputedStyle()}`
                        left: `calc((${session.time.slice(0, 2)} + ${session.time.slice(3)} / 60) * 720px / 24)`
                      }
                    }>
                      <p className="conf-step__seances-movie-title">{moviesInfo.find(movie => movie.id === session.movie_id).title}</p> {/* нужно будет скорректировать, пока работает только для индексов от 1 и так далее */}
                      <p className="conf-step__seances-movie-start">{session.time}</p>
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
        <SectionButtons handleRefresh={handleRefresh} handleDBUpdate={handleDBUpdate}/>
      </div>
    </section>
  )
}

export default SessionManager