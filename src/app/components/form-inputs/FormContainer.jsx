import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const FormContainer = ({ children, header }) => {
  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant='h6' sx={{ mb: 2, color: '#544f5a' }}>
        {header}
      </Typography>
      {children}
    </Paper>
  );
};

export default FormContainer;
