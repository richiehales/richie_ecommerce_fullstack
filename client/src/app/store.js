import { configureStore } from '@reduxjs/toolkit';
import searchResultsReducer from '../features/home/homeSlice'
import basketReducer from '../features/basket/basketSlice'
import currentUserReducer from '../features/signIn/currentUserSlice'
import notificationsReducer from '../features/notifications/notificationsSlice'
import checkoutReducer from '../features/checkout/checkoutSlice'
import ordersReducer from '../features/orders/ordersSlice'

export const store = configureStore({
  reducer: {
    product: searchResultsReducer,
    basket: basketReducer,
    currentUser: currentUserReducer,
    notifications: notificationsReducer,
    checkout: checkoutReducer,
    orders: ordersReducer
  },
});
