import { call, put } from 'redux-saga/effects';
import { addPlacesToHall, deletePlacesFromHall, getGuestPlacesFromDB, getPlacesFromDB, updateDataInDB } from '../requests/placeRequests';
import { dataFailed, dataLoading, dataReceived, getPlaces } from '../../slices/placeSlice';
import { changeDataInDB } from '../requests/hallRequests';
import { putPlaceData } from '../../slices/hallPlacesSlice';
import { getHalls } from '../../slices/hallSlice';
import { setLoggedOut } from '../../slices/loginSlice';

import { dataFailed as guestDataFailed, dataLoading as guestDataLoading, dataReceived as guestDataReceived } from '../../slices/guestPlaceSlice';


// worker Saga: will be fired on SOME actions

// guest get places
export function* handleGetGuestPlaces() {
  try {
    yield put(guestDataLoading()); // состояние загрузки
    
    const response = yield call(getGuestPlacesFromDB); // просмотреть response.data
    const {data} = response;
    console.log({data});

    // yield put(setHalls([...data])); // добавление полученных данных в payload 
    yield put(guestDataReceived([...data])); // добавление полученных данных в payload 
    
    // const response = yield call(getPlacesFromDB); // просмотреть response.data
    // const {data} = response;
    // console.log({data});

    // yield put(setPlaces([...data])); // добавление полученных данных в payload 


    // return data;
    // yield put({ type: 'USER_FETCH_SUCCEEDED', user: user })
  } catch (e) {
    console.log(e);
    yield put(guestDataFailed());
    
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  }
}

export function* handleGetPlaces() {
  try {
    yield put(dataLoading()); // состояние загрузки
    
    const response = yield call(getPlacesFromDB); // просмотреть response.data
    const {data} = response;
    console.log({data});

    // yield put(setHalls([...data])); // добавление полученных данных в payload 
    yield put(dataReceived([...data])); // добавление полученных данных в payload 
    
    // const response = yield call(getPlacesFromDB); // просмотреть response.data
    // const {data} = response;
    // console.log({data});

    // yield put(setPlaces([...data])); // добавление полученных данных в payload 


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

export function* handleNewHallAndPlaceData(action) {
  try {
    const url = 'api/halls';
    const { payload } = action;
    console.log({payload}); 
    const {hallDataArray, placeDataArray} = payload;
    
    // 1) Изменение конфигурации зала/залов
    const response1 = yield call(changeDataInDB, hallDataArray, url); // просмотреть response.data
    console.log({response1});    
    
    // 2) Удаление мест с прошлой конфигурацией зала/залов
    const response2 = yield call(deletePlacesFromHall, hallDataArray); // просмотреть response.data
    console.log({response2});

    // 3) Добавление мест с новой конфигурацией зала/залов
    const response3 = yield call(addPlacesToHall, hallDataArray);
    console.log({response3});

    // 4) вызов action putPlaceData для обновления типов мест
    const response4 = yield put(putPlaceData(placeDataArray)); 
    console.log({response4});

    /* 
    put это пример того, что мы называем Эффектом. 
    Эффекты - это простые JavaScript объекты. 
    Они содержат инструкции, которые должны быть выполнены промежуточным слоем
    */

    // вновь запросить изменившиеся данные с сервера для обновления стора
    yield put(getHalls());    
    // yield put(getPlaces()); // вызывается при обновлении типа мест
    // yield put({ type: 'USER_FETCH_SUCCEEDED', user: user })
  } catch (e) {
    console.log(e);
    
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  }
}

export function* handleEditPlaceData(action) {
  try {
    const {payload} = action;   
    const response = yield call(updateDataInDB, payload); // просмотреть response.data
    console.log({response});

    // вновь запросить изменившиеся данные с сервера для обновления стора
    yield put(getPlaces());  
    // yield put({ type: 'USER_FETCH_SUCCEEDED', user: user })
  } catch (e) {
    console.log(e);
    
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  }
}

