import axios from "axios";
import apiClient from "../../../services/api";

// const routes = ['/api/halls', '/api/movies', '/api/sessions', '/api/places', '/api/tickets', '/api/orders'];
// const route = '/api/halls';

// Функционал: Получение всех залов
export const getHallsFromDB = async () => {
  console.log('Get Halls request');
  const response = await apiClient.get('/api/halls');
  return response;
}

// Функционал: Добавление нового зала
export const addHallToDB = async (data) => {
  console.log('Hall adding request');
  const response = await apiClient.post('api/halls', data);
  return response;
  // apiClient.post('api/halls', data).then(response => console.log(response))
  //   .catch(error => console.log(error));
}

// // Функционал: Обновление зала
// const updateHallInDB = async (id, data) => {
//   console.log('Hall updating request');

//   try {
//     const response = await apiClient.put(`api/halls/${id}`, data);
//     console.log(response);
//     return response.data;
//   } catch (error) {
//     console.log(error);
//   }
// }

// Функционал: Изменение существующего зала/нескольких залов в массиве
// {updatedHalls, 'api/halls'}
export const changeDataInDB = async (dataArray, url) => {
  console.log('array put requests');
  try {
    const promises = dataArray.map(async data => {
      return await apiClient.put(`${url}/${data.id}`, data);
    });
    const responses = await axios.all(promises);
    return responses;   
  } catch (error) {
    console.log(error);    
  }
}

// Функционал: Удаление выбранного зала
export const deleteHallFromDB = async (id) => {
  console.log('Hall delete request');
  const response = await apiClient.delete('api/halls/' + id);
  const {status} = response;
  return status;

  // apiClient.delete('api/halls/' + id).then(response => console.log(response))
  //   .catch(error => console.log(error));
}