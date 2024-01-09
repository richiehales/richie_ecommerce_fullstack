import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: {
    
  },
  authenticated: false,
};

export const currentUserSlice = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setAuthenticated: (state, action) => {
      state.authenticated = action.payload;
    },
  },
});

export const { setCurrentUser, setAuthenticated } = currentUserSlice.actions;
export default currentUserSlice.reducer;