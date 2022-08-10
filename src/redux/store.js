import { configureStore } from '@reduxjs/toolkit';
import selectCategorySlice from './slices/selectCategorySlice';
import selectCurrencySlice from './slices/selectCurrencySlice';

export const store = configureStore({
  reducer: { selectCategorySlice, selectCurrencySlice },
});
