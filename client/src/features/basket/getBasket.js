import { fetchbasketById, addProductToBasketByUserId, getBasketId } from '../../api/api';
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


export const addProductToBasket = (userId, productId, quantity) => async (dispatch) => {
  try {
    const products = await addProductToBasketByUserId(userId, productId, quantity);
    console.log(products)
    dispatch(setBasketList(products)); // Assuming setBasketList updates the basketList in your Redux store
  } catch (error) {
    return error
  }
};


export const deletProductFromBasket = (userId, productId) => async (dispatch) => {
  console.log(`delete run`)
  try {
    const basketId = await getBasketId(userId, productId);
    console.log(basketId)
    } catch (error) {
    return error
  }
};