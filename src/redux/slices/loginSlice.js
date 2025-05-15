import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginErrorStatus: undefined,
  loginErrorStatusText: undefined,
  loggedIn: JSON.parse(sessionStorage.getItem('loggedIn')) || false,
}

export const loginSlice = createSlice({
  name: 'login user',
  initialState,
  reducers: {
    setLoggedIn: (state) => {           
      state.loggedIn = true;
      sessionStorage.setItem('loggedIn', true);

      sessionStorage.removeItem('loginErrorStatus');
      sessionStorage.removeItem('loginErrorStatusText');

      console.log('пользователь авторизован');
    },
    setLoggedOut: (state) => {
      state.loggedIn = false;
      state.loginErrorStatus = 401;
      state.loginErrorStatusText = 'Unauthorized';

      // sessionStorage.removeItem('loggedIn');
      sessionStorage.setItem('loggedIn', false);
      sessionStorage.setItem('loginErrorStatus', 401);
      sessionStorage.setItem('loginErrorStatusText', 'Unauthorized');

      console.log('пользователь не авторизован, необходимо залогиниться');
    },
    setStateByStorageData: (state) => {
      // заполнить данными из хранилища при перезагрузке страницы
      state.loggedIn = JSON.parse(sessionStorage.getItem('loggedIn'));
      if (sessionStorage.getItem('loginErrorStatus') && sessionStorage.getItem('loginErrorStatusText')) {
        state.loginErrorStatus = JSON.parse(sessionStorage.getItem('loginErrorStatus'));
        state.loginErrorStatusText = JSON.parse(sessionStorage.getItem('loginErrorStatusText'));
      }
    },
  }
})

// Action creators are generated for each case reducer function
export const {
  setLoggedIn, 
  setLoggedOut, 
  setStateByStorageData,
} = loginSlice.actions;

export default loginSlice.reducer;