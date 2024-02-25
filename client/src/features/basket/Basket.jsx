import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ShoeSelector from '../sizeSelector/ShoeSelector';
import ClothesSelector from '../sizeSelector/ClothesSelector';
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
import { Box, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';


export function Basket() { 
  const dispatch = useDispatch();
  const basketList = useSelector((state) => state.basket.basketList);
  const saleItem = useSelector((state) => state.sale.saleItems);
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const theme = useTheme();
 
  
  
  useEffect(() => {
    const userId = currentUser.id
    dispatch(fetchBasketData(userId));
  }, [dispatch, currentUser.id]);

  
  const handleRemoveProductFromBasket = (product) => {
    const userId = currentUser.id;
    const productId = product.id;
  
    dispatch(deleteProductFromBasket(userId, productId))
      .then(() => {
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
  
    // Include the logic for basketList
    if (basketList.length > 0) {
      basketList.forEach((product) => {
        // Check if saleItem exists and has the same id as the current product
        if (saleItem.length > 0 && saleItem[0] && product.id === saleItem[0].id) {
          total += parseFloat((saleItem[0].price / 2).toFixed(2));
        } else {
          total += parseFloat(product.price.replace('£', ''));
        }
      });
    }
  
    // Return the total sum
    return total.toFixed(2);
  };


  
  return (
    <React.Fragment>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>          
        <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', color: 'white', backgroundColor: theme.palette.primary.main }}>
            {`BASKET FOR: ${currentUser.first_name} ${currentUser.last_name}`}
          </Typography>
          <List disablePadding>
            {basketList && basketList.map((product, index) => (              
              <ListItem key={index} sx={{ py: 1, px: 0 }}>
                <ListItemText 
                  primary={product.name}
                  secondary={
                    <React.Fragment>
                      <Typography variant="body2" color="textSecondary">
                        {product.description}
                      </Typography>
                      {product.category === 'running shoes' ? (
                        <ShoeSelector productId={product.id} />
                        ) : (
                          <ClothesSelector productId={product.id} />
                      )}
                    </React.Fragment>
                  } />               
                <Typography variant="body2">
                  {saleItem[0].id === product.id ? `£${(saleItem[0].price/2).toFixed(2)}` : `£${product.price}`}
                </Typography>                
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
            <ListItemText
              primary={
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  Total Cost
                </Typography>
              }
            />
            <Typography variant="h7" sx={{ marginRight: 2, fontWeight: 'bold' }}>
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