import axios from "axios";
import apiClient from "../../../services/api";

// Функционал: Добавление новых фильмов/нескольких фильмов в массиве
// {moviesToAddInDB, 'api/movies'}
export const addDataToDB = async (dataArray, url) => {

  console.log('array post request');

  try {
    const promises = dataArray.map(async data => {
      return await apiClient.post(url, data);
    });
    const responses = await axios.all(promises);
    return responses;   
  } catch (error) {
    console.log(error);    
  }
}

// Функционал: Изменение существующего фильма/нескольких фильмов в массиве
// {moviesToChangeInDB, 'api/movies'}
export const changeDataInDB = async (dataArray, url) => {
  console.log('array put requests');

  try {
    const promises = dataArray.map(async data => {
      return await apiClient.put(`${url}/${data.id}`, data);
    });
    const responses = await axios.all(promises);
    // const consoles = axios.spread(response => console.log(response));
    return responses;   
  } catch (error) {
    console.log(error);    
  }

  // const promises = dataArray.map(async data => {
  //   try {
  //     return await apiClient.put(`${url}/${data.id}`, data)
  //   } catch (error) {
  //     console.log(error);      
  //   }
  // })

  // try {
  //   const responses = await axios.all(promises);
  //   const consoles = axios.spread(response => console.log(response));
  //   // console.log(responses); 
  //   return responses.status;   
  // } catch (error) {
  //   console.log(error);    
  // }
}

// Функционал: Удаление выбранного элемента
// {moviesToDeleteInDB, 'api/movies'}
export const deleteDataInDB = async (dataArray, url) => {
  console.log('array delete request');

  // dataArray содержит только id удаляемых элементов
  try {
    const promises = dataArray.map(async id => {
      return await apiClient.delete(`${url}/${id}`);
    });
    const responses = await axios.all(promises);
    // const consoles = axios.spread(response => console.log(response));
    return responses;   
  } catch (error) {
    console.log(error);    
  }

  // dataArray содержит только id удаляемых элементов
  // dataArray.map(async id => {
  //   try {
  //     return await apiClient.delete(`${url}/${id}`)
  //   } catch (error) {
  //     console.log(error);      
  //   }
  //   // apiClient.post(url, data)
  //   //   .then(response => console.log(response.statusText));
  // })
}
