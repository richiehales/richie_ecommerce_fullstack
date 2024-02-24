import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ShoeSelector from '../sizeSelector/ShoeSelector';
import ClothesSelector from '../sizeSelector/ClothesSelector';
import { addProductToBasket } from '../basket/getBasket'
import { 
  setNotificationType, 
  setNotificationMessage, 
  setNotificationDisplay, 
  setNotificationVertical, 
  setNotificationHorizontal 
  } from '../notifications/notificationsSlice';
import { fetchBasketData } from '../basket/getBasket'
import { setBasketList } from '../basket/basketSlice';
import { setOrders } from '../orders/ordersSlice';
import { setCurrentUser, setAuthenticated, setWebToken } from '../signIn/currentUserSlice';
import { setSale } from '../sale/saleSlice';
import CssBaseline from '@mui/material/CssBaseline';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'mui-image';
import imagePaths from '../images/imagePaths';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';


export default function Sale() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const saleItem = useSelector((state) => state.sale.saleItems);
  const basketList = useSelector((state) => state.basket.basketList);
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const authenticated = useSelector((state) => state.currentUser.authenticated);
  const webToken = useSelector((state) => state.currentUser.webToken);
  const products = useSelector((state) => state.product.products);
  const randomSaleItem = Math.floor(Math.random() * 20);


  useEffect(() => {
    // Check if saleItem is empty
    if (saleItem.length === 0) {
      const product = products[randomSaleItem];
  
      if (product) {
        const numericPrice = parseInt(product.price.replace(/[^\d.]/g, ''));
        const finalPrice = numericPrice + 0.99;
  
        dispatch(
          setSale([
            {
              id: product.id,
              name: product.name,
              price: finalPrice,
              description: product.description,
              category: product.category,
            },
          ])
        );
      }
    }
  }, [dispatch, products, randomSaleItem, saleItem]);

  

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
  

  return (
    <React.Fragment>
      <CssBaseline />
      <Container component="main" maxWidth="md" sx={{ mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <div style={{ paddingInline: '1rem', backgroundColor: theme.palette.primary.main }}>
            <Typography 
              variant="h5" 
              gutterBottom 
              sx={{ textAlign: 'center', color: 'white' }}>
                SPECIAL OFFER
            </Typography>
          </div>
          <Grid container spacing={2}>
            {saleItem && saleItem.map((saleItem, index) => (
              <Grid item xs={12} key={index}>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Image
                    src={imagePaths[`img${saleItem.id}`]}
                    alt='Sale Item'
                    style={{ width: '8rem', height: 'auto', marginBottom: '1rem' }}
                  />
                  <Typography variant="h6" gutterBottom>
                    {saleItem.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    {saleItem.description}
                  </Typography>
                  <Box mb={2} />
                  <Typography variant="h7" gutterBottom>
                    {`£${(saleItem.price / 2).toFixed(2)}`}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" style={{ textDecoration: 'line-through', color: 'red' }}>
                    {`£${saleItem.price}`}
                  </Typography>
                  <Box mb={2} />                  
                  {saleItem.category === 'running shoes' ? (
                      <ShoeSelector />
                    ) : (
                      <ClothesSelector />
                  )}
                  <Button
                    variant="contained"
                    onClick={() => handleAddToBasket(saleItem)}
                  >
                    Buy
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </React.Fragment>
  );
};
