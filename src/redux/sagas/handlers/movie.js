import { call, put } from 'redux-saga/effects';
import { addDataToDB, changeDataInDB, deleteDataInDB, getGuestMoviesFromDB, getMoviesFromDB } from '../requests/movieRequests';
import { dataFailed, dataLoading, dataReceived, getMovies } from '../../slices/movieSlice';
import { setLoggedOut } from '../../slices/loginSlice';
// import { addHallToDB, deleteHallFromDB } from '../requests/hallRequests';

// guest route
import { dataFailed as guestDataFailed, dataLoading as guestDataLoading, dataReceived as guestDataReceived} from '../../slices/guestMovieSlice';
import { getSessions } from '../../slices/sessionSlice';


// worker Saga: will be fired on SOME actions

// guest get movies
export function* handleGetGuestMovies() {
  try {
    yield put(guestDataLoading()); // состояние загрузки
    
    const response = yield call(getGuestMoviesFromDB); // просмотреть response.data
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

export function* handleGetMovies() {
  try {
    yield put(dataLoading()); // состояние загрузки
    
    const response = yield call(getMoviesFromDB); // просмотреть response.data
    const {data} = response;
    console.log({data});

    yield put(dataReceived([...data])); // добавление полученных данных в payload 
    
    // yield put(setPlaces([...data])); // добавление полученных данных в payload 


    // yield put({ type: 'USER_FETCH_SUCCEEDED', user: user })
  } catch (e) {
    console.log(e);
    yield put(dataFailed(e));
    
    if (e.response.status === 401) {
      yield put(setLoggedOut());
    }
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  }
}

export function* handleAddMovieData(action) {
  try {
    const {payload} = action;
    const {dataArray, url} = payload;
    console.log({payload});
    console.log({dataArray});


    
    const response = yield call(addDataToDB, dataArray, url); // просмотреть response.data
    // const {data} = response;
    console.log({response});

    // вновь запросить изменившиеся данные с сервера для обновления стора
    yield put(getMovies());
        
    // yield put({ type: 'USER_FETCH_SUCCEEDED', user: user })
  } catch (e) {
    console.log(e);
    
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  }
}

export function* handleEditMovieData(action) {
  try {
    const {payload} = action;
    const {dataArray, url} = payload;
    console.log({payload});
    console.log({dataArray});


    
    const response = yield call(changeDataInDB, dataArray, url); // просмотреть response.data
    // const {data} = response;
    console.log({response});

    // вновь запросить изменившиеся данные с сервера для обновления стора
    yield put(getMovies());
        
    // yield put({ type: 'USER_FETCH_SUCCEEDED', user: user })
  } catch (e) {
    console.log(e);
    
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  }
}

export function* handleDeleteMovie(action) {
  try {
    const {payload} = action;
    const {dataArray, url} = payload;
    console.log({payload});
    console.log({dataArray});
    
    const responseArray = yield call(deleteDataInDB, dataArray, url); // просмотреть response.data
    // const {data} = response;
    
    responseArray.forEach(response => {
      console.log({
        movie_deleted: true,
        status: response.status
      });      
    });
    // console.log({response});

    // вновь запросить изменившиеся данные с сервера для обновления стора
    yield put(getSessions());
    yield put(getMovies());

        
    // yield put({ type: 'USER_FETCH_SUCCEEDED', user: user })
  } catch (e) {
    console.log(e);
    
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  }
}


