import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './features/header/Header';
import Footer from './features/footer/Footer'
// import Home from './features/home/Home';
import { Home } from './features/home/Home';
import { Basket } from './features/basket/Basket';


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/WatchList" element={ <Basket /> } />
      </Routes> 
      <Footer />      
    </>
  );
}

export default App;