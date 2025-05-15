import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // loading: 'idle',
  hall: undefined,
  movie: undefined,
  session: undefined,
  placesByHall: [],
  selectedPlaces: [],
  // hall: undefined,
  // movie: undefined,
  // session: undefined,
  // placesByHall: undefined,
}

export const buyingSlice = createSlice({
  name: 'buying',
  initialState,
  reducers: {
    setHall: (state, action) => {
      const { payload } = action;
      console.log({ payload });      
      state.hall = payload;
      sessionStorage.setItem('hall', JSON.stringify(payload)); // запись в сессию браузера
    },
    setMovie: (state, action) => {
      const { payload } = action;
      console.log({ payload });      
      state.movie = payload;
      sessionStorage.setItem('movie', JSON.stringify(payload)); // запись в сессию браузера

    },
    setSession: (state, action) => {
      const { payload } = action;
      console.log({ payload });      
      state.session = payload;
      sessionStorage.setItem('session', JSON.stringify(payload)); // запись в сессию браузера
    },
    setPlacesByHall: (state, action) => {
      const { payload } = action;
      console.log({ payload });      
      state.placesByHall = [...payload];
      sessionStorage.setItem('placesByHall', JSON.stringify(payload)); // запись в сессию браузера
    },
    setSelectedPlaces: (state, action) => {
      const { payload } = action;
      console.log({ payload });      
      state.selectedPlaces = [...payload];
      sessionStorage.setItem('selectedPlaces', JSON.stringify(payload)); // запись в сессию браузера
    },
    setToInitialData: (state) => { 
      state.hall = undefined;
      state.movie = undefined;
      state.session = undefined;
      state.placesByHall = [];  
      
      state.selectedPlaces = [];
      // state.hall = undefined;
      // state.movie = undefined;
      // state.session = undefined;
      // state.placesByHall = undefined;
      sessionStorage.removeItem('hall'); // очистка сессии
      sessionStorage.removeItem('movie'); // очистка сессии
      sessionStorage.removeItem('session'); // очистка сессии
      sessionStorage.removeItem('placesByHall'); // очистка сессии

      sessionStorage.removeItem('selectedPlaces'); // очистка сессии
    },
    setStateByStorageData: (state) => {
      // заполнить данными из хранилища при перезагрузке страницы
      state.hall = JSON.parse(sessionStorage.getItem('hall'));
      state.movie = JSON.parse(sessionStorage.getItem('movie'));
      state.session = JSON.parse(sessionStorage.getItem('session'));
      state.placesByHall = JSON.parse(sessionStorage.getItem('placesByHall'));

      state.selectedPlaces = JSON.parse(sessionStorage.getItem('selectedPlaces'));
    },
  }
})

// Action creators are generated for each case reducer function
export const {
  setHall, 
  setMovie, 
  setSession, 
  setPlacesByHall, 
  setSelectedPlaces,
  setToInitialData,
  setStateByStorageData,
} = buyingSlice.actions;

export default buyingSlice.reducer;