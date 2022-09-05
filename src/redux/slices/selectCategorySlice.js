import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0,
};

export const selectCategorySlice = createSlice({
  name: 'SET_CATEGORY',
  initialState,
  reducers: {
    selectCategory: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { selectCategory } = selectCategorySlice.actions;

export default selectCategorySlice.reducer;
