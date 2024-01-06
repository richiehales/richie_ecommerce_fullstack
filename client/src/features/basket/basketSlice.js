import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
  basketList: [],
  badgeCount: 0
}


export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addProductToBasket: (state, action) => {
      state.basketList.push(action.payload);
    },
    removeProductFromBasket: (state, action) => {
      // Use filter to remove the item with the given imdbID
      state.basketList = state.basketList.filter(item => item.id !== action.payload.id);
    },
    setBadgeCount: (state, action) => {
      state.badgeCount = action.payload;
    },
    setBasketList: (state, action) => {
      state.basketList = action.payload;
    },
  }  
})


export const { setBasketList, addProductToBasket, removeProductFromBasket, setBadgeCount } = basketSlice.actions;
export default basketSlice.reducer;