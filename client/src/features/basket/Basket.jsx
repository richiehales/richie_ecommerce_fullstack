import React, { useEffect } from 'react';
import { fetchBasketData, deleteProductFromBasket } from './getBasket'
import { setNotificationType, setNotificationMessage, setNotificationDisplay, setNotificationVertical, setNotificationHorizontal } from '../notifications/notificationsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, Grid, Typography, Box, Button } from '@mui/material';
import Image from 'mui-image';
import shoeImg from './images/shoes1.jpg'


export function Basket() {
  const dispatch = useDispatch();
  const basketList = useSelector((state) => state.basket.basketList);
  const currentUser = useSelector((state) => state.currentUser.currentUser);
 
  
  
  useEffect(() => {
    const userId = currentUser.id
    dispatch(fetchBasketData(userId));
  }, [dispatch, currentUser.id]);

  
  const handleRemoveProductFromBasket = (product) => {
    const userId = currentUser.id;
    const productId = product.id;
  
    dispatch(deleteProductFromBasket(userId, productId))
      .then((deletedProduct) => {
        console.log('Basket.jsx', deletedProduct);
        dispatch(setNotificationType('success'))
        dispatch(setNotificationVertical('top'))
        dispatch(setNotificationHorizontal('right')) 
        dispatch(setNotificationMessage('Item Removed'))      
      })
      .catch((error) => {
        console.error('Error removing product from basket:', error);
      });
      setTimeout(() => {
        dispatch(setNotificationDisplay(true));
      }, 250);
  };

  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%', // Ensures all cards have the same height
  };

  
  const currentBasketItems = basketList && basketList.map((item) => (
    <Grid key={item.id} item xs={12} sm={6} md={4} lg={2}>
      <Card style={cardStyle}>
        <Image src={shoeImg} alt='Film Poster' />
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
            onClick={() => handleRemoveProductFromBasket(item)}>
              Remove
          </Button>                         
        </CardContent>
      </Card>
    </Grid>
  ));


  return (
    <div>
      <Grid container spacing={2} justifyContent="center" alignItems="center" item xs={12} sm={6} md={12}>
        <Typography variant="h4" component="div">
          {basketList.length > 0 ? 'Current Basket Items' : 'Basket Is Empty'}
        </Typography>
      </Grid>
      <Box mb={2} /> 
      <Grid container spacing={2} item xs={12} sm={6} md={12}>
        {currentBasketItems}
      </Grid>
    </div>
  );
}