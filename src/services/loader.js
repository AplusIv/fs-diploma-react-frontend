export const loader = async () => {
  const [halls, movies, sessions, places] = await Promise.all([
    fetch('http://localhost:4000/halls').then(res => res.json()),
    fetch('http://localhost:4000/movies').then(res => res.json()),
    fetch('http://localhost:4000/sessions').then(res => res.json()),
    fetch('http://localhost:4000/places').then(res => res.json()),
  ]);

  return { halls, movies, sessions, places };    
}