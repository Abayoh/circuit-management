import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import Icon from '@mui/material/Icon';

const ViewHeader = ({ label, iconName }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
      <Icon sx={{ color: 'secondary.main', mr: 1, fontSize: '24px' }}>
        {iconName}
      </Icon>
      <Typography variant='h5'>{label}</Typography>
    </Box>
  );
};

export default ViewHeader;
