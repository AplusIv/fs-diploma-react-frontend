import poster1 from '../../img/client/poster1.jpg';
import poster2 from '../../img/client/poster2.jpg'
import MovieInfo from './MovieInfo';
import MovieSessions from './MovieSessions';


const MovieList = ({ halls, movies, sessions }) => {
  // console.log(sessions);
  // console.log(movies);
  return (
    <main>
      {movies.map(movie => (
        <section key={movie.id} className="movie">
          <MovieInfo movie={movie} poster={poster1} />
          <MovieSessions movie={movie} halls={halls} sessions={sessions} />
        </section>
      ))}
      <section className="movie">
        <div className="movie__info">
          <div className="movie__poster">
            <img className="movie__poster-image" alt="Звёздные войны постер" src={poster1}/>
          </div>
          <div className="movie__description">
            <h2 className="movie__title">Звёздные войны XXIII: Атака клонированных клонов</h2>
            <p className="movie__synopsis">Две сотни лет назад малороссийские хутора разоряла шайка нехристей-ляхов во главе с могущественным колдуном.</p>
            <p className="movie__data">
              <span className="movie__data-duration">130 минут</span>
              <span className="movie__data-origin">США</span>
            </p>
          </div>
        </div>  
        
        <div className="movie-seances__hall">
          <h3 className="movie-seances__hall-title">Зал 1</h3>
          <ul className="movie-seances__list">
            <li className="movie-seances__time-block"><a className="movie-seances__time" href="hall.html">10:20</a></li>
            <li className="movie-seances__time-block"><a className="movie-seances__time" href="hall.html">14:10</a></li>
            <li className="movie-seances__time-block"><a className="movie-seances__time" href="hall.html">18:40</a></li>
            <li className="movie-seances__time-block"><a className="movie-seances__time" href="hall.html">22:00</a></li>
          </ul>
        </div>
        <div className="movie-seances__hall">
          <h3 className="movie-seances__hall-title">Зал 2</h3>
          <ul className="movie-seances__list">
            <li className="movie-seances__time-block"><a className="movie-seances__time" href="hall.html">11:15</a></li>
            <li className="movie-seances__time-block"><a className="movie-seances__time" href="hall.html">14:40</a></li>
            <li className="movie-seances__time-block"><a className="movie-seances__time" href="hall.html">16:00</a></li>
            <li className="movie-seances__time-block"><a className="movie-seances__time" href="hall.html">18:30</a></li>
            <li className="movie-seances__time-block"><a className="movie-seances__time" href="hall.html">21:00</a></li>
            <li className="movie-seances__time-block"><a className="movie-seances__time" href="hall.html">23:30</a></li>     
          </ul>
        </div>      
      </section>
      
      <section className="movie">
        <div className="movie__info">      
          <div className="movie__poster">
            <img className="movie__poster-image" alt="Альфа постер" src={poster2}/>
          </div>
          <div className="movie__description">        
            <h2 className="movie__title">Альфа</h2>
            <p className="movie__synopsis">20 тысяч лет назад Земля была холодным и неуютным местом, в котором смерть подстерегала человека на каждом шагу.</p>
            <p className="movie__data">
              <span className="movie__data-duration">96 минут</span>
              <span className="movie__data-origin">Франция</span>
            </p>
          </div>    
        </div>  
        <div className="movie-seances__hall">
          <h3 className="movie-seances__hall-title">Зал 1</h3>
          <ul className="movie-seances__list">
            <li className="movie-seances__time-block"><a className="movie-seances__time" href="hall.html">10:20</a></li>
            <li className="movie-seances__time-block"><a className="movie-seances__time" href="hall.html">14:10</a></li>
            <li className="movie-seances__time-block"><a className="movie-seances__time" href="hall.html">18:40</a></li>
            <li className="movie-seances__time-block"><a className="movie-seances__time" href="hall.html">22:00</a></li>
          </ul>
        </div>
        <div className="movie-seances__hall">
          <h3 className="movie-seances__hall-title">Зал 2</h3>
          <ul className="movie-seances__list">
            <li className="movie-seances__time-block"><a className="movie-seances__time" href="hall.html">11:15</a></li>
            <li className="movie-seances__time-block"><a className="movie-seances__time" href="hall.html">14:40</a></li>
            <li className="movie-seances__time-block"><a className="movie-seances__time" href="hall.html">16:00</a></li>
            <li className="movie-seances__time-block"><a className="movie-seances__time" href="hall.html">18:30</a></li>
            <li className="movie-seances__time-block"><a className="movie-seances__time" href="hall.html">21:00</a></li>
            <li className="movie-seances__time-block"><a className="movie-seances__time" href="hall.html">23:30</a></li>     
          </ul>
        </div>      
      </section>   
      
      <section className="movie">
        <div className="movie__info">      
          <div className="movie__poster">
            <img className="movie__poster-image" alt="Хищник постер" src={poster2}/>
          </div>
          <div className="movie__description">        
            <h2 className="movie__title">Хищник</h2>
            <p className="movie__synopsis">Самые опасные хищники Вселенной, прибыв из глубин космоса, высаживаются на улицах маленького городка, чтобы начать свою кровавую охоту. Генетически модернизировав себя с помощью ДНК других видов, охотники стали ещё сильнее, умнее и беспощаднее.</p>
            <p className="movie__data">
              <span className="movie__data-duration">101 минута</span>
              <span className="movie__data-origin">Канада, США</span>
            </p>
          </div>    
        </div>  
        <div className="movie-seances__hall">
          <h3 className="movie-seances__hall-title">Зал 1</h3>
          <ul className="movie-seances__list">
            <li className="movie-seances__time-block"><a className="movie-seances__time" href="hall.html">09:00</a></li>
            <li className="movie-seances__time-block"><a className="movie-seances__time" href="hall.html">10:10</a></li>
            <li className="movie-seances__time-block"><a className="movie-seances__time" href="hall.html">12:55</a></li>
            <li className="movie-seances__time-block"><a className="movie-seances__time" href="hall.html">14:15</a></li>
            <li className="movie-seances__time-block"><a className="movie-seances__time" href="hall.html">14:50</a></li>
            <li className="movie-seances__time-block"><a className="movie-seances__time" href="hall.html">16:30</a></li>
            <li className="movie-seances__time-block"><a className="movie-seances__time" href="hall.html">18:00</a></li>
            <li className="movie-seances__time-block"><a className="movie-seances__time" href="hall.html">18:50</a></li>
            <li className="movie-seances__time-block"><a className="movie-seances__time" href="hall.html">19:50</a></li>
            <li className="movie-seances__time-block"><a className="movie-seances__time" href="hall.html">20:55</a></li>
            <li className="movie-seances__time-block"><a className="movie-seances__time" href="hall.html">22:00</a></li>
          </ul>
        </div>     
      </section>     
    </main>
  )
}

export default MovieList