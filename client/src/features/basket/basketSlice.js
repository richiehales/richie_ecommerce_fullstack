import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
  basketList: [],
}


export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addProductToBasket: (state, action) => {
      state.basketList.push(action.payload);
    },    
    setBasketList: (state, action) => {
      state.basketList = action.payload;
    },
  }  
})


export const { setBasketList, addProductToBasket } = basketSlice.actions;
export default basketSlice.reducer;