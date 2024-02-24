import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
  productSizes: [], // Array to store objects with productId: size values
};

export const productSizeSlice = createSlice({
  name: 'productSize',
  initialState,
  reducers: {
    setProductSize: (state, action) => {
      const { productId, size } = action.payload;

      // Check if product already has a size entry
      const existingProductIndex = state.productSizes.findIndex(entry => entry.productId === productId);

      if (existingProductIndex !== -1) {
        // Update size if entry exists
        state.productSizes[existingProductIndex].size = size;
      } else {
        // Add new entry if productId not found
        state.productSizes.push({ productId, size });
      }
    },
  },
});

export const { setProductSize } = productSizeSlice.actions;
export const selectProductSizes = (state) => state.productSize.productSizes;

export default productSizeSlice.reducer;