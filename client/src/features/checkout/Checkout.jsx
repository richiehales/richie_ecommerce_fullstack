import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { 
  setNotificationType, 
  setNotificationMessage, 
  setNotificationDisplay, 
  setNotificationVertical, 
  setNotificationHorizontal 
} from '../notifications/notificationsSlice';
import { fetchBasketData } from '../basket/getBasket'
import { proceessPayment } from './getCheckout'


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Shipping address', 'Payment details', 'Review your order'];

export default function Checkout() {
  const dispatch = useDispatch();
  const shippingAddress = useSelector((state) => state.checkout.shippingAddress);
  const paymentDetails = useSelector((state) => state.checkout.paymentDetails);
  const basketList = useSelector((state) => state.basket.basketList);  
  const userId = useSelector((state) => state.currentUser.currentUser.id);
  const authenticated = useSelector((state) => state.currentUser.authenticated);
  const [activeStep, setActiveStep] = React.useState(0);
  console.log(`Checkout.jsx`, basketList[0].id)

  

  const handleNext = () => {
    if (activeStep === 0) {
      if (!authenticated) {
        dispatch(setNotificationType('warning'))
        dispatch(setNotificationVertical('top'))
        dispatch(setNotificationHorizontal('center')) 
        dispatch(setNotificationMessage('Please Sign in'))
        dispatch(setNotificationDisplay(true))
        return
      }
      if (shippingAddress.zip && shippingAddress.address1 && shippingAddress.firstName) {
        dispatch(setNotificationDisplay(false))
        setActiveStep(activeStep + 1);
      } else {
          dispatch(setNotificationType('error'))
          dispatch(setNotificationVertical('top'))
          dispatch(setNotificationHorizontal('center')) 
          dispatch(setNotificationMessage('Form not complete'))
          dispatch(setNotificationDisplay(true))
        } 
      }

      if (activeStep === 1) {
        if (!authenticated) {
          dispatch(setNotificationType('warning'))
          dispatch(setNotificationVertical('top'))
          dispatch(setNotificationHorizontal('center')) 
          dispatch(setNotificationMessage('Please Sign in'))
          dispatch(setNotificationDisplay(true))
          return
        }
        if (!paymentDetails.cardName || !paymentDetails.cardNumber || !paymentDetails.cardDate || !paymentDetails.cvv) {
          dispatch(setNotificationType('warning'))
          dispatch(setNotificationVertical('top'))
          dispatch(setNotificationHorizontal('center')) 
          dispatch(setNotificationMessage('Payment details incorrect'))
          dispatch(setNotificationDisplay(true))
          return
        } else {setActiveStep(activeStep + 1)}  
      }
      
      if (activeStep === 2) {
        if (!authenticated) {
          dispatch(setNotificationType('warning'))
          dispatch(setNotificationVertical('top'))
          dispatch(setNotificationHorizontal('center')) 
          dispatch(setNotificationMessage('Please Sign in'))
          dispatch(setNotificationDisplay(true))
          return
        }
        dispatch(proceessPayment(paymentDetails, basketList[0].id))        
          .then((payment) => {        
            if (payment.success) {
              dispatch(setNotificationDisplay(false))
              dispatch(fetchBasketData(userId));
              setActiveStep(activeStep + 1);
            } else {
              dispatch(setNotificationType('error'))
              dispatch(setNotificationVertical('top'))
              dispatch(setNotificationHorizontal('center')) 
              dispatch(setNotificationMessage('Payment details incorrect'))
              dispatch(setNotificationDisplay(true))
              setActiveStep(activeStep - 1);
            }                   
          })
          .catch((error) => {
            // Handle payment error
            console.error(error)
          });
      }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <AddressForm />;
      case 1:
        return <PaymentForm />;
      case 2:
        return <Review />;
      default:
        throw new Error('Unknown step');
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Company name
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant="subtitle1">
                Your order number is #2001539. We have emailed your order
                confirmation, and will send you an update when your order has
                shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        <Copyright />
      </Container>
    </React.Fragment>
  );
}


