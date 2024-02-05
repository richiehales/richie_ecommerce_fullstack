const orderRouter = require('express').Router();
const orderInstance = require('../models/order.js');
const authenticateToken = require('./authenticate.js');


const secretKey = 'your-secret-key';


/*
// Get all orders
// http://localhost:3000/order
orderRouter.get('/', async (req, res) => {
  
  try{
      const orderList = await orderInstance.getAllOrders();
      res.json(orderList); 
  } catch(err){
      res.status(400).send(err);
  }
})
*/


// Get order by user_id
// http://localhost:3000/order/ 
orderRouter.get('/', authenticateToken, async (req, res) => {

  let id = req.userResponse.id;

  try {
      const order = await orderInstance.getOrderByUserId(id);
      if (!order) 
        return res.status(404).send('Invalid order number');
      
      res.json(order);
  } catch(error) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
})


// Copy basket item to order_user and orders when basket id - NOT USED
/*
Postman - test
POST    http://localhost:3000/order/copyBasketToOrders
Body:
{"basketId": 1}
*/
orderRouter.post('/copyBasketToOrders', async (req, res) => {
  
  try {
    const { basketId } = req.body;

    if (!basketId) {
      return res.status(400).send('Please provide basketId in the request body.');
    }

    const result = await orderInstance.copyBasketToOrders(basketId);

    if (!result) {
      return res.status(404).send('Basket with the given ID not found.');
    }

    res.send(result);
  } catch (error) {
    res.status(500).send(error.stack);
  }
});


// Copy basket item to order_user and orders when user id
/*
Postman - test
POST    http://localhost:3000/order/copyBasketToOrdersUserId
Body:
{"userId": 1}
*/
orderRouter.post('/copyBasketToOrdersUserId', async (req, res) => {
  
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).send('Please provide userId in the request body.');
    }

    const result = await orderInstance.copyBasketToOrdersUserId(userId);

    if (!result) {
      return res.status(404).send('Basket with the given ID not found.');
    }

    res.send(result);
  } catch (error) {
    res.status(500).send(error.stack);
  }
});


module.exports = orderRouter;


