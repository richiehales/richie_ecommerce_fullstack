import { processPaymentById } from '../../api/api';





// Route to process payment and checkout by user id
/*
Postman - test
POST    http://localhost:3000/checkout/allItems
Body:
{
  "paymentDetails": {
    "cardNumber": "1234123412341234",
    "expiryDate": "02-24",
    "cvc": "123"
  },
  "userId": 1
}
*/


export const proceessPayment = (paymentDetails, userId) => async (dispatch) => {
  console.log('getChekout.js')
  console.log(paymentDetails)
  try {
    const payment = await processPaymentById(
      paymentDetails.cardNumber,
      paymentDetails.cardDate,
      paymentDetails.cvv,
      userId
    );

    console.log('getCheckout.js');
    console.log(payment);

    dispatch({ type: 'PAYMENT_SUCCESS', payload: payment });
    return payment;
  } catch (error) {
    console.error('Error processing payment:', error);
    dispatch({ type: 'PAYMENT_ERROR', payload: error });
    return error;
  }
};