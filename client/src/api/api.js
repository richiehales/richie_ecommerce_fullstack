// const SEARCH = 'https://www.omdbapi.com/?s='
// const apiKey = '6910fcce'


// Get all products
// http://localhost:3000/product
const allProducts = 'http://localhost:3000/product'
export const fetchProducts = async () => {
  try {
    const response = await fetch(allProducts);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json(); 
    return data;
  } catch (error) {
    // Handle errors, log, or throw as necessary  
    throw error;
  }
};

// Get basket by user_id
// http://localhost:3000/cart/1
const basketByIdAPI = 'http://localhost:3000/cart/'
export const fetchbasketById = async (id) => {
  const userId = id
  try {
    const response = await fetch(`${basketByIdAPI}${userId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const data = await response.json(); 
    return data;
  } catch (error) {
    // Handle errors, log, or throw as necessary  
    throw error;
  }
};


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
const addProductToBasketByUserIdAPI = `http://localhost:3000/cart/addUserAndProduct`;

export const addProductToBasketByUserId = async (userId, productId, quantity) => {
  try {
    const response = await fetch(addProductToBasketByUserIdAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        productId,
        quantity,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Handle errors, log, or throw as necessary
    throw error;
  }
};


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
const getBasketIdAPI = `http://localhost:3000/cart/getBasketId`;

export const getBasketId = async (userId, productId) => {
  try {
    const basketId = await fetch(getBasketIdAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        productId,
      }),
    });

    if (!basketId.ok) {
      throw new Error('Network response was not ok.');
    }

    const data = await basketId.json();
    return data;
  } catch (error) {
    // Handle errors, log, or throw as necessary
    throw error;
  }
};


// Delete basket item by id
/*
Postman - test
DELETE    http://localhost:3000/cart/updateBasket/delete/1
*/
const deleteByBasketIdAPI = 'http://localhost:3000/cart/updateBasket/delete/'
export const deleteByBasketId = async (basketId) => {
  try {
    const response = await fetch(`${deleteByBasketIdAPI}${basketId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Handle errors, log, or throw as necessary
    throw error;
  }
};
