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

  console.log('Hall adding request');
  apiClient.delete('/halls/' + id).then(response => console.log(response.statusText))
  .catch(error => console.log(error));
}


export {addHallToDB, deleteHallFromDB}