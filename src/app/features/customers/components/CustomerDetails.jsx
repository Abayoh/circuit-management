import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getCustomerById } from '../services/customers-slice';
import { selectCircuitByCustomerId } from '../../circuits/circuit-slice';
import { selectCurrentPaymentsByCustomerId } from '../../payments/payments-slice';
import PageHeader from '../../../components/PageTitle';
import CurrentPaymentList from './CurrentPaymentList';
import lastDayOfMonth from 'date-fns/lastDayOfMonth';
import addMonths from 'date-fns/addMonths';
import NewPaymentList from './NewPaymentList';
import { Typography } from '@mui/material';
import AddPaymentAmountDialog from './AddPaymentAmountDialog';

function ccyFormat(num) {
  return `$${num}.00`;
}

const CustomerDetails = () => {
  const [circuitsWithPaymentInfo, setCircuitsWithPaymentInfo] = useState([]);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [cheque, setCheque] = useState(null);
  const [newPayments, setNewPayments] = useState([]);
  const [balanceAmountOnCheque, setBalanceAmountOnCheque] = useState(0);
  const { id } = useParams();

  const customer = useSelector(getCustomerById(id));
  const customerCircuits = useSelector((state) =>
    selectCircuitByCustomerId(state, id)
  );
  const customerCurrentPayments = useSelector((state) =>
    selectCurrentPaymentsByCustomerId(state, id)
  );

  const handleAddPaymentDialogClose = (newCheque) => {
    if (newCheque) {
      setCheque(newCheque);
      setBalanceAmountOnCheque(newCheque.amount);
    }
    setDialogIsOpen(false);
  };

  const handleAddPaymentDialogOpen = () => setDialogIsOpen(true);

  const handleItemsDeselected = (circuitNames) => {
    //remove the deselected payment from the new payment list
    //then increament the balanceAmountOnCheque by the the total amount
    //on the deseleted payments
  };

  const handleItemsSelected = (circuitNames) => {
    //create new payments and add it to the new payment list
    const { payments, newCurrentBalanceOnDisplay } =
      createNewPayments(circuitNames);
    //update balanceAmountOnCheque
    setBalanceAmountOnCheque(newCurrentBalanceOnDisplay);
    setNewPayments((preState) => [...preState, ...payments]);
  };

  const createNewPayments = (circuitNames) => {
    //get Display Amount
    debugger;
    let newCurrentBalanceOnDisplay = balanceAmountOnCheque;
    const payments = [];
    const numberOfMonths = 3;
    circuitNames.forEach((name) => {
      //get circuit for this item
      const circuit = customerCircuits.find((c) => c.name === name);
      //get the current payment for the above circuit
      const currentPayment = customerCurrentPayments.find(
        (p) => p.circuit.name === circuit.name
      );

      //create the payment
      let amount = calculatePaymentAmount(
        circuit,
        currentPayment,
        numberOfMonths
      );
      if (amount >= newCurrentBalanceOnDisplay) {
        amount = newCurrentBalanceOnDisplay;
        newCurrentBalanceOnDisplay = 0;
      } else {
        newCurrentBalanceOnDisplay -= amount;
      }
      payments.push(
        getNewPayment(
          circuit,
          currentPayment,
          'Josephous Brown',
          customer,
          numberOfMonths,
          amount
        )
      );
    });

    return { payments, newCurrentBalanceOnDisplay };
  };

  const getNewPayment = (
    circuit,
    currentPayment,
    userName,
    customer,
    numberOfMonths,
    amount
  ) => {
    if (!circuit) throw new Error('circuit Cannot be null');
    if (!userName) throw new Error('userName Cannot be null');
    if (!customer) throw new Error('customer Cannot be null');
    if (!numberOfMonths) throw new Error('numberOfMonths Cannot is required');

    const currentPaymentEndDate = currentPayment?.billed.to || 0;
    return {
      amount: amount,
      receiveBy: userName,
      circuit: {
        name: circuit.name,
        cost: circuit.cost,
      },
      customerName: customer.name,
      customerId: id,
      chequeId: cheque.id,
      current: false,
      billed: {
        from: getNewPaymentStartDate(currentPaymentEndDate),
        to: getNewPaymentEndDate(currentPaymentEndDate, numberOfMonths),
      },
      balance: 0,
      previousBalance: {
        paymentId: currentPayment?.id || '',
        amount: currentPayment?.balance || 0,
      },
      dateDeposited: Date.now(),
    };
  };

  return (
    <Box>
      {customer && (
        <>
          <Stack direction='row' justifyContent='space-between'>
            <PageHeader
              Icon='people'
              title={customer.name}
              subTitle={customer.contacts}
            />
            <Button
              onClick={handleAddPaymentDialogOpen}
              variant='contained'
              sx={{ height: '48px' }}
            >
              Make Payment
            </Button>
            <AddPaymentAmountDialog
              open={dialogIsOpen}
              onClose={handleAddPaymentDialogClose}
            />
          </Stack>
          <Grid container spacing={2}>
            <Grid item md={12}>
              <CurrentPaymentList
                currentPayments={customerCurrentPayments}
                disableAddingToPaymentList={!Boolean(cheque)}
                onItemsDeselected={handleItemsDeselected}
                onItemsSelected={handleItemsSelected}
              />
              <Button
                onClick={() => alert(addMonths(new Date('7/31/2022'), 3))}
              >
                calculate
              </Button>
            </Grid>
            {cheque && (
              <>
                <Grid item md={8}>
                  <NewPaymentList newPayments={newPayments} />
                </Grid>
                <Grid item md={4}>
                  <Card>
                    <CardHeader title='Amount' />
                    <CardContent
                      sx={{
                        display: 'grid',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography variant='h3'>
                        {ccyFormat(balanceAmountOnCheque)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </>
            )}
          </Grid>
        </>
      )}
    </Box>
  );
};

const getNewPaymentStartDate = (currentPaymentEndDate) => {
  return currentPaymentEndDate ? currentPaymentEndDate : getNewDate();
};

const getNewPaymentEndDate = (currentPaymentEndDate, numberOfMonths) => {
  const newPaymentStartDate = getNewPaymentStartDate(currentPaymentEndDate);
  return addMonths(newPaymentStartDate, numberOfMonths);
};

const getNewDate = () => {
  //is current day less then or equal to the 10th of any month and  year
  //then return the last day of the previous month
  //else return the last day of the current month
  let currentDate = new Date();
  let currentMonth = currentDate.getMonth() + 1;
  let currentYear = currentDate.getFullYear();
  let tenthOfTheMonth = `${currentMonth}/10/${currentYear}`;
  const isDayLessThenTenth =
    Date.parse(currentDate) <= Date.parse(tenthOfTheMonth);
  return isDayLessThenTenth
    ? getLastDayOfPreviousMonth()
    : getLastDayOfCurrentMonth();
};

const getLastDayOfPreviousMonth = () => {
  return Date.parse(
    lastDayOfMonth(`${new Date().getMonth()}/10/${new Date.getFullYear()}`)
  );
};

const getLastDayOfCurrentMonth = () => {
  return Date.parse(lastDayOfMonth(Date.now));
};

const calculatePaymentAmount = (circuit, currentPayment, numberOfMonths) => {
  return circuit.cost * numberOfMonths + currentPayment?.balance || 0;
};

export default CustomerDetails;
