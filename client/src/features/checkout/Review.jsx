import React from 'react';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

export default function Review() {
  const basketList = useSelector((state) => state.basket.basketList);
  const shippingAddress = useSelector((state) => state.checkout.shippingAddress);
  const paymentDetails = useSelector((state) => state.checkout.paymentDetails);
  const addresses = [shippingAddress.address1, shippingAddress.city, shippingAddress.zip];
  const saleItem = useSelector((state) => state.sale.saleItems);

  const shippingItem = { name: 'Shipping', description: '3-5 days', price: '£5.99' };
  const updatedBasketList = [...basketList, shippingItem];

  const payments = [
    { name: 'Card type', detail: 'Visa' },
    { name: 'Card holder', detail: paymentDetails.cardName },
    { name: 'Card number', detail: paymentDetails.cardNumber },
    { name: 'Expiry date', detail: paymentDetails.cardDate },
  ];

  const shippingFirstName = shippingAddress.firstName;
  const shippingLastName = shippingAddress.lastName;

  const calculateTotalCost = () => {
    let total = 0;

    // Include the logic for updatedBasketList
    updatedBasketList.forEach((product) => {
      // Check if saleItem exists and has the same id as the current product
      if (saleItem.length > 0 && saleItem[0] && product.id === saleItem[0].id) {
        total += parseFloat((saleItem[0].price / 2).toFixed(2));
      } else {
        total += parseFloat(product.price.replace('£', ''));
      }
    });

    // Return the total sum
    return total.toFixed(2);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {updatedBasketList.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText primary={product.name} secondary={product.description} />
            <Typography variant="body2">
            {saleItem[0].id === product.id ? `£${(saleItem[0].price/2).toFixed(2)}` : `${product.price}`}
            </Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {`£${calculateTotalCost()}`}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{`${shippingFirstName} ${shippingLastName}`}</Typography>
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
