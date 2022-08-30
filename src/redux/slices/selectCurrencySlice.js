import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  symbol: 0,
};

export const selectCurrencySlice = createSlice({
  name: 'SELECT_CURRENCY',
  initialState,
  reducers: {
    selectCurrency: (state, action) => {
      state.symbol = action.payload;
    },
  },
});

export const { selectCurrency } = selectCurrencySlice.actions;

export default selectCurrencySlice.reducer;
