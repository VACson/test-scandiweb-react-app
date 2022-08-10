import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  symbol: 0,
};

export const selectCurrencySlice = createSlice({
  name: 'SELECT_CURRENCY',
  initialState,
  reducers: {
    selectCurrency: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.symbol = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectCurrency } = selectCurrencySlice.actions;

export default selectCurrencySlice.reducer;
