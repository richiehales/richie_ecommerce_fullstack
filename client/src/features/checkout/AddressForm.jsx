import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setShippingFirstName,
  setShippingLastName,
  setShippingAddress1,
  setShippingAddress2,
  setShippingCity,
  setShippingState,
  setShippingZip,
  setShippingCountry,
  setSaveShippingAddress,
} from './checkoutSlice';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function AddressForm() {
  const dispatch = useDispatch();
  const shippingAddress = useSelector((state) => state.checkout.shippingAddress);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle checkboxes separately
    if (type === 'checkbox') {
      dispatch(setSaveShippingAddress(checked));
    } else {
      // For other input fields
      switch (name) {
        case 'firstName':
          dispatch(setShippingFirstName(value));
          break;
        case 'lastName':
          dispatch(setShippingLastName(value));
          break;
        case 'address1':
          dispatch(setShippingAddress1(value));
          break;
        case 'address2':
          dispatch(setShippingAddress2(value));
          break;
        case 'city':
          dispatch(setShippingCity(value));
          break;
        case 'state':
          dispatch(setShippingState(value));
          break;
        case 'zip':
          dispatch(setShippingZip(value));
          break;
        case 'country':
          dispatch(setShippingCountry(value));
          break;
        default:
          break;
      }
    }
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First Name"
            value={shippingAddress.firstName}
            fullWidth
            autoComplete="given-name"
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last Name"
            value={shippingAddress.lastName}
            fullWidth
            autoComplete="family-name"
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address1"
            name="address1"
            label={"Address line 1"}
            value={shippingAddress.address1}
            fullWidth
            autoComplete="shipping address-line1"
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            value={shippingAddress.address2}
            fullWidth
            autoComplete="shipping address-line2"
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="City"
            value={shippingAddress.city}
            fullWidth
            autoComplete="shipping address-level2"
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="state"
            name="state"
            label="State/Province/Region"
            value={shippingAddress.state}
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            value={shippingAddress.zip}
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Country"
            value={shippingAddress.country}
            fullWidth
            autoComplete="shipping country"
            variant="standard"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" />}
            label="Use this address for payment details"
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

