const express = require('express');
const app = express();
const userRouter = require('express').Router();
const userInstance = require('../models/user.js');
const jwt = require('jsonwebtoken')

app.use(express.json());

const secretKey = 'your-secret-key';

// Get all users
// http://localhost:3000/user
userRouter.get('/', async (req, res) => {

  try{
      const userList = await userInstance.getAllUsers();
      res.json(userList); 
  } catch(err){
      res.status(400).send(err);
  }
})


// Get user by id
// http://localhost:3000/user/1
userRouter.get('/:id', async (req, res) => {

  let id = req.params.id;

  try {
      const user = await userInstance.getUserById(id);
      if(!user) return res.status(404).send('Invalid user number');
      res.json(user);
  } catch(err) {
      res.status(400).send(err);
  }
})


// Get user by email and check password - Login
// http://localhost:3000/user/email/
/*
Postman - test
POST    http://localhost:3000/user/email/
Body: {"email":"user1@example.com","password":"password1"}
*/
userRouter.post('/email', async (req, res) => {
  const { email, password } = req.body;

  try {
    const users = await userInstance.getUserByEmail(email);

    if (users.length === 0) {
      return res.status(404).send('User does not exist');
    }

    const user = users[0];

    if (user.password !== password) {
      
      return res.status(401).send('Incorrect password');
    }
    
    const userResponse = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name
    };

    const userId = userResponse.id

    const accessToken = jwt.sign(userResponse, secretKey)
    console.log('userRouter.js', {accessToken: accessToken})  

    res.json({
      user: userResponse,
      accessToken: accessToken
    });

  } catch (err) {
    res.status(400).send(err);
  }
});



// Delete user by id
/*
Postman - test
DELETE    http://localhost:3000/user/delete/3
*/
userRouter.delete('/delete/:id', async (req, res) => {
  let id = req.params.id;

  try {
    const deleteResult = await userInstance.deleteUserById(id);

    if (!deleteResult) {
      return res.status(404).send('Invalid user number');
    }

    // Access the success message and deleted product details
    const { successMessage, deletedUser } = deleteResult;

    // Send the success message and deleted product details in the response
    res.json({ message: successMessage, deletedUser });
  } catch (err) {
    res.status(400).send(err);
  }
});


// Add / Register user to user_info table (Also in loginRouter - with HTML in views)
/*
Postman - test
POST    http://localhost:3000/user/registerUser
Body: { "password": "password4", "email": "user4@example.com", "first_name": "Richie", "last_name": "Hales" }
*/
userRouter.post('/registerUser', async (req, res) => {
  try {
    const { password, email, first_name, last_name } = req.body;

    if (!password || !email || !first_name || !last_name) {
      return res.status(400).send('Please provide password, email, first_name and last_name in the request body.');
    }

    const registrationResult = await userInstance.registerUser(password, email, first_name, last_name);

    if (registrationResult.success) {
      // Successfully registered
      res.json({ success: true, message: registrationResult.message });
    } else {
      // Failed registration
      res.status(400).json({ success: false, message: registrationResult.message });
    }
  } catch (error) {
    console.error('Error:', error); // Log the error to the console
    res.status(500).send('Internal Server Error');
  }
});



// Update user by id
/*
Postman - test
PUT     http://localhost:3000/user/updateUser/4
Body: { { "password": "password4-Updated", "email": "user4@example.com-Updated", "first_name": "Richie-Updated", "last_name": "Hales-Updated" } }
*/
userRouter.put('/updateUser/:id', async (req, res) => {
  let id = req.params.id;

  try {
    const { password, email, first_name, last_name } = req.body;

    if (!password || !email || !first_name || !last_name) {
      return res.status(400).send('Please provide password, email, first_name and last_name in the request body.');
    }

    const updatedUser = await userInstance.updateUserById(id, password, email, first_name, last_name);

    if (!updatedUser) {
      return res.status(404).send('Invalid user id');
    }

    res.json({ message: 'User updated successfully', updatedUser });
  } catch (error) {
    console.error('Error:', error); // Log the error to the console
    res.status(500).send('Internal Server Error');
  }
});




module.exports = userRouter