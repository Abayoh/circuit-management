import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/system/Box';

const loading = {
  position: 'fixed',
  left: 0,
  right: 0,
  top: 'calc(50% - 20px)',
  margin: 'auto',
  height: '40px',
  width: '40px',
  '& img': {
    position: 'absolute',
    height: '25px',
    width: 'auto',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 'auto',
  },
};

const Loading = (props) => {
  return (
    <Box sx={loading}>
      <img src='/assets/images/logo-circle.svg' alt='' />
      <CircularProgress />
    </Box>
  );
};

export default Loading;
