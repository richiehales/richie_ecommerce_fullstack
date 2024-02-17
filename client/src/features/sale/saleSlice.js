import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
  saleItems: [
    {
      id: 1,
      name: 'Running Shoes 1',
      description: 'High-performance running shoes',
      price: 79.99,
    },
  ],
}

export const saleSlice = createSlice({
  name: 'sale',
  initialState,
  reducers: {
    setSale: (state, action) => {
      state.saleItems = action.payload;
    }
  }  
})


export const { setSale} = saleSlice.actions;
export default saleSlice.reducer;