import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCustomerById } from './customers-slice';
import { selectCircuitByCustomerId } from '../circuits/circuit-slice';
import { selectPaymentsByCustomerId } from '../payments/payments-slice';
import PageHeader from '../../components/PageTitle';
import CircuitsWithPaymentList from './CircuitWithPaymentList';

const CustomerDetails = () => {
  const [circuitsWithPaymentInfo, setCircuitsWithPaymentInfo] = useState([]);
  const { id } = useParams();
  const customer = useSelector(getCustomerById(id));
  const customerCircuits = useSelector((state) =>
    selectCircuitByCustomerId(state, id)
  );
  const customerPayments = useSelector((state) =>
    selectPaymentsByCustomerId(state, id)
  );

  useEffect(() => {
    if (customerCircuits.length > 0 && customerPayments.length > 0) {
      const joinCircuitsWithPaymentInfo = () => {
        return customerCircuits.map((c) => {
          const payment = customerPayments.find((p) => {
            debugger;
            return p.circuitId === c.id && p.current;
          });
          debugger;
          return {
            name: c.name,
            activationDate: '1/9/2022',
            monthlyCost: c.cost,
            lastPaymentDate: payment.billed.from,
            paymentExpiryDate: payment.billed.to,
            amountPaid: payment.amount,
            balance: payment.balance,
          };
        });
      };
      setCircuitsWithPaymentInfo(joinCircuitsWithPaymentInfo());
    }
  }, [customerCircuits, customerPayments]);

  debugger;
  return (
    <Box>
      {customer && (
        <>
          <PageHeader
            Icon='people'
            title={customer.name}
            subTitle={customer.contacts}
          />
          <Grid container spacing={2}>
            <Grid item md={9}>
              <CircuitsWithPaymentList circuits={circuitsWithPaymentInfo} />
            </Grid>
            <Grid item md={3}></Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default CustomerDetails;
