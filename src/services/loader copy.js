export const loader = async () => {
  /* 
  JSON-server urls:
  http://localhost:4000/halls
  http://localhost:4000/movies
  http://localhost:4000/sessions
  http://localhost:4000/places
  */

  /* Laravel routes */
  const baseUrl = 'http://localhost:8000';

  const [halls, movies, sessions, places] = await Promise.all([
    fetch(baseUrl + '/api/halls', {headers: {}, credentials: "same-origin"}).then(res => res.json()),
    fetch(baseUrl + '/api/movies').then(res => res.json()),
    fetch(baseUrl + '/api/sessions').then(res => res.json()),
    fetch(baseUrl + '/api/places').then(res => res.json()),
  ]);

  return { halls, movies, sessions, places };    
}