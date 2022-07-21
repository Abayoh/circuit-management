import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import format from 'date-fns/format';
import { Avatar, Button } from '@mui/material';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { compareDesc } from 'date-fns';

export default function CircuitsWithPaymentList({ circuits = [] }) {
  const statusAvartar = (expDate) => {
    return compareDesc(expDate, Date.now()) > 0 ? (
      <Avatar sx={{ bgcolor: 'success.main' }}>
        <CheckOutlinedIcon />
      </Avatar>
    ) : (
      <Avatar sx={{ bgcolor: 'error.main' }}>
        <CloseOutlinedIcon />
      </Avatar>
    );
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Name</TableCell>
            <TableCell align='right'>Activation Date</TableCell>
            <TableCell align='right'>Cost Per Month</TableCell>
            <TableCell align='right'>Payment Date</TableCell>
            <TableCell align='right'>Expiry Date</TableCell>
            <TableCell align='right'>Amount Paid</TableCell>
            <TableCell align='right'>Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {circuits.map((circuit) => (
            <TableRow
              key={circuit.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{statusAvartar(Number(new Date('8/1/22')))}</TableCell>
              <TableCell component='th' scope='row'>
                {circuit.name}
              </TableCell>
              <TableCell align='right'>{circuit.activationDate}</TableCell>
              <TableCell align='right'>{circuit.monthlyCost}</TableCell>
              <TableCell align='right'>
                {format(circuit.lastPaymentDate, 'PP')}
              </TableCell>
              <TableCell align='right'>
                {format(circuit.paymentExpiryDate, 'PP')}
              </TableCell>
              <TableCell align='right'>{circuit.amountPaid}</TableCell>
              <TableCell align='right'>{circuit.balance}</TableCell>
              <TableCell align='right'>
                <Button>Add Payment</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
