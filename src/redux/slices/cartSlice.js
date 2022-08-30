import { createSlice } from '@reduxjs/toolkit';

const initialState = { length: 0, totalPrice: {}, items: {} };

export const cartSlice = createSlice({
  name: 'CART',
  initialState,
  reducers: {
    incrementCart: (state, action) => {
      const objKey = Object.keys(action.payload)[0];
      state.items[objKey].count = state.items[objKey].count + 1;
      state.length++;
    },
    decrementCart: (state, action) => {
      const objKey = Object.keys(action.payload)[0];
      state.items[objKey].count = state.items[objKey].count - 1;
      state.length--;
      if (state.items[objKey].count < 1) {
        delete state.items[objKey];
        delete state.totalPrice[objKey];
      }
    },

    updateCartItem: (state, action) => {
      const obj = action.payload;
      const objKey = Object.keys(obj)[0];
      if (objKey in state.items) {
        state.items[objKey] = action.payload[objKey];
        if (state.items[objKey].count < 1) {
          delete state.items[objKey];
          delete state.totalPrice[objKey];
          state.length--;
        }
      } else {
        state.items[objKey] = action.payload[objKey];
        state.items[objKey].count = 1;
        state.length++;
      }
    },
  },
});

export const { updateCartItem, incrementCart, decrementCart } = cartSlice.actions;

export default cartSlice.reducer;
