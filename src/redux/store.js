import { configureStore } from '@reduxjs/toolkit';
import selectCategorySlice from './slices/selectCategorySlice';
import selectCurrencySlice from './slices/selectCurrencySlice';
import cartSlice from './slices/cartSlice';

export const store = configureStore({
  reducer: { selectCategorySlice, selectCurrencySlice, cartSlice },
});
