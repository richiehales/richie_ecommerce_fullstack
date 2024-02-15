import * as React from 'react';
import { useNavigate } from 'react-router-dom';
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
import CssBaseline from '@mui/material/CssBaseline';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useDispatch, useSelector } from 'react-redux';
import shoeImg from '../home/images/shoes1.jpg'
import { useTheme } from '@mui/material/styles';


export default function Sale() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const navigate = useNavigate();
  const saleItem = useSelector((state) => state.sale.saleItems);
  const basketList = useSelector((state) => state.basket.basketList);
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const authenticated = useSelector((state) => state.currentUser.authenticated);
  const webToken = useSelector((state) => state.currentUser.webToken);
  console.log(`Sale.jsx = ${saleItem[0]}`)


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
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>          
        <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', color: 'white', backgroundColor: theme.palette.primary.main }}>
          {`Todays Special Offer`}
        </Typography>
        <List disablePadding>
            {saleItem && saleItem.map((saleItem, index) => (
              <ListItem key={index} sx={{ py: 1, px: 0 }}>
                <img
                  src={shoeImg}
                  alt='Sale Item'
                  style={{ width: '8rem', height: 'auto', marginRight: '1rem' }}
                />
                <ListItemText primary={saleItem.name} secondary={saleItem.description} />
                <ListItemText 
                  primary={`£${(saleItem.price/2).toFixed(2)}`} 
                  secondary={<span style={{ textDecoration: 'line-through', color: 'red' }}>{`£${saleItem.price}`}</span>} 
                />
                <Button 
                  variant="contained"  
                  onClick={() => handleAddToBasket(saleItem)}
                >
                  Buy
              </Button>
              </ListItem>
            ))}
          </List>
                   
        </Paper>
      </Container>
    </React.Fragment>
  );
}