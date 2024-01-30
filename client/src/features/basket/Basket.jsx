import React, { useEffect } from 'react';
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


  const currentBasketItems = (
    <React.Fragment>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>          
          <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
            {`Current Basket for ${currentUser.first_name} ${currentUser.last_name}`}
          </Typography>
          <List disablePadding>
            {basketList.map((product, index) => (
              <ListItem key={index} sx={{ py: 1, px: 0 }}>
                <ListItemText primary={product.name} secondary={product.description} />
                <Typography variant="body2" sx={{ marginRight: 1 }}>{product.price}</Typography>
                <Button 
                  variant="contained"  
                  onClick={() => handleRemoveProductFromBasket(product)}>
                  Remove
                </Button>
              </ListItem>
            ))}
          </List>
          <Typography>Total Cost: £{calculateTotalCost()}</Typography>          
        </Paper>
      </Container>
    </React.Fragment>
  );




  /*
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
  */


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