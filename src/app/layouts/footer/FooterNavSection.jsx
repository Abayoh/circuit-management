import React from 'react';
import Box from '@mui/system/Box';

const FooterNavSection = ({ children, sx = {}, sectionHeader }) => {
  return (
    <Box sx={{}}>
      <Box sx={{ fontWeight: 'bold', fontSize: 'h5' }}>{sectionHeader}</Box>
      <Box
        sx={{
          '&>a': {
            display: 'block',
            color: '#AEB4BE',
            ml: 1,
            lineHeight: '24px',
            cursor: 'pointer',
            '&:hover': {
              fontWeight: 'bold',
            },
          },
          ...sx,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default FooterNavSection;
