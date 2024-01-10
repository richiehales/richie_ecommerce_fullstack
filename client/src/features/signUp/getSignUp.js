import { addUser } from '../../api/api';

export const addNewUser = (firstName, lastName, password, email) => async () => {
  try {
    const result = await addUser(firstName, lastName, password, email);

    if (result) {
      console.log(`getSignUp.js result`)
      console.log(result)
      return result
    } else {
      console.error('getSignUp.js - User not added');
    }
  } catch (error) {
    console.error('getSignUp.js - Error adding user data:', error);
    throw error; // Rethrow the error to be caught in the handleSubmit function
  }
};