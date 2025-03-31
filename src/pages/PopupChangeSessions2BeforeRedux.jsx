import { useState } from "react";
import PopupChangeSessions from "../../reserve/PopupChangeSessions";
import PopupSelect from "./PopupSelect";
import PopupNewDataAdding2 from "./PopupNewDataAdding2";
import PopupChangeSession from "./PopupChangeSession";

import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat' // ES 2015
dayjs.extend(customParseFormat);

import { useDispatch, useSelector } from "react-redux";



const PopupChangeSessions2 = ({ movies, sessions, halls, lastSessionId, onChangeCallback, onAddCallback, onDeleteCallback }) => {
  // Выбранный фильм
  // let initialSelectedMovieTitle;
  // movies.length > 0 ? initialSelectedMovieTitle = movies[0].title : null;
  const initialSelectedMovieTitle = (movies.length > 0) ? movies[0].title : undefined;
  const [selectedMovieTitle, setSelectedMovieTitle] = useState(initialSelectedMovieTitle);

  const handleSelectedMovieTitle = (value, name) => {
    console.log(name, value);
    setSelectedMovieTitle(value);
    setSelectedIndex(undefined); // сброс активного редактирования сеанса при смене фильма
  }

  const compareFnByDateAssending = (a, b) => {
    const dateTimestamp = dayjs(a.date).diff(dayjs(b.date));

    if (dateTimestamp < 0) {
      return -1
    } else if (dateTimestamp > 0) {
      return 1
    }
    // a === b
    return dayjs(a.time, 'HH:mm').diff(dayjs(b.time, 'HH:mm')); // сортировка по столбцу "время" (возврат разницы в миллисекундах )
}

  const filtredSessions = sessions.filter(session => session.movie_id === movies.find(movie => movie.title === selectedMovieTitle).id);
  filtredSessions.sort(compareFnByDateAssending); // сортировать массив по столбцам "дата" и "время" по возрастанию

  /* // redux edited sessions state
  const sessionsRedux = useSelector(state => state.popupEditSessionsReducer.popupEditSessionsData);
  const selectedMovieRedux = useSelector(state => state.popupEditSessionsReducer.popupSelectedMovieTitle);
  console.log({ selectedMovieRedux, sessionsRedux }); */


  // console.log({filtredSessions});
  // console.log(dayjs('22:24', 'HH:mm').diff(dayjs('22:56', 'HH:mm')));
  // console.log(dayjs('00:24', 'HH:mm'));  
  // const compareFnByDateAssending = (a, b) => dayjs(a.date).diff(dayjs(b.date)); // возврат разницы в миллисекундах сортировка объектов по возрастанию
   

  // добавить/отменить добавление сеанса
  const [isAdding, setIsAdding] = useState(false);

  // редактирование определенного сеанса
  const [selectedIndex, setSelectedIndex] = useState(undefined);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
    
  }

  return (
    <div className="session-popup">
      <label>
        Выберете фильм:{' '}
        <PopupSelect
          initialValue={selectedMovieTitle}
          // defaultValue={movies[0].title}
          optionsData={movies}
          name="movie-title"
          edit={true}
          onChangeCallback={handleSelectedMovieTitle} 
          movies={movies} 
          sessions={sessions}
          />
      </label>

      <label>
        Текущие сеансы:
        {/* <PopupChangeSessions
          // selectedMovieTitle={selectedMovieTitle}
          // sessions={sessions}
          // movies={movies}
          sessionsByMovie={filtredSessions}
          halls={halls}
          onChangeCallback={onChangeCallback}
          /> */}
        {filtredSessions.length > 0 ?
        <ul className="all-sessions">
          {filtredSessions.map((session, index) =>
            <PopupChangeSession
              key={session.id}
              editedElement={session}
              halls={halls}
              selectedIndex={index}
              setSelectedIndex={setSelectedIndex}
              isEdit={selectedIndex === index}
              // handleSelect={handleSelect} 
              // handleInput={handleInput}
              onChangeCallback={onChangeCallback}
              onDeleteCallback={onDeleteCallback}
              // handleSubmit={handleSubmit}
            // handlePopup={handlePopup}
            // handleEdit={handleEdit}
            />
          )}
        </ul>
        : <div>Сеансы на выбранный фильм отсутствуют</div>}
        {/* <ul className="all-sessions">
        {filtredSessions.map(session =>
          <PopupChangeSessionsForm
            key={session.id}
            editedElement={session}
            halls={halls}
            // handleSelect={handleSelect} 
            // handleInput={handleInput}
            onChangeCallback={onChangeCallback}
          // handlePopup={handlePopup}
          // handleEdit={handleEdit}
          />
        )}
      </ul> */}
      </label>

      <div>
        {isAdding ?
          <button
            className="conf-step__button conf-step__button-accent"
            onClick={() => setIsAdding(!isAdding)}>Отменить добавление сеанса</button>
          : <button
            className="conf-step__button conf-step__button-accent"
            onClick={() => setIsAdding(!isAdding)}>Добавить сеанс</button>}
      </div>

      {isAdding && <PopupNewDataAdding2
        initialItem={
          {
            id: ++lastSessionId,
            movie_id: movies[0].id,
            hall_id: halls[0].id,
            date: "25.06.2024"
          }}
        halls={halls}
        movies={movies}
        buttonTitle={'Подтвердить'}
        onAddCallback={onAddCallback}
        setAdding={setIsAdding}
      />}
      
      <p className="conf-step__paragraph">
        <button className="conf-step__button conf-step__button-accent">Подтвердить изменения</button>
      </p>
    </div>
  )
}

export default PopupChangeSessions2