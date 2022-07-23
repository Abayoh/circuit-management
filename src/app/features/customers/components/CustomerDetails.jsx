import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCustomerById } from '../services/customers-slice';
import { selectCircuitByCustomerId } from '../../circuits/services/circuit-slice';
import { selectPaymentsByCustomerId } from '../../payments/payments-slice';
import PageHeader from '../../../components/PageTitle';
import CircuitsWithPaymentList from './CircuitWithPaymentList';
import format from 'date-fns/format';
import SpanningTable from '../../../components/spanning-table/SpanningTable';
import CustomerPaymentList from './CustomerPaymentList';

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
          let payment = customerPayments.find((p) => {
            debugger;
            return p.circuitId === c.id && p.current;
          });
          if (!payment) {
            payment = {
              amount: 0,
              balance: 0,
              billed: {
                from: Date.now(),
                to: Date.now(),
              },
            };
          }
          debugger;
          return {
            name: c.name,
            activationDate: '1/9/2022',
            monthlyCost: c.cost,
            lastPaymentDate: format(payment.billed.from, 'PP'),
            paymentExpiryDate: format(payment.billed.to, 'PP'),
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
            <Grid item md={12}>
              <CircuitsWithPaymentList circuits={circuitsWithPaymentInfo} />
            </Grid>
            <Grid item md={4}>
              <CustomerPaymentList />
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
};

export default CustomerDetails;
