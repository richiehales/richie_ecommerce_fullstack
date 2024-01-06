import { configureStore } from '@reduxjs/toolkit';
import searchResultsReducer from '../features/home/homeSlice'
import basketReducer from '../features/basket/basketSlice'

export const store = configureStore({
  reducer: {
    product: searchResultsReducer,
    basket: basketReducer
  },
});
