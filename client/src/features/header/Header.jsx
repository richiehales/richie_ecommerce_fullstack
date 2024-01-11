import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProductSearchTerm } from '../home/homeSlice';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import ButtonGroup from "@mui/material/ButtonGroup";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Badge from '@mui/material/Badge';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));



export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const productSearchTerm = useSelector((state) => state.product.productSearchTerm);
  const basketList = useSelector((state) => state.basket.basketList);
  const firstName = useSelector((state) => state.currentUser.currentUser.first_name);
  const firstLetterOfFirstName = firstName ? firstName.charAt(0) : null;
  console.log(productSearchTerm) // ******************* Test Redux state change *******************
  const linkRef = useRef();
  const navigate = useNavigate();
   
  const onSearchChanged = (e) => setSearchTerm(e.target.value);

  const onSearchClicked = () => {
    if (searchTerm !== '') {
      dispatch(setProductSearchTerm(searchTerm));
      setSearchTerm('');
      setTimeout(() => {
        navigate('/');
      }, 750);
    }
  }

  const handleEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearchClicked();
      if (linkRef.current) {
        linkRef.current.click();
      }
    }
  };

 
  

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const searchHandleClose = () => {
    setAnchorEl(null);
  };

  const watchlistHandleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }} mb={4}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={searchHandleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <ButtonGroup 
              orientation="vertical"
              color="primary"
              aria-label="vertical contained button group"
              variant="text"
            >
              <Link
                to='/'>
                <Button>
                  <MenuItem onClick={searchHandleClose}>All Products</MenuItem>            
                </Button>
              </Link>
              <Link
                to="/Basket">
                <Button> 
                  <MenuItem onClick={watchlistHandleClose}>Basket</MenuItem>
                </Button>
              </Link>
            </ButtonGroup>
          </Menu>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >            
            Richie Running Kit        
          </Typography>
          <Link to="/SignIn">                
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={firstLetterOfFirstName} invisible={!firstLetterOfFirstName} color="primary">
                <AccountCircleIcon />
              </Badge>
            </IconButton>
          </Link>
          <Link to="/Basket">                
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={basketList.length} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Link>
          <Search onChange={onSearchChanged}>
            <IconButton size="large" aria-label="search" color="inherit" onClick={onSearchClicked}>              
              <SearchIcon />              
            </IconButton>
            <StyledInputBase
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
              value={searchTerm}
              onKeyDown={handleEnterKeyPress}
            />
          </Search>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Box>
  );
}

