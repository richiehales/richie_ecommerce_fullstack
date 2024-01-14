import * as React from 'react';
import { useEffect } from 'react';
import { fetchOrders } from './getOrders'
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useDispatch, useSelector } from 'react-redux';


export default function Review() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.currentUser.currentUser);   
  const orders = useSelector((state) => state.orders.orders);
  console.log(`Orders.jsx`, orders)


  useEffect(() => {
    dispatch(fetchOrders(currentUser.id));
  }, [dispatch, currentUser.id]);
  


  return (
    <div style={{ margin: '0 auto', maxWidth: '600px' }}>
      <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
        {`Order History for ${currentUser.first_name} ${currentUser.last_name}`}
      </Typography>
      <List disablePadding>
        {orders.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.description} />
            <Typography variant="body2">{product.price}</Typography>
          </ListItem>
        ))}
      </List>
    </div>
  );
}




