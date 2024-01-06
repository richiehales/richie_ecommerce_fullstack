import React, { useEffect } from 'react';
import { fetchBasketData } from './getBasket'
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, Grid, Typography, Box, Button } from '@mui/material';
import { removeProductFromBasket } from './basketSlice';
import Image from 'mui-image';
import shoeImg from './images/shoes1.jpg'


export function Basket() {
  const dispatch = useDispatch();
  const basketList = useSelector((state) => state.basket.basketList);
  
  useEffect(() => {
    const userId = 1
    dispatch(fetchBasketData(userId));
  }, [dispatch]);

  const handleRemoveProductFromBasket = (product) => {
    dispatch(removeProductFromBasket(product));
  };  

  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%', // Ensures all cards have the same height
  };


  const watchList = basketList && basketList.map((item) => (
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
          Basket
        </Typography>
      </Grid>
      <Box mb={2} />
      <Grid container spacing={2} item xs={12} sm={6} md={12}>
        {watchList}
      </Grid>
    </div>
  );
}