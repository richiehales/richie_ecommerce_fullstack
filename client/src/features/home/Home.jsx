import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  setNotificationType, 
  setNotificationMessage, 
  setNotificationDisplay, 
  setNotificationVertical, 
  setNotificationHorizontal 
  } from '../notifications/notificationsSlice';
import { fetchBasketData } from '../basket/getBasket'
import { fetchProductsData } from './getProducts'
import { addProductToBasket } from '../basket/getBasket'
import { Card, CardContent, Grid, Typography, Box, Button } from '@mui/material';
import Image from 'mui-image';
import shoeImg from './images/shoes1.jpg'


export function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const productSearchTerm = useSelector((state) => state.product.productSearchTerm);
  const basketList = useSelector((state) => state.basket.basketList);
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const authenticated = useSelector((state) => state.currentUser.authenticated);
  const webToken = useSelector((state) => state.currentUser.webToken);

    
  
  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%', // Ensures all cards have the same height
  };

  useEffect(() => {
    dispatch(fetchProductsData());
  }, [dispatch]);


  useEffect(() => {
    const userId = currentUser.id
    dispatch(fetchBasketData(userId));
  }, [dispatch, currentUser.id]);


  const handleAddToBasket = (product) => {
    const userId = currentUser.id;
    const productId = product.id;
    const quantity = 1; 
    

    if (!authenticated) {
      dispatch(setNotificationType('warning'))
      dispatch(setNotificationVertical('top'))
      dispatch(setNotificationHorizontal('right')) 
      dispatch(setNotificationMessage('Please sign in'))
      dispatch(setNotificationDisplay(true))
      return;
    }

    const productExistsInBasket = basketList.find((item) => item.id === product.id);
  
    if (!productExistsInBasket) {
      // Dispatch the action to add the product to the basket
      dispatch(addProductToBasket(userId, productId, quantity, webToken))
        .then(() => {
  
          // Fetch the updated basket data after adding the product
          dispatch(fetchBasketData(userId));
          dispatch(setNotificationType('success'))
          dispatch(setNotificationVertical('top'))
          dispatch(setNotificationHorizontal('right')) 
          dispatch(setNotificationMessage('Item Added To Basket')) 
        })
        .catch((error) => {
          dispatch(setNotificationType('error'));
          dispatch(setNotificationVertical('top'));
          dispatch(setNotificationHorizontal('right'));
          dispatch(setNotificationMessage(error.message)); // Display the specific error message
          dispatch(setNotificationDisplay(true));
        });
    } else {
      dispatch(setNotificationType('error'))
      dispatch(setNotificationVertical('top'))
      dispatch(setNotificationHorizontal('right'))
      dispatch(setNotificationMessage('Item already in basket'))
    }
    setTimeout(() => {
      dispatch(setNotificationDisplay(true));
    }, 250);
  };



  

  const allProducts = products && products.map((item) => (
    <Grid key={item.id} item xs={12} sm={6} md={4} lg={2}>
      <Card style={cardStyle}>
      <Image src={shoeImg} alt='Product Image' />
        <CardContent style={{ flex: 1 }}>
          <Typography variant="h6" component="div">
            {item.name}
          </Typography>
          <Typography color="textSecondary">
            {item.description}
          </Typography>
          <Typography color="textSecondary">
            {`Price: ${item.price}`}
          </Typography>
          <Button 
            variant="contained"  
            onClick={() => handleAddToBasket(item)}>
              Add To Basket
          </Button>            
        </CardContent>
      </Card>
    </Grid>
  ));


  return (
    <div>
      <Grid container spacing={2} justifyContent="center" alignItems="center" item xs={12} sm={6} md={12}>
        <Typography variant="h4" component="div">
          All Products
        </Typography>
      </Grid>
      <Box mb={2} />
      <Grid container spacing={2} justifyContent="center" alignItems="center" item xs={12} sm={6} md={12}>
        <Typography variant="h5" component="div">
          {productSearchTerm}
        </Typography>
      </Grid>
      <Box mb={2} />
      <Grid container spacing={2} item xs={12} sm={6} md={12}>
        {allProducts}
      </Grid>
    </div>
  );
}
