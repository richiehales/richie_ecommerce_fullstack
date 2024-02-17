import { setSearchResults } from '../search/searchSlice';
import { searchProducts } from '../../api/api';
import { setSearchTerm } from '../search/searchSlice';

export const fetchSearchData = (queryTerm) => async (dispatch) => {
  console.log('getSearch.js query =', queryTerm)
  try {
    const products = await searchProducts(queryTerm);
    console.log('getSearch.js result =', products)
    dispatch(setSearchResults(products));    
  } catch (error) {
    // Handle errors, log, or dispatch an error action if needed
    dispatch(setSearchTerm('NO MATCHES'))
    dispatch(setSearchResults());
    console.error('Error fetching products data:', error);
  }
};