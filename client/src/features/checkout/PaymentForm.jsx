import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCardName,
  setCardNumber,
  setCardDate,
  setCardCvv,
  setSaveCard,
} from './checkOutSlice';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function PaymentForm() {
  const dispatch = useDispatch();
  const paymentDetails = useSelector((state) => state.checkout.paymentDetails);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle checkboxes separately
    if (type === 'checkbox') {
      dispatch(setSaveCard(checked));
    } else {
      // For other input fields
      switch (name) {
        case 'cardName':
          dispatch(setCardName(value));
          break;
        case 'cardNumber':
          dispatch(setCardNumber(value));
          break;
        case 'expDate':
          dispatch(setCardDate(value));
          break;
        case 'cvv':
          dispatch(setCardCvv(value));
          break;
        default:
          break;
      }
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            name="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
            value={paymentDetails.cardName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            name="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
            value={paymentDetails.cardNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            name="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
            value={paymentDetails.cardDate}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            name="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
            value={paymentDetails.cvv}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                color="secondary"
                name="saveCard"
                checked={paymentDetails.saveCard}
                onChange={handleChange}
              />
            }
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
