import React ,{useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectAllCircuits, getCircuitsError, getCircuitsStatus, fetchCircuits } from './circuit-slice'
import { fetchCustomers, getCustomersStatus } from '../customers/services/customers-slice';
import { fetchPayments, getPaymentsStatus } from '../payments/payments-slice';

import PageToolsbar from '../../components/PageToolsbar'
import EnhancedTable from '../../components/data-table/EnhancedTable';


const headCells = [
  {
    id: 'Customer Name',
    numeric: false,
    disablePadding: false,
    label: 'Customer Name',
  },
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
  }
];

const Circuits = () => {
  const dispatch = useDispatch();
  const customersStatus = useSelector(getCustomersStatus);
  const circuitsStatus = useSelector(getCircuitsStatus);
  const paymentsStatus = useSelector(getPaymentsStatus);
  const circuits = useSelector(selectAllCircuits);

  useEffect(() => {
    if (
      customersStatus === 'idle' &&
      circuitsStatus === 'idle' &&
      paymentsStatus === 'idle'
    ) {
      debugger;
      dispatch(fetchCustomers());
      dispatch(fetchCircuits());
      dispatch(fetchPayments());
    }
  }, [customersStatus, dispatch, circuitsStatus, paymentsStatus]);
  

  return (
    <>
      <PageToolsbar pageTitle="Circuits" linkName="Add Circuits" linkPath="add-circuits" />
      <EnhancedTable
        headCells={headCells}
        tableLabel='Circuits Payment Info'
        rows={circuits}
      />
    </>
  )
}

export default Circuits