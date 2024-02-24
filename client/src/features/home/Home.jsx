import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setBasketList } from '../basket/basketSlice';
import ShoeSelector from '../sizeSelector/ShoeSelector';
import ClothesSelector from '../sizeSelector/ClothesSelector';
import { 
  setNotificationType, 
  setNotificationMessage, 
  setNotificationDisplay, 
  setNotificationVertical, 
  setNotificationHorizontal 
  } from '../notifications/notificationsSlice';
import { setCurrentUser, setAuthenticated, setWebToken } from '../signIn/currentUserSlice';
import { setOrders } from '../orders/ordersSlice';
import { fetchBasketData } from '../basket/getBasket'
import { fetchProductsData } from './getProducts'
import { addProductToBasket } from '../basket/getBasket'
import { Card, CardContent, Grid, Typography, Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Image from 'mui-image';
import imagePaths from '../images/imagePaths';
import { useTheme } from '@mui/material/styles';
import Sale from '../sale/Sale';

export function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const basketList = useSelector((state) => state.basket.basketList);
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const authenticated = useSelector((state) => state.currentUser.authenticated);
  const webToken = useSelector((state) => state.currentUser.webToken);
  const theme = useTheme();
  const navigate = useNavigate();
  
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
      dispatch(addProductToBasket(userId, productId, quantity, webToken))
        .then(() => {
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
          dispatch(setNotificationMessage(error.message));
          dispatch(setNotificationDisplay(true));
          dispatch(setAuthenticated(false));
          dispatch(setCurrentUser({
            id: null,
            first_name: '',
            last_name: '',
          }));
          dispatch(setWebToken(''))
          dispatch(setBasketList(``))
          dispatch(setOrders(''))
          navigate("/SignIn");
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

  


  const imageSize = {
    width: '18rem', // Adjust the width as needed
    height: '18rem', // Adjust the height as needed
  };
  
  const categories = Array.from(new Set(products.map(product => product.category)));

  const categoryProducts = categories.map(category => {
    const categoryItems = products.filter(product => product.category === category);

    const categoryProductsList = categoryItems.map((item, index) => (
      <Grid key={item.id} item xs={12} sm={6} md={4} lg={2}>
        <Card style={cardStyle}>
          <Image 
            src={imagePaths[`img${item.id}`]} 
            alt='Product Image' 
            style={imageSize} />
          <CardContent style={{ flex: 1 }}>
            <Typography variant="h6" component="div">
              {item.name}
            </Typography>
            <Typography color="textSecondary">
              {item.description}
            </Typography>
            <Typography color="textSecondary">
              {`Price: £${item.price}`}
            </Typography>
            <Button 
              variant="contained"  
              onClick={() => handleAddToBasket(item)}>
                Buy
            </Button>
            {item.category === 'running shoes' ? (
              <ShoeSelector />
            ) : (
              <ClothesSelector />
            )}            
          </CardContent>
        </Card>
      </Grid>
    ));

    return (
      <React.Fragment key={category}>
        <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', color: 'white', backgroundColor: theme.palette.primary.main }}>
          {category.toUpperCase()}
        </Typography>
        <Grid container spacing={2} item xs={12} sm={6} md={12}>
          {categoryProductsList}
        </Grid>
      </React.Fragment>
    );
  });

  return (
    <Container component="main" maxWidth="100%" sx={{ mb: 4, width: '100%' }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Sale />
        {categoryProducts}
      </Paper>
    </Container>
  );
}

