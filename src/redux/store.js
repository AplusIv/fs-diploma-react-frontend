import { configureStore } from '@reduxjs/toolkit'

// redux slices
import hallsReducer from './slices/hallSlice'

import popupInfoReducer from './slices/popupSlice'
import hallPopupInfoReducer from './slices/hallPopupSlice'
import hallPopupDataReducer from './slices/hallPopupDataHandlerSlice'
import popupEditMovieReducer from './slices/popupEditMovieHandlerSlice'
import popupAddMovieReducer from './slices/popupAddMovieHandlerSlice'
import popupEditSessionsReducer from './slices/popupEditSessionsHandlerSlice' // управление списком сеансов
// import popupEditSessionReducer from './slices/popupEditSessionHandlerSlice' // управление конкректным сеансом
import popupAddSessionReducer from './slices/popupAddSessionHandlerSlice'

import hallPricesReducer from './slices/hallPricesSlice'


// saga
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/rootSaga'

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware]; // массив с разными возможными мидвейр

export const store = configureStore({
  reducer: {
    hallsReducer,
    popupInfoReducer,
    hallPopupInfoReducer,
    hallPopupDataReducer,
    popupEditMovieReducer,
    popupAddMovieReducer,
    popupEditSessionsReducer,
    popupAddSessionReducer,

    // prices
    hallPricesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

// run the saga
sagaMiddleware.run(rootSaga);