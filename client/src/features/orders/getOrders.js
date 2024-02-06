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

    if (orders) {
      dispatch(setOrders(orders));
    } 

  } catch (error) {
    console.log('getOrders.js error =', error)
    dispatch(setBasketList(``))
    dispatch(setOrders(''))
    dispatch(setNotificationType('error'));
    dispatch(setNotificationVertical('top'));
    dispatch(setNotificationHorizontal('right'));
    dispatch(setNotificationMessage(error.message)); // Display the specific error message
    dispatch(setNotificationDisplay(true));
    dispatch(setAuthenticated(false));
    dispatch(setCurrentUser({
      id: null,
      first_name: '',
      last_name: 'Guest',
    }));
    
    dispatch(setBasketList(``))
    dispatch(setOrders(''))
    if (error.message !== 'Authentication token has expired') {
      dispatch(setWebToken(''))
    }
    console.error('Error fetching products data:', error);
  }
};