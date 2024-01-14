import { setOrders } from './ordersSlice';
import { fetchOrdersById } from '../../api/api';

export const fetchOrders = (userId) => async (dispatch) => {
  console.log(userId)
  try {
    const orders = await fetchOrdersById(userId);
    dispatch(setOrders(orders));    
  } catch (error) {
    // Handle errors, log, or dispatch an error action if needed
    console.error('Error fetching products data:', error);
  }
};