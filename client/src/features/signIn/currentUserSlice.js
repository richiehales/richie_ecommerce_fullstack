import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: {
    id: 1,
    password: 'password1',
    email: 'user1@example.com',
    first_name: 'John',
    last_name: 'Doe',
  },
};

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setCurrentUser } = currentUserSlice.actions;
export default currentUserSlice.reducer;