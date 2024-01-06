import { fetchbasketById } from '../../api/api';
import { setBasketList } from './basketSlice';

export const fetchBasketData = (userId) => async (dispatch) => {
  
  try {
    const products = await fetchbasketById(userId);
    dispatch(setBasketList(products));    
  } catch (error) {
    // Handle errors, log, or dispatch an error action if needed
    console.error('Error fetching products data:', error);
  }
};