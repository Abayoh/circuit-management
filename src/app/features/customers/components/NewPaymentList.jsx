import React from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

const NewPaymentList = ({ newPayments }) => {
  debugger;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label='spanning table'>
        <SimpleTableHeader headCells={headCells} enableActionCell />

        <TableBody>
          {newPayments.map((p) => {
            return (
              <TableRow>
                <TableCell>{p.circuit.name}</TableCell>
                <TableCell>{p.cost}</TableCell>
                <TableCell>{p.previousBalance.amount}</TableCell>
                <TableCell>{p.balance}</TableCell>
                <TableCell>{3}</TableCell>
                <TableCell>{p.billed.from}</TableCell>
                <TableCell>p.billed.to</TableCell>
                <TableCell>{p.amount}</TableCell>
                <TableCell>p.cost * 3 + p.previousBalance.amount</TableCell>
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell rowSpan={4} />
            <TableCell colSpan={2} align='right'>
              Total
            </TableCell>
            <TableCell align='right'>{ccyFormat(5)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const circuitsToBeAdded = [
  {
    name: 'ldldldldldld',
    unitCost: 838383,
    numberOfMonths: 3,
    lastPaymentBalance: 0,
    total: 5000,
  },
  {
    name: 'ldldldldldld',
    unitCost: 838383,
    numberOfMonths: 3,
    lastPaymentBalance: 0,
    total: 5000,
  },
  {
    name: 'ldldldldldld',
    unitCost: 838383,
    numberOfMonths: 3,
    lastPaymentBalance: 0,
    total: 5000,
  },
  {
    name: 'ldldldldldld',
    unitCost: 838383,
    numberOfMonths: 3,
    lastPaymentBalance: 0,
    total: 5000,
  },
  {
    name: 'ldldldldldld',
    unitCost: 838383,
    numberOfMonths: 3,
    lastPaymentBalance: 0,
    total: 5000,
  },
  {
    name: 'ldldldldldld',
    unitCost: 838383,
    numberOfMonths: 3,
    lastPaymentBalance: 0,
    total: 5000,
  },
  {
    name: 'ldldldldldld',
    unitCost: 838383,
    numberOfMonths: 3,
    lastPaymentBalance: 0,
    total: 5000,
  },
];

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'cost',
    numeric: false,
    disablePadding: false,
    label: 'Monthly Cost',
  },
  {
    id: 'balance',
    numeric: true,
    disablePadding: false,
    label: 'New Balance',
  },
  {
    id: 'previousBalance',
    numeric: true,
    disablePadding: false,
    label: 'Previous Balance',
  },
  {
    id: 'numberOfMonths',
    numeric: true,
    disablePadding: false,
    label: 'Number Of Months',
  },
  {
    id: 'from',
    numeric: false,
    disablePadding: false,
    label: 'From',
  },
  {
    id: 'to',
    numeric: false,
    disablePadding: false,
    label: 'To',
  },
  {
    id: 'amount',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
  },
  {
    id: 'total',
    numeric: true,
    disablePadding: false,
    label: 'Total',
  },
];

const SimpleTableHeader = ({ headCells, enableActionCell = false }) => {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
          >
            {headCell.label}
          </TableCell>
        ))}
        {enableActionCell && <TableCell />}
      </TableRow>
    </TableHead>
  );
};

export default NewPaymentList;
