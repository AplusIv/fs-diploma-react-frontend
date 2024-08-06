/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const MovieSessions = ({ movie, halls, sessions }) => {
  // console.log(sessions);
  // console.log(movie);
  // const filtredSessionsByMovie = sessions.filter(session => {
  //   session.movie_id === movie.id;
  //   console.log(session.movie_id === movie.id);});
  const filtredSessionsByMovie = sessions.filter(session => session.movie_id === movie.id);
  console.log(filtredSessionsByMovie);
  
  return (
    <>
      {halls.map(hall => (
        filtredSessionsByMovie.find(session => session.hall_id === hall.id) ?
          <div key={hall.id} className="movie-seances__hall">
            <h3 className="movie-seances__hall-title">{hall.title}</h3>
            <ul className="movie-seances__list">
              {filtredSessionsByMovie.map(session=> (
                hall.id === session.hall_id ? 
                <li key={session.id} className="movie-seances__time-block">
                  {/* <a className="movie-seances__time" href="booking">{session.time}</a> */}
                  <Link to="../buying" relative="path" className="movie-seances__time" state={{movie, hall, session}}>{session.time}</Link>
                </li> : null
              ))}
            </ul>
          </div> : null
    ))}
    </>
    // Добавить сортировку сеансов по возрастанию времени
  )
}

export default MovieSessions