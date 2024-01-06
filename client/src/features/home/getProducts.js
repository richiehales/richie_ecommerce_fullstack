import { setProducts } from './homeSlice';
import { fetchProducts } from '../../api/api';

export const fetchProductsData = () => async (dispatch) => {
  try {
    const products = await fetchProducts();
    dispatch(setProducts(products));    
  } catch (error) {
    // Handle errors, log, or dispatch an error action if needed
    console.error('Error fetching products data:', error);
  }
};

