import axios from "axios";
import apiClient from "./jsonServerApi";


// Функционал: Добавление нового зала
const addHallToDB = (data) => {
  // e.preventDefault();

  console.log('Hall adding request');
  apiClient.post('/halls', data).then(response => console.log(response.statusText))
    .catch(error => console.log(error));
}

// Функционал: Удаление выбранного зала
const deleteHallFromDB = (id) => {
  // e.preventDefault();

  console.log('Hall delete request');
  apiClient.delete('/halls/' + id).then(response => console.log(response.statusText))
    .catch(error => console.log(error));
}

// Функционал: Добавление новых фильмов/сеансов
const addDataToDB = (array, url) => {
  // e.preventDefault();

  console.log('array post request');

  const promises = array.map(data => {
    apiClient.post(url, data)
      .then(response => console.log(response.statusText));
  })

  axios.all(promises)
    .then(responses => console.log(responses.statusText))
    .catch(error => console.error(error))
}
// const addMovieToDB = (data) => {
//   // e.preventDefault();

//   console.log('movie adding request');

//   apiClient.post('/movies', data).then(response => {
//     console.log(response.statusText);
//   }).catch(error => {
//     console.log(error);
//   })
// }

// Функционал: Изменение существующего фильма
const changeDataInDB = (array, url) => {
  // e.preventDefault();

  console.log('array put request');

  const promises = array.map(data => {
    apiClient.put(`${url}/${data.id}`, data)
      .then(response => console.log(response.statusText));
  })

  axios.all(promises)
    .then(responses => console.log(responses.statusText))
    .catch(error => console.error(error))

  // const promises = array.map(data => {
  //   apiClient.put(`${url}/${data.id}`, data)
  // })

  // axios.all(promises).then(responses => {
  //   responses.forEach(response => console.log(response.statusText))
  // }).catch(error => {
  //   console.error(error)
  // })
}

// Функционал: Удаление выбранного зала
const deleteDataInDB = (array, url) => {
  console.log('array delete request');

  const promises = array.map(id => {
    apiClient.delete(`${url}/${id}`)
      .then(response => console.log(response.statusText));
  })

  axios.all(promises)
    .then(responses => console.log(responses.statusText))
    .catch(error => console.error(error))

  // apiClient.delete('/halls/' + id).then(response => console.log(response.statusText))
  //   .catch(error => console.log(error));
}


export { addHallToDB, deleteHallFromDB, addDataToDB, changeDataInDB, deleteDataInDB }