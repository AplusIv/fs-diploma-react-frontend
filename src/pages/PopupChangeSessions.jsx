import { useState } from "react";
import PopupChangeSession from "./PopupChangeSession";

const PopupChangeSessions = ({ sessionsByMovie, halls, onChangeCallback, selectedMovieTitle, sessions, movies }) => {
  // const filtredSessions = sessions.filter(session => session.movie_id === movies.find(movie => movie.title === selectedMovieTitle).id)


  // // редактирование определенного сеанса
  // const [selectedIndex, setSelectedIndex] = useState(undefined);

  const handleSubmit = (e, editFn, handleDataFn) => {
    e.preventDefault();
    console.log('submit');
    // editFn(!edit);
    // handleDataFn();
  }
  return (
    sessionsByMovie.length > 0 ? 
      <ul className="all-sessions">
        {sessionsByMovie.map((session, index) =>
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
            handleSubmit={handleSubmit}
          // handlePopup={handlePopup}
          // handleEdit={handleEdit}
          />
        )}
      </ul>
     : <div>Сеансы на выбранный фильм отсутствуют</div>
  )
}

export default PopupChangeSessions