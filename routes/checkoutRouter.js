const checkoutRouter = require('express').Router();
const checkoutInstance = require('../models/checkout.js');
const authenticateToken = require('./authenticate.js');


// Route to process payment and checkout by user id
checkoutRouter.post('/allItems', authenticateToken, async (req, res) => {
  try {
    const paymentDetails = req.body.paymentDetails;
    const userId = req.userResponse.id;

    // Call checkout function in checkoutInstance
    const result = await checkoutInstance.processPaymentAndCheckoutAllItems(paymentDetails, userId);

    res.send(result);
  } catch (error) {
    
    // Check if the error is an instance of your custom error
    if (error.message === 'Invalid payment details. Please provide cardNumber, expiryDate, and cvc.') {
      // Send the custom error message to Postman with a 400 status code
      res.status(400).json({ error: error.message });
    } else {
      // Handle other errors as needed
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});


module.exports = checkoutRouter;
