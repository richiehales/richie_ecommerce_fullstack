import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [
    {
      id: 1,
      name: 'Running Shoes 1',
      price: 79.99,
      description: 'High-performance running shoes',
      category: 'running shoes',
    },
    {
      id: 2,
      name: 'Running Shoes 2',
      price: 89.99,
      description: 'Lightweight and breathable running shoes',
      category: 'running shoes',
    },
    // Add more products as needed
  ]
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    }
  }  
})


export const { setProducts, setProductSearchTerm } = productsSlice.actions;
export default productsSlice.reducer;