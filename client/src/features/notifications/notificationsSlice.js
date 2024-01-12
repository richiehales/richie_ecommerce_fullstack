import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
  notificationType: 'error',
  notificationMessage: 'test',
  notificationDisplay: false,
  notificationVertical: 'top',
  notificationHorizontal: 'right',
}


export const notificationsSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {    
    setNotificationType: (state, action) => {
      state.notificationType = action.payload;
    },
    setNotificationMessage: (state, action) => {
      state.notificationMessage = action.payload;
    },
    setNotificationDisplay: (state, action) => {
      state.notificationDisplay = action.payload;
    },
    setNotificationHorizontal: (state, action) => {
      state.notificationHorizontal = action.payload;
    },
    setNotificationVertical: (state, action) => {
      state.notificationVertical = action.payload;
    },    
  }  
})


export const { 
  setNotificationType, 
  setNotificationMessage, 
  setNotificationDisplay,
  setNotificationVertical,
  setNotificationHorizontal, } = notificationsSlice.actions;

export default notificationsSlice.reducer;