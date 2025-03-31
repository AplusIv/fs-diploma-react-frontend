import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  halls: [],
  prices: [], // Конфигурации цен всех залов

  selectedHallId: undefined
}

export const hallPricesSlice = createSlice({
  name: 'hallPrices',
  initialState,
  reducers: {
    setHalls: (state, action) => {
      const { payload } = action;
      console.log({ payload });
      
      state.halls = [...payload];

      state.selectedHallId = state.halls[0]?.id; // установить первый выбранный зал
    },
    setPrices: (state, action) => {
      const { payload } = action;
      // Конфигурации цен всех залов
      state.prices = payload.map(hall => {
        return {
          hall_id: hall.id,
          normal_price: hall.normal_price,
          vip_price: hall.vip_price,
        }
      });
    },
    setSelectedHallId: (state, action) => {
      const { payload } = action;
      console.log({ payload });
      const selectedHallTitle = state.halls.find(hall => hall.title === payload);
      state.selectedHallId = selectedHallTitle.id;
    },
    changeData: (state, action) => {
      const { property, value } = action.payload;
      console.log(action.payload);
      
      state.prices.find(priceConfiguration => priceConfiguration.hall_id === state.selectedHallId)[property] = value;
    },
    handleBlurData: (state, action) => {
      const { property, value } = action.payload;
      console.log(action.payload);
      
      state.prices.find(priceConfiguration => priceConfiguration.hall_id === state.selectedHallId)[property] = value ? Number(parseFloat(value).toFixed(2)) : 0; 
    },
    cancelPriceChanges: (state) => {
      state.prices = state.halls.map(hall => {
        return {
          hall_id: hall.id,
          normal_price: hall.normal_price,
          vip_price: hall.vip_price,
        }
      });
    },
    putHallData: () => {}, // запускает worker saga handleEditHallData
  }
})

// Action creators are generated for each case reducer function
export const {setHalls, setPrices, setSelectedHallId, changeData, handleBlurData, cancelPriceChanges, putHallData} = hallPricesSlice.actions;

export default hallPricesSlice.reducer;