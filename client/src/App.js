import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './features/header/Header';
import  UserNotification from './features/notifications/UserNotification'
import Footer from './features/footer/Footer'
import { Home } from './features/home/Home';
import { Basket } from './features/basket/Basket';
import { Search } from './features/search/Search';
import SignIn from './features/signIn/SignIn';
import SignUp from './features/signUp/SignUp';
import Checkout from './features/checkout/Checkout';
import Orders from './features/orders/Orders';



function App() {
  return (
    <>
      <Header />
      < UserNotification />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/Search" element={ <Search /> } />
        <Route path="/Basket" element={ <Basket /> } />
        <Route path="/SignIn" element={ <SignIn /> } />
        <Route path="/SignUp" element={ <SignUp /> }/>
        <Route path="/Checkout" element={ <Checkout /> }/>
        <Route path="/Orders" element={ <Orders /> }/>
      </Routes> 
      <Footer />      
    </>
  );
}

export default App;