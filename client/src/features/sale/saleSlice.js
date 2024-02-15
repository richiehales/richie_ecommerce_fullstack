import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
  saleItems: [
    {
      id: 1,
      name: 'Running Shoes 1',
      price: 79.99,
      description: 'High-performance running shoes',
      category: 'running shoes',
    }
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