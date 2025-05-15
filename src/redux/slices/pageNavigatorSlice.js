import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
// import updateLocale from 'dayjs/plugin/updateLocale'; // ES 2015

// // обновить дни недели на русском
// dayjs.extend(updateLocale);

// dayjs.updateLocale('en', {
//   weekdays: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"]
// });

const initialState = {
  days: undefined,
  selectedDayIndex: undefined,
  // selectedDate: dayjs().format('YYYY-MM-DD'),
  selectedDate: undefined,

  paginateStep: 6,
  daysIntervalIndexes: {
    firstDay: 0,
    lastDay: 6,
  },
  refreshDays: 'initial days is set',
}

export const pageNavigatorSlice = createSlice({
  name: 'pageNavigator',
  initialState,
  reducers: {
    setDays: (state, action) => {
      const {payload} = action;
      console.log({setDaysPayload: payload});

      const now = dayjs();
      let days = [];

      if (payload) {
        const date = dayjs(payload);
        const dateDiff = date.diff(now, 'day') + 1; // разница в днях между 2-мя датами + 1 день для корректного переноса календаря
        console.log({dateDiff});

        const shift = Math.trunc(dateDiff / state.paginateStep);
        console.log({shift});
        
        // сместить интервал календаря
        state.daysIntervalIndexes.firstDay = 0 + shift * state.paginateStep;
        state.daysIntervalIndexes.lastDay = state.paginateStep + shift * state.paginateStep;

        let selected = 0;
        for (let index = state.daysIntervalIndexes.firstDay; index < state.daysIntervalIndexes.lastDay; index++) {
          const day = now.add(index, 'day');
          days.push(day);
          console.log({day});
          
  
          if (day.isSame(date, 'day')) {
            state.selectedDayIndex = selected;
          }
          selected++;
        }
      } else {
        for (let index = state.daysIntervalIndexes.firstDay; index < state.daysIntervalIndexes.lastDay; index++) {
          const day = now.add(index, 'day');
          days.push(day);  
        }
        // state.selectedDayIndex = 0;
        // state.selectedDate = now.format('YYYY-MM-DD');
        state.selectedDayIndex = undefined;
        state.selectedDate = undefined;
      }

      state.days = days;
    },
    setDaysIntervalToFuture: (state) => {
      state.daysIntervalIndexes = {
        firstDay: state.daysIntervalIndexes.firstDay + state.paginateStep,
        lastDay: state.daysIntervalIndexes.lastDay + state.paginateStep
      };

      // const date = dayjs(state.selectedDate);
      // const nextDate = date.add(state.paginateStep, 'day');
      // console.log({nextDate: nextDate.format('YYYY-MM-DD')});
      
      // state.selectedDate = nextDate.format('YYYY-MM-DD');
    },
    setDaysIntervalToPast: (state) => {
      if (state.daysIntervalIndexes.firstDay > 0) {
        state.daysIntervalIndexes = {
          firstDay: state.daysIntervalIndexes.firstDay - state.paginateStep,
          lastDay: state.daysIntervalIndexes.lastDay - state.paginateStep
        };

        // const date = dayjs(state.selectedDate);
        // const nextDate = date.subtract(state.paginateStep, 'day');
        // console.log({nextDate: nextDate.format('YYYY-MM-DD')});

        // state.selectedDate = nextDate.format('YYYY-MM-DD');
      }
    },
    setSelectedDayIndex: (state, action) => {
      const { payload } = action;
      state.selectedDayIndex = payload;
      // state.selectedDate = state.days[payload].format('YYYY-MM-DD');
    },
    setSelectedDate: (state, action) => {
      const {payload} = action;
      console.log({payload});
      
      if (payload) {
        state.selectedDate = payload;
      } /* else {
        state.selectedDate = state.days[state.selectedDayIndex].format('YYYY-MM-DD');
      } */
    },
    setPaginateStep: (state, action) => {
      const { payload } = action;
      state.paginateStep = payload;
    },
    setRefreshDays: (state, action) => {
      const { payload } = action;
      state.refreshDays = payload;
    },
  }
})

// Action creators are generated for each case reducer function
export const {
  setDays,
  setDaysIntervalToFuture,
  setDaysIntervalToPast,
  setSelectedDayIndex,
  setSelectedDate,
  setPaginateStep,  
  setRefreshDays,
} = pageNavigatorSlice.actions;

export default pageNavigatorSlice.reducer;