import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: 'idle',
  sessions: []
}

export const guestSessionSlice = createSlice({
  name: 'guest sessions',
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

      if (state.loading === 'pending' || state.loading === 'failed') {
        state.loading = 'idle'
        const { payload } = action;
        console.log({ payload });
      
        state.sessions = [...payload];
      }
    },
    dataFailed: (state) => {
      console.log(state.loading);
      if (state.loading === 'pending') {
        state.loading = 'failed'
        state.sessions = [];
      }
    },
    getSessions: () => {}, // запуск worker saga get sessions
    setSessions: (state, action) => {
      const { payload } = action;
      console.log({ payload });
      
      state.sessions = [...payload];
    }
  }
})

// Action creators are generated for each case reducer function
export const {
  dataLoading, 
  dataReceived, 
  dataFailed,
  getSessions, 
  setSessions
} = guestSessionSlice.actions;

export default guestSessionSlice.reducer;