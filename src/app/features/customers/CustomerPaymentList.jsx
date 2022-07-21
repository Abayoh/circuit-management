import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ToolTip from '@mui/material/Tooltip';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import KeyValuePairListItem from '../../components/KeyValuePairListItem';

const NoBorderTableCell = styled(TableCell)({
  '&.MuiTableCell-root': {
    borderBottom: 'none',
    fontSize: '16px',
  },
});

const CustomerPaymentList = () => {
  return (
    <Card>
      <CardHeader title='Payment List' />
      <CardContent>
        <Box sx={{ mb: 3 }}>
          {circuitsToBeAdded.map((c, i) => (
            <Box key={i} sx={{ '& span': { mr: 3 }, display: 'flex' }}>
              <Typography component='span'>{c.name}</Typography>
              <Typography component='span'>{c.cost}</Typography>
              <Box sx={{ mx: 'auto' }} />

              <IconButton>
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              mr: 4,
              fontSize: '16px',
            }}
          >
            <KeyValuePairListItem label='Total' value='$500' />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

const circuitsToBeAdded = [
  { name: 'ldldldldldld', cost: 838383 },
  { name: 'ldldldldldld', cost: 838383 },
  { name: 'ldldldldldld', cost: 838383 },
  { name: 'ldldldldldld', cost: 838383 },
  { name: 'ldldldldldld', cost: 838383 },
  { name: 'ldldldldldld', cost: 838383 },
];

export default CustomerPaymentList;
