import apiClient from "../../../services/api";

// Функционал: Получение всех билетов
export const getOrdersFromDB = async () => {
  console.log('Get tickets request');
  const response = await apiClient.get('/api/orders');
  return response;
}

// Функционал: Создание нового заказа с выбранными билетами
export const postNewOrderWithTickets = async (dataArray) => {
  console.log('array post request');
  console.log({ticketsToAddInOrder: dataArray});  

  try {
    // const response = await apiClient.post(url, dataArray, {headers: {'Content-Type': 'application/json'}});
    const response = await apiClient.post('api/guest/orders', dataArray);
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}

// Функционал: Изменение статуса заказа и билетов при оплате
export const updateOrderAndTicketStatus = async (data) => {
  console.log('order put request');

  try {
    const response = await apiClient.put(`api/guest/orders/${data.id}`, data)
    // response.json().then(data => console.log(data));
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
}