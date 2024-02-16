import { setSearchResults } from '../search/searchSlice';
import { searchProducts } from '../../api/api';

export const fetchSearchData = (queryTerm) => async (dispatch) => {
  console.log('getSearch.js query =', queryTerm)
  try {
    const products = await searchProducts(queryTerm);
    console.log('getSearch.js result =', products)
    dispatch(setSearchResults(products));    
  } catch (error) {
    // Handle errors, log, or dispatch an error action if needed
    console.error('Error fetching products data:', error);
  }
};