import * as React from 'react';
import { useEffect } from 'react';
import { fetchOrders } from './getOrders';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useDispatch, useSelector } from 'react-redux';


export default function Review() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser.currentUser);
  const webToken = useSelector((state) => state.currentUser.webToken);  
  const orders = useSelector((state) => state.orders.orders);

  useEffect(() => {
    dispatch(fetchOrders(webToken));
  }, [dispatch, webToken]);  


  return (
    <React.Fragment>
      <CssBaseline />
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>          
          <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
            {`Order History for ${currentUser.first_name} ${currentUser.last_name}`}
          </Typography>
          <List disablePadding>
            {orders.map((product, index) => (
              <ListItem key={index} sx={{ py: 1, px: 0 }}>
                <ListItemText primary={product.name} secondary={product.description} />
                <Typography variant="body2">{product.price}</Typography>
              </ListItem>
            ))}
          </List>          
        </Paper>
      </Container>
    </React.Fragment>
  );
}




