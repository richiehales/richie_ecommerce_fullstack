import * as React from 'react';
import { useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'mui-image';
import shoeImg from '../home/images/shoes1.jpg'
import { useTheme } from '@mui/material/styles';


export default function Sale() {
  //const dispatch = useDispatch();
  const theme = useTheme();
  const saleItem = useSelector((state) => state.sale.saleItems);
  console.log(`Sale.jsx sale item = ${saleItem.name}`)

  

  return (
    <React.Fragment>
      <CssBaseline />
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>          
        <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', color: 'white', backgroundColor: theme.palette.primary.main }}>
          {`Todays Special Offer`}
        </Typography>
        <List disablePadding>
            {saleItem && saleItem.map((saleItem, index) => (
              <ListItem key={index} sx={{ py: 1, px: 0 }}>
                <img
                  src={shoeImg}
                  alt='Sale Item'
                  style={{ width: '8rem', height: 'auto', marginRight: '1rem' }}
                />
                <ListItemText primary={saleItem.name} secondary={saleItem.description} />
                <ListItemText 
                  primary={`£${(saleItem.price/2).toFixed(2)}`} 
                  secondary={<span style={{ textDecoration: 'line-through', color: 'red' }}>{`£${saleItem.price}`}</span>} 
                />
              </ListItem>
            ))}
          </List>
                   
        </Paper>
      </Container>
    </React.Fragment>
  );
}