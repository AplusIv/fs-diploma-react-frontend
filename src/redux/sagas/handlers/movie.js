import { call } from 'redux-saga/effects';
import { addDataToDB, changeDataInDB, deleteDataInDB } from '../requests/movieRequests';
// import { addHallToDB, deleteHallFromDB } from '../requests/hallRequests';

// worker Saga: will be fired on SOME actions
export function* handleAddMovieData(action) {
  try {
    const {payload} = action;
    const {dataArray, url} = payload;
    console.log({payload});
    console.log({dataArray});


    
    const response = yield call(addDataToDB, dataArray, url); // просмотреть response.data
    // const {data} = response;
    console.log({response});
        
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
        
    // yield put({ type: 'USER_FETCH_SUCCEEDED', user: user })
  } catch (e) {
    console.log(e);
    
    // yield put({ type: 'USER_FETCH_FAILED', message: e.message })
  }
}


