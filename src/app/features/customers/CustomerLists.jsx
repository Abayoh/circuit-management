import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useNotify from '../../hooks/use-notify';
import {
  selectAllCustomers,
  getCustomersError,
  getCustomersStatus,
  fetchCustomers,
  setStatus,
  resetError,
} from './services/customers-slice';
import useRequestStatus from '../../hooks/use-request-status';
import { fetchCircuits } from '../circuits/services/circuit-slice';
import { fetchPayments } from '../payments/payments-slice';
import CustomerCard from './components/CustomerCard';
import PageToolsbar from '../../components/PageToolsbar';
import Loading from '../../components/Loading';

const CustomersList = () => {
  const dispatch = useDispatch();
  const customers = useSelector(selectAllCustomers);
  const customersStatus = useSelector(getCustomersStatus);
  const customersError = useSelector(getCustomersError);
  const navigate = useNavigate();
  const notify = useNotify();

  const onCustomerFetchError = () => {
    notify(customersError?.message, { x: 'left', y: 'top' }, 'error');
    resetError();
  };

  const isLoading = useRequestStatus(
    customersStatus,
    setStatus,
    () => {},
    onCustomerFetchError
  );

  useEffect(() => {
    const getData = async () => {
      dispatch(fetchCustomers());
    };

    getData();
    /* eslint-disable */
  }, []);

  const Customers = () => (
    <Grid
      container
      rowSpacing={{ xs: 1, sm: 2, md: 3 }}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      {customers.map((customer) => (
        <Grid key={customer._id} item>
          <CustomerCard
            name={customer.name}
            circuitsCount={5}
            onMakePaymentsClick={() => navigateToMakePayments(customer._id)}
            onEditPaymentClick={() => navigateToEditCustomer(customer._id)}
          />
        </Grid>
      ))}
    </Grid>
  );

  const navigateToMakePayments = (customerId) => {
    
    const {isShareholder} = customers.find((customer) => customer._id === customerId);
    dispatch(fetchCircuits());
    dispatch(fetchPayments());
    navigate(customerId);
  };

  const navigateToEditCustomer = (customerId) => navigate(`edit/${customerId}`);

  return (
    <>
      <PageToolsbar
        pageTitle='Customers'
        linkName='Add Customer'
        linkPath='add'
      />
      <Box sx={{ mt: 3 }}>{isLoading ? <Loading /> : <Customers />}</Box>
    </>
  );
};

export default CustomersList;
