import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
  shippingAddress: [],
}


export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    addShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },    
    
  }  
})


export const { addShippingAddress } = checkoutSlice.actions;
export default checkoutSlice.reducer;