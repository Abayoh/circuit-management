import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { fetchCustomers, getCustomersStatus } from './services/customers-slice';
import { fetchCircuits, getCircuitsStatus } from '../circuits/services/circuit-slice';
import { fetchPayments, getPaymentsStatus } from '../payments/payments-slice';

const Customers = () => {
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
      dispatch(fetchCustomers());
      dispatch(fetchCircuits());
      dispatch(fetchPayments());
    }
  }, [customersStatus, dispatch, circuitsStatus, paymentsStatus]);
  return (
    <>
      <Outlet />
    </>
  );
};

export default Customers;
