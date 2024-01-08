import { configureStore } from '@reduxjs/toolkit';
import searchResultsReducer from '../features/home/homeSlice'
import basketReducer from '../features/basket/basketSlice'
import currentUserReducer from '../features/signIn/currentUserSlice'

export const store = configureStore({
  reducer: {
    product: searchResultsReducer,
    basket: basketReducer,
    currentUser: currentUserReducer
  },
});
