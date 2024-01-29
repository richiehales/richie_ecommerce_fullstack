import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: {
    
  },
  authenticated: false,
  webToken: '',
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
    setWebToken: (state, action) => {
      state.webToken = action.payload;
    },
  },
});

export const { setCurrentUser, setAuthenticated, setWebToken } = currentUserSlice.actions;
export default currentUserSlice.reducer;