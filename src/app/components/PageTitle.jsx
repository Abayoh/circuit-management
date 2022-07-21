import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/system';

const PageHeader = ({ icon, title, subTitle }) => {
  return (
    <Box sx={{ bgcolor: 'transparent', width: {xs: '100%', sm:"50%"}, mb: 2 }}>
      <Box
        sx={{
          p: 1,
          pl:0,
          display: 'flex',
        }}
      >
        <Card
          sx={{
            display: 'inline-block',
            padding: 2,
            boxShadow: 0,
            height: '50px',
            width: '50px',
            color: 'primary.main',
            backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.1),
          }}
        >
          {icon}
        </Card>
        <Box
          sx={{
            pl: { xs: 1, sm: 2 },
            '& .MuiTypography-h5': {
              fontSize: { xs: (theme) => theme.spacing(2.5) },
            },
            '& .MuiTypography-subtitle2': {
              fontSize: { xs: (theme) => theme.spacing(1.5) },
              opacity: '0.7',
            },
          }}
        >
          <Typography variant='h5' component='div'>
            {title}
          </Typography>
          <Typography variant='subtitle2' component='div'>
            {subTitle}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PageHeader;