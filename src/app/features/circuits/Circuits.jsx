import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { getCircuitsError, getCircuitsStatus, fetchCircuits } from './services/circuit-slice'
import { fetchCustomers, getCustomersStatus } from '../customers/services/customers-slice';
import { fetchPayments, getPaymentsStatus } from '../payments/payments-slice';
import { Outlet } from 'react-router-dom';


const Circuits = () => {
  const dispatch = useDispatch();
  const customersStatus = useSelector(getCustomersStatus);
  const circuitsStatus = useSelector(getCircuitsStatus);
  const paymentsStatus = useSelector(getPaymentsStatus);

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
      <Outlet />
    </>
  )
}

export default Circuits