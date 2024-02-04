const cartRouter = require('express').Router();
const cartInstance = require('../models/cart.js');
const authenticateToken = require('./authenticate.js');


// Get all baskets
// http://localhost:3000/cart
cartRouter.get('/', async (req, res) => {

  try{
      const basketList = await cartInstance.getAllBaskets();
      res.json(basketList); 
  } catch(err){
      res.status(400).send(err);
  }
})


// Get basket by user_id
// http://localhost:3000/cart/1
cartRouter.get('/:id', async (req, res) => {

  let id = req.params.id;

  try {
      const basket = await cartInstance.getBasketByUserId(id);
      if(!basket) return res.status(404).send('Invalid product number');
      res.json(basket);
  } catch(err) {
      res.status(400).send(err);
  }
})


// Add user to cart_user and product/quantity to basket
/*
Postman - test
POST    http://localhost:3000/cart/addUserAndProduct
Body:
{
  "userId": 1,
  "productId": 2,
  "quantity": 3
}
*/
cartRouter.post('/addUserAndProduct', authenticateToken, async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || !quantity) {
      return res.status(400).json({ error: 'Please provide userId, productId, and quantity in the request body.' });
    }

    await cartInstance.addUserAndProduct(userId, productId, quantity);
    res.json({ success: true, message: 'Successfully inserted into cart and cart_product.' });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
});


// Update basket by id
/*
Postman - test
PUT     http://localhost:3000/cart/updateBasket/2
Body: {"cart_id":1,"product_id":2,"quantity":100}   
******* Depending on cart structure.info - Must update all id's correctly or can swap to another user basket through cart_id ******
*/
cartRouter.put('/updateBasket/:id', async (req, res) => {
  let id = req.params.id;

  try {
    const { cart_id, product_id, quantity } = req.body;

    if (!cart_id || !product_id || !quantity) {
      return res.status(400).send('Please provide name, price, description, and category in the request body.');
    }

    const updatedCart = await cartInstance.updateBasketById(id, cart_id, product_id, quantity);

    if (!updatedCart) {
      return res.status(404).send('Invalid basket number');
    }

    res.json({ message: 'Basket updated successfully', updatedCart });
  } catch (error) {
    console.error('Error:', error); // Log the error to the console
    res.status(500).send('Internal Server Error');
  }
});


// Delete cart item by id
/*
Postman - test
DELETE    http://localhost:3000/cart/updateBasket/delete/2
*/
cartRouter.delete('/updateBasket/delete/:id', async (req, res) => {
  let id = req.params.id;

  try {
    const deleteResult = await cartInstance.deleteCartItemById(id);

    if (!deleteResult) {
      return res.status(404).send('Invalid cart number');
    }

    // Access the success message and deleted product details
    const { successMessage, deletedCartItem } = deleteResult;

    // Send the success message and deleted product details in the response
    res.json({ message: successMessage, deletedCartItem });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get basket id with user id and item id
/*
Postman - test
POST    http://localhost:3000/cart/getBasketId
Body:
{
  "userId": 1,
  "productId": 7
}
*/
cartRouter.post('/getBasketId', async (req, res) => {
  try {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res.status(400).send('Please provide userId and productId in the request body.');
    }

    const basketIdResult = await cartInstance.getBasketId(userId, productId);

    if (basketIdResult && basketIdResult.rows.length > 0) {
      const basketId = basketIdResult.rows[0].basket_id;
      res.send(basketId.toString()); // Return the basketId as a string in the response
    } else {
      res.status(404).send('Basket id not found');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});


// Get basket id with user id
/*
GET    http://localhost:3000/cart/getBasketId/1
*/
cartRouter.post('/getBasketId/:id', async (req, res) => {
  console.log(`cartRouter.js run`, req.params.id)
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).send('Please provide userId as a route parameter.');
    }

    const basketIdResult = await cartInstance.getBasketIdFromUser(userId);

    if (basketIdResult) {
      const basketId = basketIdResult.rows[0]?.basket_id;
      
      if (basketId) {
        res.send(basketId.toString()); // Return the basketId as a string in the response
      } else {
        res.status(404).send('Basket id not found for the provided user id.');
      }
    } else {
      res.status(500).send('Internal Server Error');
    }
  } catch (error) {
    console.error('Error:', error); // Log the error to the console
    res.status(500).send('Internal Server Error');
  }
});

module.exports = cartRouter;