import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
  saleItems: [],
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