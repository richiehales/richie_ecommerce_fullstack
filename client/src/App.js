import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './features/header/Header';
import Footer from './features/footer/Footer'
// import Home from './features/home/Home';
import { Home } from './features/home/Home';
import { Basket } from './features/basket/Basket';
import SignIn from './features/signIn/SignIn';
import SignUp from './features/signUp/SignUp';
import Checkout from './features/checkout/Checkout';



function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/Basket" element={ <Basket /> } />
        <Route path="/SignIn" element={ <SignIn /> } />
        <Route path="/SignUp" element={ <SignUp /> }/>
        <Route path="/Checkout" element={ <Checkout /> }/>
      </Routes> 
      <Footer />      
    </>
  );
}

export default App;