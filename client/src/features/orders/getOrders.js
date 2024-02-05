import { setOrders } from './ordersSlice';
import { fetchOrdersById } from '../../api/api';
import { setCurrentUser, setAuthenticated, setWebToken } from '../signIn/currentUserSlice';
import { 
  setNotificationType, 
  setNotificationMessage, 
  setNotificationDisplay, 
  setNotificationVertical, 
  setNotificationHorizontal 
  } from '../notifications/notificationsSlice';
import { setBasketList } from '../basket/basketSlice';


export const fetchOrders = (webToken) => async (dispatch) => {
  try {
    const orders = await fetchOrdersById(webToken);
    if (orders.error !== 'Authentication token not provided' && orders.error !== 'Invalid authentication token') {
      dispatch(setOrders(orders));
    } else {
      dispatch(setAuthenticated(false));
      dispatch(setCurrentUser({
        id: null,
        first_name: '',
        last_name: 'Guest',
      }));
      dispatch(setWebToken(''))
      dispatch(setBasketList(``))
      dispatch(setOrders(''))
      dispatch(setNotificationType('error'));
      dispatch(setNotificationVertical('top'));
      dispatch(setNotificationHorizontal('right'));
      dispatch(setNotificationMessage(orders.error)); // Display the specific error message
      dispatch(setNotificationDisplay(true));
    }     
  } catch (error) {
    // Handle errors, log, or dispatch an error action if needed
    console.error('Error fetching products data:', error);
  }
};