import { setCurrentUser } from './currentUserSlice';
import { getUserByEmail } from '../../api/api';
import { fetchBasketData } from '../basket/getBasket'

export const fetchUser = (email, password) => async (dispatch) => {  
  try {
    const users = await getUserByEmail(email);
    const user = users[0];
    if (users.length > 0 & user.password === password) {
      
      dispatch(setCurrentUser(user));
      dispatch(fetchBasketData(user.id));   
    } else {
      // Handle the case where no user is found with the given email
    }
  } catch (error) {
    // Handle errors, log, or dispatch an error action if needed
    console.error('Error fetching user data:', error);
  }
};