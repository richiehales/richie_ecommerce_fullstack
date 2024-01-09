// getSignIn.js
import { setCurrentUser, setAuthenticated } from './currentUserSlice';
import { getUserByEmail } from '../../api/api';
import { fetchBasketData } from '../basket/getBasket';

export const fetchUser = (email, password) => async (dispatch) => {
  try {
    const users = await getUserByEmail(email, password);
    

    if (users) {
      const user = users;

      if (user.password === password) {
        dispatch(setCurrentUser(user));
        dispatch(setAuthenticated(true));
        dispatch(fetchBasketData(user.id));
      } else {
        
        console.error('Invalid login credentials');
      }
    } else {
      dispatch(setAuthenticated(false));
      console.error('User not found');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};
