// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   popupEditSessionData: {},
//   halls: []
// }

// export const popupEditSessionHandlerSlice = createSlice({
//   name: 'popupEditSessionData',
//   initialState,
//   reducers: {
//     setHalls: (state, action) => {
//       const { payload } = action;
//       console.log({payload});
//       state.halls = [...payload];
//     },
//     setData: (state, action) => {
//       const { payload } = action;
//       console.log({payload});

//       for (const key in payload) {
//         if (Object.prototype.hasOwnProperty.call(payload, key)) {
//           state.popupEditSessionData[key] = payload[key];          
//         }
//       }
//     },
//     setToInitialData: state => {
//       state.popupEditSessionData = {},
//       state.halls = []
//     },

//     changeData: (state, action) => {
//       const { payload } = action;
//       const { property, value } = payload;
//       console.log({payload});

//       if (property === 'hall_id') {
//         const editedHallId = state.halls.find(hall => hall.title === value).id;
//         state.popupEditSessionData[property] = editedHallId;
//       } else {
//         state.popupEditSessionData[property] = value;
//       }

//       // state.popupEditSessionData[property] = value;
//     },
//     putSessionData: () => {}, // запускает worker saga handleEditSessionData
//     deleteSession: () => {} // запускает worker saga handleDeleteSession
//   }
// })

// // Action creators are generated for each case reducer function
// export const {setHalls, setData, setToInitialData, changeData, putSessionData, deleteSession} = popupEditSessionHandlerSlice.actions;

// export default popupEditSessionHandlerSlice.reducer;