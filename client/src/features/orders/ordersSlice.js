import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
  orders: [
    {
      id: 1,
      name: 'Running Shoes 1',
      price: 79.99,
      description: 'High-performance running shoes',
      category: 'running shoes',
    },
    {
      id: 2,
      name: 'Running Shoes 2',
      price: 89.99,
      description: 'Lightweight and breathable running shoes',
      category: 'running shoes',
    },
    // Add more products as needed
  ],
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload;
    }
  }  
})


export const { setOrders } = ordersSlice.actions;
export default ordersSlice.reducer;