import { useLoaderData } from 'react-router-dom';

import poster1 from '../../img/client/poster1.jpg';
import poster2 from '../../img/client/poster2.jpg';
import PageNavigator from './PageNavigator';
import MovieList from './MovieList';


const Index = () => {
  const { halls, movies, sessions, places } = useLoaderData();
  return (
    <>
      <PageNavigator />
      <MovieList halls={halls} sessions={sessions} movies={movies} places={places} />  
    </>
  )
}

export default Index