// import { redirect, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
import { Navigate, redirect } from "react-router-dom";
import apiClient from "./api";

// https://blog.logrocket.com/how-to-make-http-requests-like-a-pro-with-axios/
// const navigate = useNavigate();


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
  const routes = ['/api/halls', '/api/movies', '/api/sessions', '/api/places', '/api/tickets', '/api/orders'];

  // рабочий вариант
  // const promises = routes.map(route => apiClient.get(baseUrl + route).then(response => {
  //   console.log(typeof response.data);
  //   return response.data;
  //   // JSON.parse(response.data);
  // }));

  const promises = routes.map(route => apiClient.get(baseUrl + route).then(response => {
    console.log(typeof response.data);
    return response.data;
    // JSON.parse(response.data);
  }));

  try {
    const [halls, movies, sessions, places, tickets, orders] = await Promise.all(promises);
    return { halls, movies, sessions, places, tickets, orders };
  } catch (error) {
    console.log(error.response);
    const {status} = error.response;
    console.log(status);
    return {status};
  }
  // const [halls, movies, sessions, places] = await Promise.all(promises);
  // Promise.all(promises).then(res =>console.log(res)).catch(err => {
  //   console.log(err.response);
    
  //   if (err.response.status === 401) {
  //     // redirect('/login');
  //     console.log('перейти на /login');
      
  //   }
  // });



  // try {
  //   const [halls, movies, sessions, places] = await Promise.all(promises);
  //   return {halls, movies, sessions, places};
  // } catch (error) {
  //   // if (error.status === '401')
  //   navigate('/login');
  // }


  // const [halls, movies, sessions, places] = await Promise.all([
  //   fetch(baseUrl + '/api/halls', {headers: {}, credentials: "same-origin"}).then(res => res.json()),
  //   fetch(baseUrl + '/api/movies').then(res => res.json()),
  //   fetch(baseUrl + '/api/sessions').then(res => res.json()),
  //   fetch(baseUrl + '/api/places').then(res => res.json()),
  // ]);

  // const [halls, movies, sessions, places] = await Promise.all([
  //   apiClient.get(baseUrl + '/api/halls').then(res => res.json()),
  //   apiClient.get(baseUrl + '/api/movies').then(res => res.json()),
  //   apiClient.get(baseUrl + '/api/sessions').then(res => res.json()),
  //   apiClient.get(baseUrl + '/api/places').then(res => res.json()),
  // ]);


  // const [halls, movies, sessions, places] = Promise.all([
  //   apiClient.get(baseUrl + '/api/halls'),
  //   apiClient.get(baseUrl + '/api/movies'),
  //   apiClient.get(baseUrl + '/api/sessions'),
  //   apiClient.get(baseUrl + '/api/places'),
  // ]).then(responses => console.log(responses));


  // return { halls, movies, sessions, places };
}

// const promises = array.map(data => {
//   apiClient.put(`${url}/${data.id}`, data)
//     .then(response => console.log(response.statusText));
// })

// axios.all(promises)
//   .then(responses => console.log(responses.statusText))
//   .catch(error => console.error(error))