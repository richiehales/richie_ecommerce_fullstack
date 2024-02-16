import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchResults: [
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
  searchTerm: 'Search term in searchSlice - productSearchTerm'
}

export const searchResultsSlice = createSlice({
  name: 'searchResults',
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      state.products = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    }
  }  
})


export const { setSearchResults, setSearchTerm } = searchResultsSlice.actions;
export default searchResultsSlice.reducer;