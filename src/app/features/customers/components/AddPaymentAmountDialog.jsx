import * as React from 'react';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useState, useEffect } from 'react';

export default function AddPaymentAmountDialog({ open, onClose }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [amount, setAmount] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState({ amount: 0, file: '' });

  useEffect(() => {
    if (selectedFile) {
      setFileName(selectedFile.name);
    }

    if (selectedFile && amount > 0) {
      setIsValid(true);
      setError({ amount: '', file: '' });
    } else if (!Boolean(selectedFile)) {
      setIsValid(false);
      setError({ amount: '', file: 'please add a file' });
    } else if (amount <= 0) {
      setIsValid(false);
      setError({ amount: 'amount is requied', file: '' });
    } else {
      setIsValid(false);
      setError({ amount: 'amount is requied', file: 'please add a file' });
    }
  }, [selectedFile, amount]);

  const resetState = () => {
    setSelectedFile(null);
    setAmount(0);
    setFileName('');
  };

  const handleClose = (hasCancel) => {
    if (selectedFile && !hasCancel) {
      const cheque = { amount, file: selectedFile };
      onClose(cheque);
    } else {
      onClose(null);
    }

    resetState();
  };
  const handleSave = () => handleClose(false);

  const handleRejected = () => handleClose(true);

  const handleChange = (e) => {
    const name = e.target.name;
    if (name === 'amount') {
      setAmount(Number(e.target.value));
    } else {
      setSelectedFile(e.target.files[0]);
    }
  };

  return (
    <Dialog open={open} onClose={handleRejected}>
      <DialogTitle>Add Payment Amount</DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ mb: 2 }}>
          Add Payment amount and supporting Document
        </DialogContentText>

        <FormControl fullWidth sx={{ m: 1 }}>
          <TextField
            name='amount'
            error={amount <= 0}
            id='outlined-error-helper-text'
            label='Amount'
            value={amount}
            onChange={handleChange}
            helperText={amount <= 0 ? 'Please Enter Amount' : ''}
            type='number'
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <Stack direction='row' spacing={2} alignItems='center'>
            <Button variant='contained' component='label'>
              Upload Cheque
              <input name='file' hidden type='file' onChange={handleChange} />
            </Button>
            <Typography sx={{ color: fileName ? 'text.main' : 'red' }}>
              {fileName || error.file}
            </Typography>
          </Stack>
        </FormControl>
      </DialogContent>
      <DialogActions sx={{ ml: 2 }}>
        <Button
          disabled={!isValid}
          color='success'
          variant='outlined'
          onClick={handleSave}
        >
          Save
        </Button>
        <Button color='warning' variant='outlined' onClick={handleRejected}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
