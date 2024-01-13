import * as React from 'react';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';


export default function Review() {
  const currentOrder = useSelector((state) => state.checkout.currentOrder);
  const shippingAddress = useSelector((state) => state.checkout.shippingAddress);
  const paymentDetails = useSelector((state) => state.checkout.paymentDetails);
  const addresses = [shippingAddress.address1, shippingAddress.address2, shippingAddress.city, shippingAddress.zip];

  const payments = [
    { name: 'Card type', detail: 'Visa' },
    { name: 'Card holder', detail: paymentDetails.cardName },
    { name: 'Card number', detail: paymentDetails.cardNumber },
    { name: 'Expiry date', detail: paymentDetails.cardDate },
  ];
  
  let total = 0;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {currentOrder.map((product) => {
          total += parseFloat(product.price.replace('£', ''));
            return (
              <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
                <ListItemText primary={product.name} secondary={product.description} />
                <Typography variant="body2">{product.price}</Typography>
              </ListItem>
            );
        })}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {`£${total}`}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}