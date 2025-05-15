import { call, put } from 'redux-saga/effects';
import { addHallToDB, changeDataInDB, deleteHallFromDB, getGuestHallsFromDB, getHallsFromDB } from '../requests/hallRequests';
import { dataFailed, dataLoading, dataReceived, getHalls } from '../../slices/hallSlice';
import { setLoggedOut } from '../../slices/loginSlice';

// guest routes
import { dataFailed as guestDataFailed, dataLoading as guestDataLoading, dataReceived as guestDataReceived } from '../../slices/guestHallSlice';
import { getPlaces } from '../../slices/placeSlice';


// worker Saga: will be fired on SOME actions

// guest client side
export function* handleGetGuestHalls() {
  try {
    yield put(guestDataLoading()); // состояние загрузки

    const response = yield call(getGuestHallsFromDB); // просмотреть response.data
    const {data} = response;
    console.log({data});

    // yield put(setHalls([...data])); // добавление полученных данных в payload 
    yield put(guestDataReceived([...data])); // добавление полученных данных в payload 


    // return data;
    // yield put({ type: 'USER_FETCH_SUCCEEDED', user: user })
  } catch (e) {
    console.log(e);
    yield put(guestDataFailed());
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  }
}

export function* handleGetHalls() {
  try {
    yield put(dataLoading()); // состояние загрузки

    const response = yield call(getHallsFromDB); // просмотреть response.data
    const {data} = response;
    console.log({data});

    // yield put(setHalls([...data])); // добавление полученных данных в payload 
    yield put(dataReceived([...data])); // добавление полученных данных в payload 


    // return data;
    // yield put({ type: 'USER_FETCH_SUCCEEDED', user: user })
  } catch (e) {
    console.log(e);
    yield put(dataFailed());
    if (e.response.status === 401) {
      yield put(setLoggedOut());
    }
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  }
}


export function* handleAddHallData(action) {
  try {
    const {payload} = action;
    console.log({payload});
    
    const response = yield call(addHallToDB, payload); // просмотреть response.data
    const {data} = response;
    console.log({data});

    // вновь запросить изменившиеся данные с сервера для обновления стора
    yield put(getHalls());
    yield put(getPlaces());

        
    // yield put({ type: 'USER_FETCH_SUCCEEDED', user: user })
  } catch (e) {
    console.log(e);
    
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  }
}

export function* handleEditHallData(action) {
  try {
    const {payload} = action;
    const {dataArray, url} = payload;
    console.log({payload});
    console.log({dataArray});
    
    const response = yield call(changeDataInDB, dataArray, url); // просмотреть response.data
    // const {data} = response;
    console.log({response});
    
    // вновь запросить изменившиеся данные с сервера для обновления стора
    yield put(getHalls());
    yield put(getPlaces());

    // yield put({ type: 'USER_FETCH_SUCCEEDED', user: user })
  } catch (e) {
    console.log(e);
    
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  }
}

export function* handleDeleteHall(action) {
  try {
    const {payload} = action;
    console.log({payload});

    const {id} = payload;
        
    const responseStatus = yield call(deleteHallFromDB, id); // получить response.data
    console.log({responseStatus, hall_deleted: true});
    
    // вновь запросить изменившиеся данные с сервера для обновления стора
    yield put(getHalls());
    yield put(getPlaces());

    
    // yield put({ type: 'USER_FETCH_SUCCEEDED', user: user })
  } catch (e) {
    console.log(e);
    
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  }
}


