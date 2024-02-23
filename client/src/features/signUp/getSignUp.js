import { addUser } from '../../api/api';

export const addNewUser = (firstName, lastName, password, email) => async () => {
  try {
    const result = await addUser(firstName, lastName, password, email);

    return result
    
  } catch (error) {
    console.error('getSignUp.js - Error adding user data:', error);
    throw error; 
  }
};