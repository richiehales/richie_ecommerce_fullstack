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
