import { call, put } from 'redux-saga/effects';
import { addHallToDB, changeDataInDB, deleteHallFromDB, getHallsFromDB } from '../requests/hallRequests';
import { dataLoading, dataReceived } from '../../slices/hallSlice';

// worker Saga: will be fired on SOME actions
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
    
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  }
}


export function* handleAddHallData(action) {
  try {
    const {payload} = action;
    console.log({payload});
    
    const response = yield call(addHallToDB, action.payload); // просмотреть response.data
    const {data} = response;
    console.log({data});
        
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
    
    // yield put({ type: 'USER_FETCH_SUCCEEDED', user: user })
  } catch (e) {
    console.log(e);
    
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  }
}


