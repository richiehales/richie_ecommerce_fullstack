import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import Image from 'mui-image';
import logo from './images/logo.JPG';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';


const theme = createTheme();

theme.typography.h6 = {
  fontSize: '1rem',
  '@media (min-width:600px)': {
    fontSize: '0.6rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1rem',
  },
};


export default function Footer() {
  return (
    <div>
    <Box mb={4} />
      <AppBar position='static'>
        <Toolbar>
          <ThemeProvider theme={theme}>     
            <Typography
              variant="h6"            
              align="center"
              sx={{ 
                flexGrow: 1,
                display: {
                  xs: 'none',
                  md: 'block',
                }
              }}
            >
              Richie Hales
            </Typography>
          </ThemeProvider> 
          <Grid container alignItems="center" justifyContent="center">
            <Image src={logo} alt="logo" height={'3rem'} width={''} />
          </Grid>
          <ThemeProvider theme={theme}>
            <Typography
              variant="h6"            
              align="center"
              sx={{ 
                flexGrow: 1,
                display: {
                  xs: 'none',
                  md: 'block',
                }              
              }}
            >
              Web Developer
            </Typography>
          </ThemeProvider>               
          </Toolbar>
      </AppBar>
    </div>
  )
}