import { call, put } from "redux-saga/effects";
import { dataFailed, dataLoading, dataReceived, setNewOrderTickets, setTickets } from "../../slices/ticketSlice";
import { getDataById, getTicketsFromDB } from "../requests/ticketRequests";


// worker Saga: will be fired on SOME actions
// Клиентская часть. Получение всех билетов.
export function* handleGetTickets() {
  try {
    yield put(dataLoading()); // состояние загрузки
    
    const response = yield call(getTicketsFromDB); // просмотреть response.data
    const {data} = response;
    console.log({data});

    yield put(dataReceived()); // успешно загружено 
    
    yield put(setTickets([...data])); // добавление полученных данных в payload 

    // yield put({ type: 'USER_FETCH_SUCCEEDED', user: user })
  } catch (e) {
    console.log(e);
    yield put(dataFailed()); // ошибка в запросе
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  }
}

// Клиентская часть. Получение билетов по конкретному ID заказа.
export function* handleGetNewOrderTickets(action) {
  try {
    const { payload } = action;
    console.log({payload}); 
    const {url, id} = payload;

    yield put(dataLoading()); // состояние загрузки
    
    const response = yield call(getDataById, url, id); // просмотреть response.data
    const {data} = response;
    console.log({data});

    yield put(dataReceived()); // успешно загружено 
    
    yield put(setNewOrderTickets(data)); // добавление полученных данных в payload 

    // yield put({ type: 'USER_FETCH_SUCCEEDED', user: user })
  } catch (e) {
    console.log(e);
    yield put(dataFailed()); // ошибка в запросе
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  }
}