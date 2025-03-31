import { useCallback, useState } from 'react';
import poster from '../img/admin/poster.png'
import SectionButtons from './SectionButtons'


import SectionHeader from './SectionHeader'
// import Popup from './Popup';
// import Popup2 from './Popup2';
import Popup3 from '../../reserve/popup-reserve/Popup3';
import PopupBase from './PopupBase';
import Popup4 from './Popup4';
import { addDataToDB, changeDataInDB, deleteDataInDB } from '../services/DBUpdater';
import SessionDates from './SessionDates';
import dayjs from "dayjs";
import { useDispatch, useSelector } from 'react-redux';
import { addFilm, editMovie, editSessions, hidePopup } from '../redux/slices/popupSlice';
import { setData, setToInitialData } from '../redux/slices/popupEditMovieHandlerSlice';


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


  // Сеансы на разные даты
  const now = dayjs();
  let days = [];
  
  for (let index = 0; index < 14; index++) {
    const day = now.add(index, 'day');
    days.push(day);
  }

  // console.log({days});
  // console.log(typeof days[0].format('YYYY-MM-DD'));

  // выбранная дата сеанса
  // const [checked, setChecked] = useState((sessions.length > 0) ? '2025-02-09' : undefined);
  const [date, setDate] = useState((sessions.length > 0) ? now.format('YYYY-MM-DD') : undefined);

  const handleChangeDate = (e) => {
    console.log(e.target.value);
    // setChecked(e.target.value);
    setDate(e.target.value);
  }

  // Выбранный фильм
  const [movieInfo, setMovieInfo] = useState({});
  console.log(movieInfo);

  // Сеансы
  const initialSessionsInfo = sessions.map(session => {
    return {
      id: session.id,
      movie_id: session.movie_id,
      hall_id: session.hall_id,
      date: session.date,
      time: session.time,
    }
  })
  const [sessionsInfo, setSessionsInfo] = useState(initialSessionsInfo);
  console.log({sessionsInfo});

  // Фильмы
  const initialMoviesInfo = movies.map(movie => {
    return {
      id: movie.id,
      title: movie.title,
      description: movie.description,
      duration: movie.duration,
      country: movie.country,
    }
  })
  const [moviesInfo, setMoviesInfo] = useState(initialMoviesInfo);
  console.log({moviesInfo});

  // Залы
  const initialHallsInfo = halls.map(hall => {
    return {
      id: hall.id,
      title: hall.title,
      rows: hall.rows,
      places: hall.places,
      normal_price: hall.normal_price,
      vip_price: hall.vip_price
    }
  })
  const [hallsInfo, setHallsInfo] = useState(initialHallsInfo);
  console.log({hallsInfo});

  // бэкграунд фильмов
  const [movieBackgroundColors, setMovieBackgroundColors] = useState([]);



  // Фильмы для добавления в DB при обработке кнопки "Сохранить"
  const [moviesToAddInDB, setMoviesToAddInDB] = useState([]);

  // Сеансы для добавления в DB при обработке кнопки "Сохранить"
  const [sessionsToAddInDB, setSessionsToAddInDB] = useState([]);

  console.log({ moviesToAddInDB }, { sessionsToAddInDB });

  // Фильмы для изменения в DB при обработке кнопки "Сохранить"
  const [moviesToChangeInDB, setMoviesToChangeInDB] = useState([]);

  // Сеансы для изменения в DB при обработке кнопки "Сохранить"
  const [sessionsToChangeInDB, setSessionsToChangeInDB] = useState([]);

  console.log({ moviesToChangeInDB }, { sessionsToChangeInDB });

  // Фильмы для удаления в DB при обработке кнопки "Сохранить"
  const [moviesToDeleteInDB, setMoviesToDeleteInDB] = useState([]);

  // Сеансы для удаления в DB при обработке кнопки "Сохранить"
  const [sessionsToDeleteInDB, setSessionsToDeleteInDB] = useState([]);

  console.log({ moviesToDeleteInDB }, { sessionsToDeleteInDB });



  // const [sessionInfo, setSessionInfo] = useState({});
  // console.log(sessionInfo);

  const [editedSessionId, setEditedSessionId] = useState('');

  // возможность обновления сеансов
  const [edit, setEdit] = useState(true);

  // popup states:
  // statuses: 'adding film popup', 'editing film popup', 'editing sessions' 'hide popup'
  // titles: 'Добавить фильм', 'Изменить фильм', 'Редактировать сеансы', 'popup is hidden'
  // isActive: true, false (показать / скрыть)

  // const [popupInfo, setPopupInfo] = useState({
  //   status: 'hide popup',
  //   title: 'popup is hidden',
  //   isActive: false
  // });

  // console.log(popupInfo);

  // popupInfoRedux
  const popupInfoRedux = useSelector(state => state.popupInfoReducer.popupInfo)
  console.log({popupInfoRedux});

  const dispatch = useDispatch();

  const addFilmCallback = useCallback(() => dispatch(addFilm()), []);
  const editMovieCallback = useCallback((movie) => {
    dispatch(editMovie());
    dispatch(setData(movie));
  }, []);
  const editSessionsCallback = useCallback(() => dispatch(editSessions()), []);
  const hidePopupCallback = useCallback(() => dispatch(hidePopup()), []);

  const handlePopupStatus = (status, movie = {}) => {
    console.log(movie);
    console.log('popup status handler');
    Object.keys(movie).length !== 0 ? setMovieInfo({ ...movie }) : setMovieInfo({}); // проверка на пустой объект, который передаётся в handler
    // setMovieInfo({...movie}); // обновить состояние фильма: либо добавить фильм, либо сбросить пустым объектом
    if (status === 'adding film popup') {
      // addFilmCallback();
      dispatch(addFilm());
    }
    if (status === 'editing film popup') {
      editMovieCallback(movie);
      // dispatch(editMovie());
    }
    if (status === 'editing sessions') {
      // editSessionsCallback();
      dispatch(editSessions());
    }
    if (status === 'hide popup') {
      // hidePopupCallback();
      dispatch(hidePopup());
      dispatch(setToInitialData()); // сбросить редактируемый фильмпри закрытии окна
    }
  }

  // const handlePopupStatus = (status, movie = {}) => {
  //   console.log(movie);
  //   console.log('popup status handler');
  //   Object.keys(movie).length !== 0 ? setMovieInfo({ ...movie }) : setMovieInfo({}); // проверка на пустой объект, который передаётся в handler
  //   // setMovieInfo({...movie}); // обновить состояние фильма: либо добавить фильм, либо сбросить пустым объектом
  //   if (status === 'adding film popup') {
  //     setPopupInfo({
  //       status: 'adding film popup',
  //       title: 'Добавить фильм',
  //       isActive: true
  //     })

  //     // addFilmCallback();
  //     dispatch(addFilm());
  //   }
  //   if (status === 'editing film popup') {
  //     setPopupInfo({
  //       status: 'editing film popup',
  //       title: 'Изменить фильм',
  //       isActive: true
  //     })

  //     // editMovieCallback();
  //     dispatch(editMovie());
  //   }
  //   if (status === 'editing sessions') {
  //     setPopupInfo({
  //       status: 'editing sessions',
  //       title: 'Редактировать сеансы',
  //       isActive: true
  //     })

  //     // editSessionsCallback();
  //     dispatch(editSessions());
  //   }
  //   if (status === 'hide popup') {
  //     setPopupInfo({
  //       status: 'hide popup',
  //       title: 'Попап неактивен',
  //       isActive: false
  //     })

  //     // hidePopupCallback();
  //     dispatch(hidePopup());
  //   }
  // }

  // const lastId = movies.length; // для добавления нового id в форме



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



  // const handleChange = (e) => {
  //   setMovieInfo({ ...movieInfo, [e.target.name]: e.target.value });
  //   console.log(e.target.value);
  // }


  // 
  // 

  // const handleChanges = (id, changeInfo, name) => {
  //   console.log({ changeInfo, name });
  //   // setSessionsInfo([...sessionsInfo, [target]: changeInfo]);
  //   const session = sessionsInfo.find(session => session.id === id);
  //   console.log(session);

  //   let editedSession;

  //   if (name === "hall_id") {
  //     const editedHallId = halls.find(hall => hall.title === changeInfo).id;
  //     editedSession = { ...session, [name]: editedHallId };
  //   } else {
  //     editedSession = { ...session, [name]: changeInfo };
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
    // если уже проводились изменения -> не добавлять в массив для отправки в БД
    if (sessionsToChangeInDB.find(session => session.id === newSession.id)) {
      const filtredSessions = sessionsToChangeInDB.filter(session => session.id !== newSession.id);
      setSessionsToChangeInDB(filtredSessions.concat(newSession));
    } else {
      setSessionsToChangeInDB(sessionsToChangeInDB.concat(newSession));
    }
    // setSessionsToChangeInDB(sessionsToChangeInDB.concat(newSession));

    // Обновить данные в массиве для добавления (при изменении ранее добавленного элемента + убрать из массива изменения данных в БД)
    if (sessionsToAddInDB.find(session => session.id === newSession.id)) {
      const filtredSessionsToAdd = sessionsToAddInDB.filter(session => session.id !== newSession.id);
      setSessionsToAddInDB(filtredSessionsToAdd.concat(newSession));

      const filtredSessionsToChange = sessionsToChangeInDB.filter(session => session.id !== newSession.id);
      setSessionsToChangeInDB(filtredSessionsToChange);
    }
  }

  const handleChangeMovie = (newMovie, id) => {
    const updatedMovies = moviesInfo.map(movie => {
      return movie.id === id ? newMovie : movie
    })

    setMoviesInfo(updatedMovies);
    console.log(updatedMovies);
    console.log('фильм обновлен');

    // подготовка для DB
    // если уже проводились изменения -> не добавлять в массив для отправки в БД
    if (moviesToChangeInDB.find(movie => movie.id === newMovie.id)) {
      const filtredmovies = moviesToChangeInDB.filter(movie => movie.id !== newMovie.id);
      setMoviesToChangeInDB(filtredmovies.concat(newMovie));
    } else {
      setMoviesToChangeInDB(moviesToChangeInDB.concat(newMovie));
    }
    // setMoviesToChangeInDB(moviesToChangeInDB.concat(newMovie));

    // Обновить данные в массиве для добавления (при изменении ранее добавленного элемента + убрать из массива изменения данных в БД)
    if (moviesToAddInDB.find(movie => movie.id === newMovie.id)) {
      const filtredMoviesToAdd = moviesToAddInDB.filter(movie => movie.id !== newMovie.id);
      setMoviesToAddInDB(filtredMoviesToAdd.concat(newMovie));

      const filtredMoviesToChange = moviesToChangeInDB.filter(movie => movie.id !== newMovie.id);
      setMoviesToChangeInDB(filtredMoviesToChange);
    }
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

    // Если удаленный элемент был добавлен/изменён ранее => удалить из данных для отправки на сервер
    const sessionsToChange = sessionsToChangeInDB.filter(session => session.id !== sessionId);
    setSessionsToChangeInDB(sessionsToChange);
    const sessionsToAdd = sessionsToAddInDB.filter(session => session.id !== sessionId);
    setSessionsToAddInDB(sessionsToAdd);

    // подготовка для DB
    // Если изменены элементы, сохраненные в БД, удаляются
    if (sessions.find(session => session.id == sessionId)) {
      setSessionsToDeleteInDB(sessionsToDeleteInDB.concat(sessionId)); // массив Id
    }
    // setSessionsToDeleteInDB(sessionsToDeleteInDB.concat(sessionId)); // массив Id
  }

  const handleDeleteMovie = (movieId) => {
    const updatedMovies = moviesInfo.filter(movie => movie.id !== movieId);

    setMoviesInfo(updatedMovies);
    console.log(updatedMovies);
    console.log('фильм удалён');

    // Если удаленный элемент был добавлен/изменён ранее => удалить из данных для отправки на сервер
    const moviesToChange = moviesToChangeInDB.filter(movie => movie.id !== movieId);
    setMoviesToChangeInDB(moviesToChange);
    const moviesToAdd = moviesToAddInDB.filter(movie => movie.id !== movieId);
    setMoviesToAddInDB(moviesToAdd);



    // Также нужно удалить сеансы, связанные с этим фильмом
    const updatedSessions = sessionsInfo.filter(session => session.movie_id !== movieId);

    setSessionsInfo(updatedSessions);
    console.log(updatedSessions);
    console.log('удалены сеансы на конкретный удалённый фильм');


    // // подготовка для DB
    // setMoviesToDeleteInDB(moviesToDeleteInDB.concat(movieId));
    // подготовка для DB
    // Если изменены элементы, сохраненные в БД
    if (movies.find(movie => movie.id == movieId)) {
      setMoviesToDeleteInDB(moviesToDeleteInDB.concat(movieId)); // массив Id
    }

    // найти Id связанных с фильмом сеансов и поместить в новый массив
    
    // Удалить связаннные с фильмом сеансы из массивов для передачи в БД
    const sessionsToChange = sessionsToChangeInDB.filter(session => session.movie_id !== movieId)
    setSessionsToChangeInDB(sessionsToChange);
    const sessionsToAdd = sessionsToAddInDB.filter(session => session.movie_id !== movieId)
    setSessionsToAddInDB(sessionsToAdd);

    // IDs для удаления (только для уже сохраненных в БД фильмов, сеансы удалятся каскадно в Laravel)

    // const sessionsToDelete = sessions.filter(session => session.movie_id === movieId);
    // const sessionsToDeleteIds = sessionsToDelete.map(session => session.id);

    // let updatedSessionsToDeleteInDB = [];
    // if (sessionsToDeleteIds.length > 0) {
    //   sessionsToDeleteIds.forEach(element => {
    //     let id = sessionsToDeleteInDB.filter(id => id === element)
    //   })
    // }

    // if (sessionsToDelete.length > 0) {
    //   setSessionsToDeleteInDB(sessionsToDeleteInDB.concat(sessionsToDelete.map(session => session.id)))
    // }

    const sessionsToDelete = sessions.filter(session => session.movie_id === movieId);

    if (sessionsToDelete.length > 0) {
      setSessionsToDeleteInDB(sessionsToDeleteInDB.concat(sessionsToDelete.map(session => session.id)))
    }
  }

  // 
  // 

  const handleInput = (e) => {
    const session = sessionsInfo.find(session => session.id === editedSessionId);
    console.log(session);

    const editedSession = { ...session, [e.target.name]: e.target.value };
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

    const editedSession = { ...session, [e.target.name]: e.target.value };
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

  const handleDBUpdate = async (e) => {
    e.preventDefault();
    console.log({ moviesToAddInDB });

    // добавление в БД
    if (moviesToAddInDB.length > 0) {
      await addDataToDB(moviesToAddInDB, 'api/movies');
      setMoviesToAddInDB([]);
    }
    if (sessionsToAddInDB.length > 0) {
      await addDataToDB(sessionsToAddInDB, 'api/sessions');
      setSessionsToAddInDB([]);
    }

    // изменение сущностей в БД
    if (moviesToChangeInDB.length > 0) {
      await changeDataInDB(moviesToChangeInDB, 'api/movies');
      setMoviesToChangeInDB([]);
    }
    if (sessionsToChangeInDB.length > 0) {
      await changeDataInDB(sessionsToChangeInDB, 'api/sessions');
      setSessionsToChangeInDB([]);
    }

    // удаление сущностей в БД
    if (moviesToDeleteInDB.length > 0) {
      await deleteDataInDB(moviesToDeleteInDB, 'api/movies');
      setMoviesToDeleteInDB([]);
    }
    if (sessionsToDeleteInDB.length > 0) {
      await deleteDataInDB(sessionsToDeleteInDB, 'api/sessions');
      setSessionsToDeleteInDB([]);
    }

    // // сброс данных для подготовки к отправке в БД
    // setSessionsToAddInDB([]);
    // setMoviesToAddInDB([]);
    // setMoviesToChangeInDB([]);
    // setSessionsToChangeInDB([]);
  }

  const handleDBUpdate2 = () => {
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
      <Popup4
        popupInfo={popupInfoRedux}
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

        {/* <div className="conf-step__movies">
          {moviesInfo.map(movie => (            
            <div key={movie.id} className="conf-step__movie" onClick={(e) => {
              console.log(window.getComputedStyle(e.currentTarget).backgroundColor);
              handlePopupStatus('editing film popup', movie)
            }}>
              <img className="conf-step__movie-poster" alt="poster" src={poster} />
              <h3 className="conf-step__movie-title">{movie.title}</h3>
              <p className="conf-step__movie-duration">{movie.duration} минут</p>
            </div>
          )
          )}
        </div> */}

        <div className="conf-step__movies">
          {moviesInfo.map(movie => {                 
            const movieCard = <div key={movie.id} className="conf-step__movie" onClick={(e) => {
              console.log(window.getComputedStyle(e.currentTarget).backgroundColor);
              handlePopupStatus('editing film popup', movie)
            }}>
              <img className="conf-step__movie-poster" alt="poster" src={poster} />
              <h3 className="conf-step__movie-title">{movie.title}</h3>
              <p className="conf-step__movie-duration">{movie.duration} минут</p>
            </div>

            // console.log(window.getComputedStyle(movieCard).backgroundColor);            
            
            return movieCard;
            }
          )}
        </div>

        <p className="conf-step__paragraph">
          <button className="conf-step__button conf-step__button-accent" onClick={() => handlePopupStatus('editing sessions')}>Редактировать сеансы</button>
        </p>

        {/* переключатели дат */}
        <p className="conf-step__paragraph">Выберите дату сеансов для конфигурации:</p>
        <SessionDates days={days} handleChangeDate={handleChangeDate} date={date} />

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
                    session.hall_id === hall.id && session.date === date ? (<div key={session.id} className="conf-step__seances-movie" style={
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
        <SectionButtons handleRefresh={handleRefresh} handleDBUpdate={handleDBUpdate} />
      </div>
    </section>
  )
}

export default SessionManager