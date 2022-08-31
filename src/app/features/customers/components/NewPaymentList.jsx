import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import TableBody from '@mui/material/TableBody';
import format from 'date-fns/format';
import TextField from '@mui/material/TextField';
import differenceInCalendarMonths from 'date-fns/differenceInCalendarMonths';
import KeyValuePairListItem from '../../../components/KeyValuePairListItem';

import addMonths from 'date-fns/addMonths';

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
    label: 'Amount Paid',
  },
  {
    id: 'total',
    numeric: true,
    disablePadding: false,
    label: 'Total',
  },
];

function ccyFormat(num) {
  return `${num.toFixed(2)}`;
}

const calculateNumberOfMonths = (from, to) => {
  const m = differenceInCalendarMonths(to, from);
  return m;
};

const calculateRowTotal = (billed, cost, preBalance) => {
  return cost * calculateNumberOfMonths(billed.from, billed.to) + preBalance;
};

const sumTotals = (payments) => {
  return payments.reduce(
    (totals, p) => {
      totals.paymentTotal += calculateRowTotal(
        p.billed,
        p.circuit.cost,
        p.previousBalance.amount
      );
      totals.amountPaid += p.amount;
      totals.totalBalance += p.balance;
      return totals;
    },
    { paymentTotal: 0, amountPaid: 0, totalBalance: 0 }
  );
};

const SimpleTableHeader = ({ headCells, enableActionCell = false }) => {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => {
          return (
            <TableCell
              key={headCell.id}
              align='left'
              padding={headCell.disablePadding ? 'none' : 'normal'}
            >
              {headCell.label}
            </TableCell>
          );
        })}
        {enableActionCell && <TableCell />}
      </TableRow>
    </TableHead>
  );
};

const NewPaymentList = ({ newPayments, onChange = () => {} }) => {
  const [paymentTotals, setPaymentTotals] = useState({
    paymentTotal: 0,
    amountPaid: 0,
    totalBalance: 0,
  });

  const handleChange = (e, p) => {
    if (e.target.name === 'amount' && e.target.value > getTotal(p)) {
      alert('Amount cannot be greater then total');
      return;
    }

    const monthsValue =
      e.target.name === 'months'
        ? e.target.value
        : calculateNumberOfMonths(p.billed.from, p.billed.to);
    const amountValue = e.target.name === 'amount' ? e.target.value : p.amount;
    const newValue = {
      months: Number(monthsValue),
      amount: Number(amountValue),
    };
    const newPayment = createEditedPayment(p, newValue);
    onChange(newPayment);
  };

  useEffect(() => {
    setPaymentTotals(sumTotals(newPayments));
  }, [newPayments]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label='spanning table'>
        <SimpleTableHeader headCells={headCells} enableActionCell />

        <TableBody>
          {newPayments.map((p) => {
            return (
              <TableRow key={p.circuit.name}>
                <TableCell>{p.circuit.name}</TableCell>
                <TableCell>{p.circuit.cost}</TableCell>
                <TableCell>{p.balance}</TableCell>
                <TableCell>{p.previousBalance.amount}</TableCell>
                <TableCell>
                  <TextField
                    name='months'
                    type='number'
                    size='small'
                    value={calculateNumberOfMonths(p.billed.from, p.billed.to)}
                    onChange={(e) => {
                      handleChange(e, p);
                    }}
                  />
                </TableCell>
                <TableCell>{format(p.billed.from, 'PP')}</TableCell>
                <TableCell>{format(p.billed.to, 'PP')}</TableCell>
                <TableCell>
                  <TextField
                    name='amount'
                    type='number'
                    size='small'
                    value={p.amount}
                    onChange={(e) => {
                      handleChange(e, p);
                    }}
                  />
                </TableCell>
                <TableCell>
                  {calculateRowTotal(
                    p.billed,
                    p.circuit.cost,
                    p.previousBalance.amount
                  )}
                </TableCell>
                
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell rowSpan={3} colSpan={9} align='right'>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  flexDirection: 'column',
                }}
              >
                <KeyValuePairListItem
                  label='Total'
                  value={ccyFormat(paymentTotals.paymentTotal)}
                />
                <KeyValuePairListItem
                  label='Total Amount Paid'
                  value={ccyFormat(paymentTotals.amountPaid)}
                />
                <KeyValuePairListItem
                  label='Total Balance'
                  value={ccyFormat(paymentTotals.totalBalance)}
                />
              </Box>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const createEditedPayment = (oldPayment, newValue) => {
  const amount =
    newValue.amount === oldPayment.amount
      ? oldPayment.circuit.cost * newValue.months +
        oldPayment.previousBalance.amount
      : newValue.amount;
  return {
    ...oldPayment,
    amount: amount,

    billed: {
      from: oldPayment.billed.from,
      to: Date.parse(addMonths(oldPayment.billed.from, newValue.months)),
    },
    balance: getBalance(
      oldPayment.circuit.cost,
      amount,
      oldPayment.previousBalance.amount,
      newValue.months
    ),
  };
};

const getBalance = (cost, amount, previousBalance, months) => {
  return cost * months + previousBalance - amount;
};

const getTotal = (payment) => {
  return (
    payment.circuit.cost *
      calculateNumberOfMonths(payment.billed.from, payment.billed.to) +
    payment.previousBalance.amount
  );
};

export default NewPaymentList;
