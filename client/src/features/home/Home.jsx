import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBasketData } from '../basket/getBasket'
import { fetchProductsData } from './getProducts'
import { addProductToBasket } from '../basket/getBasket'
import { Card, CardContent, Grid, Typography, Box, Button } from '@mui/material';
import Image from 'mui-image';
import shoeImg from './images/shoes1.jpg'
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

export function Home() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const productSearchTerm = useSelector((state) => state.product.productSearchTerm);
  const basketList = useSelector((state) => state.basket.basketList);
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const [open, setOpen] = React.useState(false);
    
  
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
  
    const productExistsInBasket = basketList.find((item) => item.id === product.id);
  
    if (!productExistsInBasket) {
      // Dispatch the action to add the product to the basket
      dispatch(addProductToBasket(userId, productId, quantity))
        .then(() => {
          console.log('Home.jsx', products);
  
          // Fetch the updated basket data after adding the product
          dispatch(fetchBasketData(userId));
        })
        .catch((error) => {
          console.error("Error adding product to basket:", error);
        });
    } else {
      // Add popper here
      console.log("do not add product");
    }
    setOpen(true);
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
          <Stack spacing={2} sx={{ width: "100%" }}>
            <Button 
              variant="contained"  
              onClick={() => handleAddToBasket(item)}>
                Add To Basket
            </Button>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="warning" sx={{ width: "100%" }}>
                This is a success message!
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
