if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

console.log('app.js process.env', process.env.DB_HOST)

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const passport = require('passport');
const productRouter = require('./routes/productRouter');
const cartRouter = require('./routes/cartRouter');
const userRouter = require('./routes/userRouter');
const orderRouter = require('./routes/orderRouter');
const checkoutRouter = require('./routes/checkoutRouter');
const flash = require('express-flash');
const session = require('express-session');


app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use(flash());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


// Test server - http://localhost:3000/testing
app.get('/testing', (req, res) => {
  res.send('Testing Basic Route - Success');
});

// Home - http://localhost:3000
app.get('/', (req, res) => {
  res.send('Ecommerce Portfolio Proect');
});

app.use(express.json());
app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use('/user', userRouter);
app.use('/order', orderRouter);
app.use('/checkout', checkoutRouter);

app.use(express.json());

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
