// checkoutSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shippingAddress: {
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    saveAddress: false,
  },
  paymentDetails: {
    cardName: '',
    cardNumber: '',
    cardDate: '',
    cvv: '',
    saveCard: false,
  }
};

export const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setShippingFirstName: (state, action) => {
      state.shippingAddress.firstName = action.payload;
    },
    setShippingLastName: (state, action) => {
      state.shippingAddress.lastName = action.payload;
    },
    setShippingAddress1: (state, action) => {
      state.shippingAddress.address1 = action.payload;
    },
    setShippingAddress2: (state, action) => {
      state.shippingAddress.address2 = action.payload;
    },
    setShippingCity: (state, action) => {
      state.shippingAddress.city = action.payload;
    },
    setShippingState: (state, action) => {
      state.shippingAddress.state = action.payload;
    },
    setShippingZip: (state, action) => {
      state.shippingAddress.zip = action.payload;
    },
    setShippingCountry: (state, action) => {
      state.shippingAddress.country = action.payload;
    },
    setSaveShippingAddress: (state, action) => {
      state.shippingAddress.saveAddress = action.payload;
    },
    setShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    setCardName: (state, action) => {
      state.paymentDetails.cardName = action.payload;
    },
    setCardNumber: (state, action) => {
      state.paymentDetails.cardNumber = action.payload;
    },
    setCardDate: (state, action) => {
      state.paymentDetails.cardDate = action.payload;
    },
    setCardCvv: (state, action) => {
      state.paymentDetails.cvv = action.payload;
    },
    setSaveCard: (state, action) => {
      state.paymentDetails.saveCard = action.payload;
    },
  },
});

export const {
  setShippingFirstName,
  setShippingLastName,
  setShippingAddress1,
  setShippingAddress2,
  setShippingCity,
  setShippingState,
  setShippingZip,
  setShippingCountry,
  setSaveShippingAddress,
  setShippingAddress,
  setCardName,
  setCardNumber,
  setCardDate,
  setCardCvv,
  setSaveCard
} = checkoutSlice.actions;

export default checkoutSlice.reducer;

