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
  ],
  productSearchTerm: 'Search term in homeSlice - productSearchTerm'
}

export const searchResultsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setProductSearchTerm: (state, action) => {
      state.productSearchTerm = action.payload;
    }
  }  
})


export const { setProducts, setProductSearchTerm } = searchResultsSlice.actions;
export default searchResultsSlice.reducer;