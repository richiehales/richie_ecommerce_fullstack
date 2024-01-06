import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProductSearchTerm } from '../home/homeSlice';
import { setBadgeCount } from '../basket/basketSlice';
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
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
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
  console.log(productSearchTerm) // ******************* Test Redux state change *******************
  const linkRef = useRef();
  const navigate = useNavigate();
  const badgeCount = useSelector((state) => state.basket.badgeCount);
 
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

  const resetBadgeCount = () => {
    dispatch(setBadgeCount(0))
  }
  

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
    dispatch(setBadgeCount(0))
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
                to="/WatchList">
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
            Movie Finder          
          </Typography>
          <Link
                to="/WatchList">
          <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={resetBadgeCount}>
            <Badge badgeContent={badgeCount} color="error">
              <OndemandVideoIcon />
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

