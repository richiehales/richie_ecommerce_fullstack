import { fetchbasketById, addProductToBasketByUserId, getBasketId, deleteByBasketId } from '../../api/api';
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
    console.log('getBasket.js - after')
    console.log(products)
    dispatch(setBasketList(products)); // Assuming setBasketList updates the basketList in your Redux store
    return products
  } catch (error) {
    console.log('getBasket.js - error')
    console.error(error)
    return error
  }
};


export const deleteProductFromBasket = (userId, productId) => async (dispatch) => {
  try {
    const basketId = await getBasketId(userId, productId);
    if (basketId) {
      await deleteByBasketId(basketId);
      const updatedProducts = await fetchbasketById(userId); // Fetch the updated basket data
      dispatch(setBasketList(updatedProducts));
    } else {
      console.log(`No basket id found`);
    }
  } catch (error) {
    console.error('Error deleting product from basket:', error);
  }
};