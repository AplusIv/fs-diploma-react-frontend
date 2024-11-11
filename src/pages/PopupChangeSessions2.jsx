import { useState } from "react";
import PopupChangeSessions from "./PopupChangeSessions";
import PopupSelect from "./PopupSelect";
import PopupNewDataAdding2 from "./PopupNewDataAdding2";
import PopupChangeSession from "./PopupChangeSession";


const PopupChangeSessions2 = ({ movies, sessions, halls, lastSessionId, onChangeCallback, onAddCallback, onDeleteCallback }) => {
  // Выбранный фильм
  // let initialSelectedMovieTitle;
  // movies.length > 0 ? initialSelectedMovieTitle = movies[0].title : null;
  const initialSelectedMovieTitle = movies[0].title;
  const [selectedMovieTitle, setSelectedMovieTitle] = useState(initialSelectedMovieTitle);

  const handleSelectedMovieTitle = (value, name) => {
    console.log(name, value);
    setSelectedMovieTitle(value);
    setSelectedIndex(undefined); // сброс активного редактирования сеанса при смене фильма
  }

  const filtredSessions = sessions.filter(session => session.movie_id === movies.find(movie => movie.title === selectedMovieTitle).id)


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
        Выберете фильм (Новый селект):{' '}
        <PopupSelect
          initialValue={selectedMovieTitle}
          // defaultValue={movies[0].title}
          optionsData={movies}
          name="movie-title"
          edit={true}
          onChangeCallback={handleSelectedMovieTitle} />
      </label>

      <label>
        Текущие сеансы (новое):
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
            id: `${++lastSessionId}`,
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