import { Outlet, useLoaderData } from 'react-router-dom';

import poster1 from '../../img/client/poster1.jpg';
import poster2 from '../../img/client/poster2.jpg';
import PageNavigator from './PageNavigator';
import MovieList from './MovieList';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
// import { getHalls } from '../../redux/slices/hallSlice';
// import { getPlaces } from '../../redux/slices/placeSlice';
// import { getMovies } from '../../redux/slices/movieSlice';

import { getHalls } from '../../redux/slices/guestHallSlice';
import { getMovies } from '../../redux/slices/guestMovieSlice';
import { getPlaces } from '../../redux/slices/guestPlaceSlice';



const Index = () => {
  // const { halls, movies, sessions, places, tickets } = useLoaderData();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Client index page effect is on');

    dispatch(getHalls()); // загрузка залов для гостя (неавторизованного пользователя)
    dispatch(getMovies()); // загрузка фильмов для гостя (неавторизованного пользователя)
    dispatch(getPlaces()); // загрузка зрительских мест для гостя (неавторизованного пользователя)


    // dispatch(getHalls()); // загрузка залов
    // dispatch(getPlaces()); // загрузка зрительских мест
    // dispatch(getMovies()); // загрузка фильмов
    // dispatch(getTickets());

    // dispatch(getSessions()); // загрузка сеансов


    // setLoadingStatus('loaded');
  }, []);

  return (
    <>
      <PageNavigator />
      <MovieList />  
      {/* <MovieList halls={halls} sessions={sessions} movies={movies} places={places} tickets={tickets} />   */}
    </>
  )
}

export default Index