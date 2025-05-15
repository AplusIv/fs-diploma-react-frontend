/* eslint-disable react/prop-types */
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setHall, setMovie, setPlacesByHall, setSession } from "../../redux/slices/buyingSlice";

const MovieSessions = ({ movie, halls, sessions, places }) => {
  // console.log(sessions);
  // console.log(movie);
  // const filtredSessionsByMovie = sessions.filter(session => {
  //   session.movie_id === movie.id;
  //   console.log(session.movie_id === movie.id);});
  // const filtredSessionsByMovie = sessions.filter(session => session.movie_id === movie.id);
  // console.log(filtredSessionsByMovie);

  const dispatch = useDispatch();

  const handleBuy = ({
    movie,
    hall,
    session,
    places,
  }) => {
    dispatch(setMovie(movie));
    dispatch(setHall(hall));
    dispatch(setSession(session));
    dispatch(setPlacesByHall(places));
  }
  
  return (
    <>
      {halls.map(hall => (
        sessions.find(session => session.hall_id === hall.id) ?
          <div key={hall.id} className="movie-seances__hall">
            <h3 className="movie-seances__hall-title">{hall.title}</h3>
            <ul className="movie-seances__list">
              {sessions.map(session=> (                
                hall.id === session.hall_id ? 
                <li key={session.id} className="movie-seances__time-block">
                  {/* <a className="movie-seances__time" href="booking">{session.time}</a> */}
                  <Link 
                    to="../buying" 
                    className="movie-seances__time" 
                    state={{movie, hall, session, places: places.filter(place => place.hall_id === hall.id)}} 
                    onClick={(e) => {
                    // e.preventDefault();
                    handleBuy({
                      movie, 
                      hall, 
                      session, 
                      places: places.filter(place => place.hall_id === hall.id),
                    })}}>
                    {session.time}
                  </Link>

                  {/* <Link to="../../../buying" relative="path" className="movie-seances__time" state={{movie, hall, session, places: places.filter(place => place.hall_id === hall.id), tickets}}>{session.time}</Link> */}
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