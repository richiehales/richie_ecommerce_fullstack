import { processPaymentById } from '../../api/api';


export const proceessPayment = (paymentDetails, webToken) => async (dispatch) => {
  try {
    const payment = await processPaymentById(
      paymentDetails.cardNumber,
      paymentDetails.cardDate,
      paymentDetails.cvv,
      webToken
    );

    dispatch({ type: 'PAYMENT_SUCCESS', payload: payment });
    return payment;
  } catch (error) {
    console.error('Error processing payment:', error);
    dispatch({ type: 'PAYMENT_ERROR', payload: error });
    return error;
  }
};