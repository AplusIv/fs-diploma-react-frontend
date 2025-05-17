import { call, put } from "redux-saga/effects";
import { addDataToDB, changeDataInDB, deleteDataInDB, getGuestSessionsFromDB, getSessionsByDate, getSessionsFromDB } from "../requests/sessionRequests";
import { dataLoading, dataReceived, getSessions, dataFailed as sessionRequestFailed } from "../../slices/sessionSlice";
import { dataFailed, dataLoading as sessionsByDateLoading, dataReceived as sessionsByDateReceived, setSessionsByDate} from "../../slices/sessionsByDateSlice";
import { setLoggedOut } from "../../slices/loginSlice";

import { dataLoading as guestDataLoading, dataReceived as guestDataReceived, dataFailed as guestDataFailed } from "../../slices/guestSessionSlice";



// worker Saga: will be fired on SOME actions

// guest get sessions
export function* handleGetGuestSessions() {
  try {
    yield put(guestDataLoading()); // состояние загрузки
    
    const response = yield call(getGuestSessionsFromDB); // просмотреть response.data
    const {data} = response;
    console.log({data});

    yield put(guestDataReceived([...data])); // добавление полученных данных в payload 
    
    // yield put(setPlaces([...data])); // добавление полученных данных в payload 

    // yield put({ type: 'USER_FETCH_SUCCEEDED', user: user })
  } catch (e) {
    console.log(e);
    yield put(guestDataFailed());

    // yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  }
}

export function* handleGetSessions() {
  try {
    yield put(dataLoading()); // состояние загрузки
    
    const response = yield call(getSessionsFromDB); // просмотреть response.data
    const {data} = response;
    console.log({data});

    yield put(dataReceived([...data])); // добавление полученных данных в payload 
    
    // yield put(setPlaces([...data])); // добавление полученных данных в payload 


    // yield put({ type: 'USER_FETCH_SUCCEEDED', user: user })
  } catch (e) {
    console.log(e);
    yield put(sessionRequestFailed(e));
    
    if (e.response.status === 401) {
      yield put(setLoggedOut());
    }
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  }
}

export function* handleAddSessionData(action) {
  try {
    const {payload} = action;
    const {dataArray, url} = payload;
    console.log({payload});
    console.log({dataArray});
    
    const response = yield call(addDataToDB, dataArray, url); // просмотреть response.data
    // const {data} = response;
    console.log({response});

    // вновь запросить изменившиеся данные с сервера для обновления стора
    yield put(getSessions());
    
        
    // yield put({ type: 'USER_FETCH_SUCCEEDED', user: user })
  } catch (e) {
    console.log(e);
    
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  }
}

export function* handleEditSessionData(action) {
  try {
    const {payload} = action;
    const {dataArray, url} = payload;
    console.log({payload});
    console.log({dataArray});
    
    const response = yield call(changeDataInDB, dataArray, url); // просмотреть response.data
    // const {data} = response;
    console.log({response});

    // вновь запросить изменившиеся данные с сервера для обновления стора
    yield put(getSessions());

        
    // yield put({ type: 'USER_FETCH_SUCCEEDED', user: user })
  } catch (e) {
    console.log(e);
    
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  }
}

export function* handleDeleteSession(action) {
  try {
    const {payload} = action;
    const {dataArray, url} = payload;
    console.log({payload});
    console.log({dataArray});
    
    const responseArray = yield call(deleteDataInDB, dataArray, url); // просмотреть response.data
    // const {data} = response;
    
    responseArray.forEach(response => {
      console.log({
        session_deleted: true,
        status: response.status
      });      
    });
    // console.log({response});

    // вновь запросить изменившиеся данные с сервера для обновления стора
    yield put(getSessions());
        
    // yield put({ type: 'USER_FETCH_SUCCEEDED', user: user })
  } catch (e) {
    console.log(e);
    
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  }
}

// Клиентская часть. Показ сеансов на конкретную дату.
export function* handleGetSessionsByDate(action) {
  try {
    const {payload} = action;

    yield put(sessionsByDateLoading()); // состояние загрузки
    
    const response = yield call(getSessionsByDate, payload); // просмотреть response.data
    const {data} = response;
    console.log({data});

    yield put(sessionsByDateReceived()); // успешно загружено 
    
    yield put(setSessionsByDate([...data])); // добавление полученных данных в payload 

    // yield put({ type: 'USER_FETCH_SUCCEEDED', user: user })
  } catch (e) {
    console.log(e);
    yield put(dataFailed()); // ошибка в запросе
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  }
}



