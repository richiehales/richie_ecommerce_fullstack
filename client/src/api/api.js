// const SEARCH = 'https://www.omdbapi.com/?s='
// const apiKey = '6910fcce'
const baseUrl = process.env.DATABASE_URL || 'http://localhost:3000/';
console.log(`Datbase URL =`, baseUrl)


// Get all products
// http://localhost:3000/product
const allProducts = 'product'
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${baseUrl}${allProducts}`);
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
const basketByIdAPI = 'cart/'
export const fetchbasketById = async (id) => {
  const userId = id
  try {
    const response = await fetch(`${baseUrl}${basketByIdAPI}${userId}`);
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
const addProductToBasketByUserIdAPI = `cart/addUserAndProduct`;

export const addProductToBasketByUserId = async (userId, productId, quantity, webToken) => {
  try {
    const response = await fetch(`${baseUrl}${addProductToBasketByUserIdAPI}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${webToken}`,
      },
      body: JSON.stringify({
        userId,
        productId,
        quantity,
      }),
    });

    if (!response.ok) {
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        throw new Error(data.error || 'Unknown server error');
      } else {
        const text = await response.text();
        throw new Error(`Non-JSON response: ${text}`);
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('api.js error =', error)
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
const getBasketIdAPI = `cart/getBasketId`;

export const getBasketId = async (userId, productId) => {
  try {
    const basketId = await fetch(`${baseUrl}${getBasketIdAPI}`, {
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
const deleteByBasketIdAPI = 'cart/updateBasket/delete/'
export const deleteByBasketId = async (basketId) => {
  try {
    const response = await fetch(`${baseUrl}${deleteByBasketIdAPI}${basketId}`, {
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


// Get user by email and check password
// http://localhost:3000/user/email/
/*
Postman - test
POST    http://localhost:3000/user/email/
Body: {"email":"user1@example.com","password":"password1"}
*/
const getUserByEmailAPI = 'user/email/';
export const getUserByEmail = async (email, password) => {
  try {
    const response = await fetch(`${baseUrl}${getUserByEmailAPI}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok - api.js.');
    }
    
    const data = await response.json();

    return data;
  } catch (error) {
    // Handle errors, log, or throw as necessary
    throw error;
  }
};


// Add / Register user to user_info table (Also in loginRouter - with HTML in views)
/*
Postman - test
POST    http://localhost:3000/user/registerUser
Body: { "password": "password4", "email": "user4@example.com", "first_name": "Richie", "last_name": "Hales" }
*/
const addUserAPI = 'user/registerUser';
export const addUser = async (first_name, last_name, password, email) => {
  try {
    const response = await fetch(`${baseUrl}${addUserAPI}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password,
        email,
        first_name,
        last_name,           
      }),
    });


    if (!response.ok) {
      throw new Error('Network response was not ok - api.js.');
    }
    
    const data = await response.json();

    return data;
  } catch (error) {
    // Handle errors, log, or throw as necessary
    throw error;
  }
};


// Route to process payment and checkout by basket id
/*
Postman - test
POST    http://localhost:3000/checkout/allItems
Headers:
  Content-Type: application/json
  Authorization: Bearer {{webToken}}
Body:
{
  "paymentDetails": {
    "cardNumber": "1234123412341234",
    "expiryDate": "02-24",
    "cvc": "123"
  }
}
*/
const paymentAPI = 'checkout/allItems';

export const processPaymentById = async (cardNumber, cardDate, cvc, webToken) => {
  try {
    const response = await fetch(`${baseUrl}${paymentAPI}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${webToken}`, // Include the webToken in the headers for authentication
      },
      body: JSON.stringify({
        paymentDetails: {
          cardNumber,
          expiryDate: cardDate,
          cvc,
        },
      }),
    });

    if (!response.ok) {
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        return { error: data.error || 'Unknown server error' };
      } else {
        const text = await response.text();
        return { error: `Non-JSON response: ${text}` };
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return { error: error.message || 'Unknown error' };
  }
};



// Get order by user_id - jwt
const fetchOrdersByIdAPI = 'order/';

export const fetchOrdersById = async (webToken) => {
  try {
    const response = await fetch(`${baseUrl}${fetchOrdersByIdAPI}`, {
      headers: {
        Authorization: `Bearer ${webToken}`,
      },
    });

    if (!response.ok) {
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        throw new Error(data.error || 'Unknown server error');
      } else {
        const text = await response.text();
        throw new Error(`Non-JSON response: ${text}`);
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('api.js fetchbasketById =', error)
    throw error;
  }
};


// Search products
// http://localhost:3000/product/search?query=socks
const searchProductsAPI = 'product/search';

export const searchProducts = async (queryTerm) => {
  try {
    const response = await fetch(`${baseUrl}${searchProductsAPI}?query=${queryTerm}`);
    
    if (!response.ok) {
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        throw new Error(data.error || 'Unknown server error');
      } else {
        const text = await response.text();
        throw new Error(`Non-JSON response: ${text}`);
      }
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('api.js searchProducts error =', error);
    throw error;
  }
};