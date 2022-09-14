import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import React from 'react';

const DeleteUser = ({ onCancel, onConfirm }) => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography sx={{ fontSize: '24px' }} color='orange'>
            Are you sure you want to delete this user?
          </Typography>
        </Grid>

        <Grid
          item
          xs={12}
          container
          direction='row'
          justifyContent='flex-start'
        >
          <Button variant='outlined' color='primary' onClick={onCancel}>
            Cancel
          </Button>
          <Button
            variant='contained'
            color='error'
            onClick={onConfirm}
            sx={{ ml: 2 }}
          >
            Delete
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DeleteUser;
