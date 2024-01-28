// getSignIn.js
import { setCurrentUser, setAuthenticated } from './currentUserSlice';
import { getUserByEmail } from '../../api/api';
import { fetchBasketData } from '../basket/getBasket';

export const fetchUser = (email, password) => async (dispatch) => {
  try {
    const users = await getUserByEmail(email, password);

    if (users) {
      const user = users;

      if (user) {
        dispatch(setCurrentUser(user));
        dispatch(setAuthenticated(true));
        dispatch(fetchBasketData(user.id));

        // Return the user data or any other result
        return user;
      } else {
        console.error('Invalid login credentials');
      }
    } else {
      dispatch(setAuthenticated(false));
      console.error('User not found');
    }
  } catch (error) {
    console.error('getSignIn.js - Error fetching user data:', error);
    throw error; // Rethrow the error to be caught in the handleSubmit function
  }
};
