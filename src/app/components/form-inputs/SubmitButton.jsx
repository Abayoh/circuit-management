import React from 'react';
import { useFormikContext } from 'formik';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function SubmitButton({ isLoading, ...props }) {
  const { isValid, isSubmitting, dirty } = useFormikContext();

  return (
    <Box sx={{ display: 'flex', position: 'relative', alignItems: 'center' }}>
      <Button
        type='submit'
        {...props}
        disabled={!dirty || !isValid || isSubmitting}
      >
        {props.children}
      </Button>
      {isLoading && (
        <CircularProgress
          size={24}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px',
          }}
        />
      )}
    </Box>
  );
}

export default SubmitButton;
