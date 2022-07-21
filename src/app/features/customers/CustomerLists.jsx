import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  selectAllCustomers,
  getCustomersError,
  getCustomersStatus,
} from './customers-slice';
import CustomerCard from './CustomerCard';
import Loading from '../../components/Loading';

const CustomersList = () => {
  const customers = useSelector(selectAllCustomers);
  const customersStatus = useSelector(getCustomersStatus);
  const customersError = useSelector(getCustomersError);
  const navigate = useNavigate();

  const navigateToDetails = (customerId) => navigate(customerId);

  const Customers = () => (
    <Grid
      container
      rowSpacing={{ xs: 1, sm: 2, md: 3 }}
      columnSpacing={{ xs: 1, sm: 2, md: 3 }}
    >
      {customers.map((customer) => (
        <Grid key={customer.id} item>
          <CustomerCard
            name={customer.name}
            circuitsCount={5}
            onDetailsClick={() => navigateToDetails(customer.id)}
          />
        </Grid>
      ))}
    </Grid>
  );

  const Error = () => <h1>Something Went Wrong</h1>;

  let content;
  if (customersStatus === 'loading') {
    content = <Loading />;
  } else if (customersStatus === 'succeeded') {
    content = <Customers />;
  } else if (customersStatus === 'failed') {
    content = <Error />;
  }

  return <>{content}</>;
};

export default CustomersList;
