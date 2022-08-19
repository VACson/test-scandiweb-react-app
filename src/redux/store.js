import { configureStore } from '@reduxjs/toolkit';
import selectCategorySlice from './slices/selectCategorySlice';
import selectCurrencySlice from './slices/selectCurrencySlice';
import selectProductSlice from './slices/selectProductSlice';
import cartSlice from './slices/cartSlice';

export const store = configureStore({
  reducer: { selectCategorySlice, selectCurrencySlice, selectProductSlice, cartSlice },
});
