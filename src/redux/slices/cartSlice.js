import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const cartSlice = createSlice({
  name: 'CART',
  initialState,
  reducers: {
    incrementCart: (state, action) => {
      const objKey = Object.keys(action.payload)[0];
      state[objKey].count = state[objKey].count + 1;
    },
    decrementCart: (state, action) => {
      const objKey = Object.keys(action.payload)[0];
      state[objKey].count = state[objKey].count - 1;
      if (state[objKey].count < 1) {
        delete state[objKey];
        console.log('delete');
      }
    },

    updateCartItem: (state, action) => {
      const obj = action.payload;
      const objKey = Object.keys(obj)[0];
      console.log(obj[objKey].id in state);
      // const itemInCart = state.includes(objId);
      // const itemIndex = action.id;
      console.log('start');
      if (objKey in state) {
        console.log('find');
        state[objKey] = action.payload[objKey];
        if (state[objKey].count < 1) {
          delete state[objKey];
          console.log('delete');
        }
      } else {
        console.log('not find');
        state[objKey] = action.payload[objKey];
        state[objKey].count = 1;
      }

      // else {
      //  else {
      //   state[objKey] = { ...state[objKey], attributes: {} };
      //   console.log('count + 1');
      // }
      // }
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateCartItem, incrementCart, decrementCart } = cartSlice.actions;

export default cartSlice.reducer;
