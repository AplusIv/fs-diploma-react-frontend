import axios from "axios";
import apiClient from "../../../services/api";

// Функционал: Добавление новых сеансов/нескольких сеансов в массиве
// {sessionsToAddInDB, 'api/sessions'}
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

// Функционал: Изменение существующего сеанса/нескольких сеансов в массиве
// {sessionsToChangeInDB, 'api/sessions'}
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

// Функционал: Удаление выбранного сеанса / массива сеансов
// {sessionsToDeleteInDB, 'api/sessions'}
export const deleteDataInDB = async (dataArray, url) => {
  console.log('array delete request');

  // dataArray содержит только id удаляемых элементов
  try {
    const promises = dataArray.map(async id => {
      return await apiClient.delete(`${url}/${id}`);
    });
    const responses = await axios.all(promises);
    return responses;   
  } catch (error) {
    console.log(error);    
  }
}
