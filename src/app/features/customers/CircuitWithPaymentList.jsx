import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import format from 'date-fns/format';
import EnhancedTable from '../../components/data-table/EnhancedTable';
import { Avatar, Button } from '@mui/material';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { compareDesc } from 'date-fns';

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'activationDate',
    numeric: true,
    disablePadding: false,
    label: 'Activation Date',
  },
  {
    id: 'monthlyCost',
    numeric: true,
    disablePadding: false,
    label: 'Cost',
  },
  {
    id: 'lastPaymentDate',
    numeric: true,
    disablePadding: false,
    label: 'Payment Date',
  },
  {
    id: 'paymentExpiryDate',
    numeric: true,
    disablePadding: false,
    label: 'Expiry Date',
  },
  {
    id: 'amountPaid',
    numeric: true,
    disablePadding: false,
    label: 'Amount Paid',
  },
  {
    id: 'balance',
    numeric: true,
    disablePadding: false,
    label: 'Balance',
  },
];

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
    <EnhancedTable
      rows={circuits}
      headCells={headCells}
      tableLabel='Circuits Payment Info'
    />
  );
}
