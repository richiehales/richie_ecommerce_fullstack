import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchBasketData, deleteProductFromBasket } from './getBasket'
import { setNotificationType, 
  setNotificationMessage, 
  setNotificationDisplay, 
  setNotificationVertical, 
  setNotificationHorizontal 
  } from '../notifications/notificationsSlice';
import { useDispatch, useSelector } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, Box, Button } from '@mui/material';


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


  const calculateTotalCost = () => {
    let total = 0;
  
    // Include the logic for updatedBasketList
    basketList.forEach((product) => {
      total += parseFloat(product.price.replace('£', ''));
    });
  
    // Return the total sum of updatedBasketList
    return total.toFixed(2);
  };


  
  return (
    <React.Fragment>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>          
          <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
            {`Basket for ${currentUser.first_name} ${currentUser.last_name}`}
          </Typography>
          <List disablePadding>
            {basketList.map((product, index) => (
              <ListItem key={index} sx={{ py: 1, px: 0 }}>
                <ListItemText primary={product.name} secondary={product.description} />
                <Typography variant="body2">{product.price}</Typography>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleRemoveProductFromBasket(product)}
                  color="primary"
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
          <ListItem sx={{ py: 1, px: 0 }}>
            <ListItemText primary="Total Cost" />
            <Typography variant="body2" sx={{ marginRight: 1 }}>
              £{calculateTotalCost()}
            </Typography>
          </ListItem>
          <React.Fragment>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link
                to="/Checkout">
              <Button
                variant="contained"
                sx={{ mt: 3, ml: 1 }}
              >
                Checkout
              </Button>
              </Link>
            </Box>
          </React.Fragment>
        </Paper>        
      </Container>  
    </React.Fragment>
  );
}