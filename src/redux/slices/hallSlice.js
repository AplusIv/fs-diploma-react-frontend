import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: 'idle',
  halls: []
}

export const hallSlice = createSlice({
  name: 'halls',
  initialState,
  reducers: {
    dataLoading: (state) => {
      console.log(state.loading);
      // Use a "state machine" approach for loading state instead of booleans
      if (state.loading === 'idle') {
        state.loading = 'pending'
      }
    },
    dataReceived: (state, action) => {
      console.log(state.loading);

      if (state.loading === 'pending') {
        state.loading = 'idle'
        const { payload } = action;
        console.log({ payload });
      
        state.halls = [...payload];
      }
    },
    getHalls: () => {}, // запуск worker saga get halls
    setHalls: (state, action) => {
      const { payload } = action;
      console.log({ payload });
      
      state.halls = [...payload];
    }
  }
})

// Action creators are generated for each case reducer function
export const {getHalls, setHalls, dataLoading, dataReceived} = hallSlice.actions;

export default hallSlice.reducer;