import React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/system/Box';
import Spacer from './Spacer';

const KeyValuePairListItem = ({ label, value, height=32, sx, enableSpacer = false }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        height:`${height}px`,
        '&>span:last-of-type': { ml: 1 },
        '&>span:first-of-type': { fontWeight: 'bold' },
        ...sx,
      }}
    >
      <span>{`${label}${enableSpacer ? '' : ':'}`}</span>
      {enableSpacer && <Spacer />}
      <span>{value}</span>
    </Box>
  );
};

KeyValuePairListItem.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  height:PropTypes.number,
  sx: PropTypes.object,
  enableSpacer: PropTypes.bool,
};

export default KeyValuePairListItem;
