import React from 'react';
import { logout, setStatus, resetError, getErrorState } from '../../features/sessions/session-slice';
import tokenService from '../../services/token-service';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';

import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Spacer from '../../components/Spacer';
import useRequestStatus from '../../hooks/use-request-status';
import Loading from '../../components/Loading';


const drawerWidth = 240;

const RootAppbar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Appbar = ({ handleDrawerOpen, open }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const requestStatus = useSelector((state) => state.session.status);
  const {enqueueSnackbar} = useSnackbar();
  const error = useSelector(getErrorState);
  
  const onLogoutSuccess =()=>navigate('/login', {replace:true});
  const onLogoutError =()=>{
    enqueueSnackbar(error.message, {
      variant: 'error',
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'left',
      },
    });
    resetError();
  }

  const isLoading = useRequestStatus(requestStatus, setStatus, onLogoutSuccess, onLogoutError)

  

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    dispatch(logout({ refreshToken: tokenService.getLocalRefreshToken() }));
  };
  return (
    <RootAppbar position='fixed' open={open}>
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={handleDrawerOpen}
          edge='start'
          sx={{
            marginRight: 5,
            ...(open && { display: 'none' }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' noWrap component='div'>
          Payment Tracker
        </Typography>
        <Spacer />
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title='Open settings'>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id='menu-appbar'
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign='center'>Profile</Typography>
            </MenuItem>
            <MenuItem onClick={handleCloseUserMenu}>
              <Typography textAlign='center'>Account</Typography>
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <Typography textAlign='center'>Logout</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
      {isLoading && <Loading />}
    </RootAppbar>
  );
};

export default Appbar;
