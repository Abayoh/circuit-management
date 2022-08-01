import React, { useEffect, useState } from 'react';
import EnhancedTable from '../../../components/data-table/EnhancedTable';
import format from 'date-fns/format';

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Name',
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

export default function CurrentPaymentList({
  currentPayments = [],
  disableAddingToPaymentList,
  onItemsSelected,
  onItemsDeselected,
}) {
  const [tableFormat, setTableFormat] = useState([]);
  useEffect(() => {
    debugger;
    const payments = currentPayments.map((p) => ({
      name: p.circuit.name,
      monthlyCost: p.circuit.cost,
      lastPaymentDate: format(p.billed.from, 'PP'),
      paymentExpiryDate: format(p.billed.to, 'PP'),
      amountPaid: p.amount,
      balance: p.balance,
    }));

    setTableFormat(payments);
  }, [currentPayments]);
  return (
    <EnhancedTable
      idFieldName='name'
      rows={tableFormat}
      headCells={headCells}
      tableLabel='Circuits Payment Info'
      selectDisabled={disableAddingToPaymentList}
      onItemsSelected={onItemsSelected}
      onItemsDeselected={onItemsDeselected}
    />
  );
}
