import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/home/homeSlice'
import searchReducer from '../features/search/searchSlice'
import basketReducer from '../features/basket/basketSlice'
import currentUserReducer from '../features/signIn/currentUserSlice'
import notificationsReducer from '../features/notifications/notificationsSlice'
import checkoutReducer from '../features/checkout/checkOutSlice'
import ordersReducer from '../features/orders/ordersSlice'
import saleReducer from '../features/sale/saleSlice'
import productSizeReducer from '../features/sizeSelector/sizeSelectorSlice'


export const store = configureStore({
  reducer: {
    product: productsReducer,
    basket: basketReducer,
    currentUser: currentUserReducer,
    notifications: notificationsReducer,
    checkout: checkoutReducer,
    orders: ordersReducer,
    sale: saleReducer,
    search: searchReducer,
    size: productSizeReducer,
  },
});
