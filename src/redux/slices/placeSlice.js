import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: 'idle',
  places: []
}

export const placeSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    dataLoading: (state) => {
      console.log(state.loading);
      // Use a "state machine" approach for loading state instead of booleans
      if (state.loading === 'idle' || state.loading === 'failed') {
        state.loading = 'pending'
      }
    },
    dataReceived: (state, action) => {
      console.log(state.loading);

      if (state.loading === 'pending') {
        state.loading = 'idle'
        const { payload } = action;
        console.log({ payload });
      
        state.places = [...payload];
      }
    },
    dataFailed: (state) => {
      console.log(state.loading);
      if (state.loading === 'pending') {
        state.loading = 'failed'
        state.places = [];
      }
    },
    getPlaces: () => {}, // запуск worker saga get places
    setPlaces: (state, action) => {
      const { payload } = action;
      console.log({ payload });
      
      state.places = [...payload];
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  dataLoading, 
  dataReceived, 
  dataFailed,
  getPlaces, 
  setPlaces,
} = placeSlice.actions;

export default placeSlice.reducer;