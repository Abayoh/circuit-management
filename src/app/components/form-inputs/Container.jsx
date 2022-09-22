import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const Container = ({
  children,
  header,
  padding = 2,
  direction,
  height = '100%',
  width = '100%',
  gridColumn,
}) => {
  return (
    <Box
      gridColumn={gridColumn}
      sx={{ p: padding, height, width }}
      component={Paper}
    >
      <Typography variant='h6' sx={{ mb: 2, color: '#544f5a' }}>
        {header}
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: direction, width: '100%' }}>
        {children}
      </Box>
    </Box>
  );
};

export default Container;
