import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const cartSlice = createSlice({
  name: 'CART',
  initialState,
  reducers: {
    incrementCartItem: (state, action) => {
      const itemID = state.map((items) => items.id).indexOf(action.payload.id);
      state[itemID].count += 1;
      if (state[itemID].count < 1) {
        state.splice(itemID, 1);
      }
    },
    decrementCart: (state, action) => {
      const itemID = state.map((items) => items.id).indexOf(action.payload.id);
      state[itemID].count -= 1;
      if (state[itemID].count < 1) {
        state.splice(itemID, 1);
      }
    },

    updateCartItem: (state, action) => {
      const itemID = state.map((items) => items.id).indexOf(action.payload.id);
      if (itemID >= 0) {
        state[itemID] = action.payload;
        if (state[itemID].count < 1) {
          state.splice(itemID, 1);
        }
      } else {
        state.push(action.payload);
      }
    },
  },
});

export const { updateCartItem, incrementCartItem, decrementCart } = cartSlice.actions;

export default cartSlice.reducer;
