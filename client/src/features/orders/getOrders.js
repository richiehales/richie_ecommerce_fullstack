import { setOrders } from './ordersSlice';
import { fetchOrdersById } from '../../api/api';

export const fetchOrders = (webToken) => async (dispatch) => {
  try {
    const orders = await fetchOrdersById(webToken);
    dispatch(setOrders(orders));    
  } catch (error) {
    // Handle errors, log, or dispatch an error action if needed
    console.error('Error fetching products data:', error);
  }
};