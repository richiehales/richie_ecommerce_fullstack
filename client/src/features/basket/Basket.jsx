import React, { useEffect, useState } from 'react';
import { fetchBasketData, deleteProductFromBasket } from './getBasket'
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, Grid, Typography, Box, Button } from '@mui/material';
import Image from 'mui-image';
import shoeImg from './images/shoes1.jpg'
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";


export function Basket() {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [notificationType, setNotificationType] = useState('error')
  const [notificationMessage, setNotificationMessage] = useState('')
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
        setNotificationType('success')
        setNotificationMessage('Item removed')
      })
      .catch((error) => {
        console.error('Error removing product from basket:', error);
      });
      setTimeout(() => {
        setOpen(true);
      }, 250);
  };

  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%', // Ensures all cards have the same height
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };


  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });


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
          <Stack spacing={2} sx={{ width: "100%" }}>
            <Button 
              variant="contained"  
              onClick={() => handleRemoveProductFromBasket(item)}>
                Remove
            </Button>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: 'top', horizontal: 'right'}}>
              <Alert onClose={handleClose} severity={notificationType} sx={{ width: "100%" }}>
                {notificationMessage}
              </Alert>
            </Snackbar>
          </Stack>
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