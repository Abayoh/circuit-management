import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { Icon } from '@mui/material';

function ConfirmationDialogRaw(props) {
  const {
    onClose,
    iconText = 'warning_amber_rounded',
    message,
    title,
    open,
    ...other
  } = props;

  const handleCancel = () => {
    onClose(false);
  };

  const handleOk = () => {
    onClose(true);
  };

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth='xs'
      open={open}
      {...other}
    >
      <DialogTitle>
        <Stack direction='row' spacing={2} alignItems='center'>
          <Icon color='warning' fontSize='large'>
            {iconText}
          </Icon>
          <Typography fontSize='24px'>{title}</Typography>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleOk}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  iconText: PropTypes.string,
};

export default ConfirmationDialogRaw;
