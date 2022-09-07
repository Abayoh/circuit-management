import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addPayments,
  resetError,
  setStatus,
  getPaymentsError,
} from '../payments/payments-slice';
import { useParams } from 'react-router-dom';
import { getCustomerById } from './services/customers-slice';
import { selectCircuitByCustomerId } from '../circuits/services/circuit-slice';
import { selectCurrentPaymentsByCustomerId } from '../payments/payments-slice';
import { useNavigate } from 'react-router-dom';
import usePrompt from '../../hooks/use-block-transition';
import lastDayOfMonth from 'date-fns/lastDayOfMonth';
import addMonths from 'date-fns/addMonths';
import useNotify from '../../hooks/use-notify';
import useRequestStatus from '../../hooks/use-request-status';
import { ObjectID } from 'bson';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Stack from '@mui/material/Stack';
import PageHeader from '../../components/PageTitle';
import CurrentPaymentList from './components/CurrentPaymentList';
import NewPaymentList from './components/NewPaymentList';
import { Typography } from '@mui/material';
import AddPaymentAmountDialog from './components/AddPaymentAmountDialog';
import ConfirmationDialogRaw from '../../components/Confirm';
import Loading from '../../components/Loading';

function ccyFormat(num) {
  return `$${num}.00`;
}

const AddCustomerPayments = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);
  const [confirmNavigationIsOpen, setConfirmNavigationIsOpen] = useState(false);

  const [cheque, setCheque] = useState(null);
  const [newPayments, setNewPayments] = useState([]);
  const [
    currentPaymentsForAddingNewPayment,
    setcurrentPaymentsForAddingNewPayment,
  ] = useState([]);
  const [balanceAmountOnCheque, setBalanceAmountOnCheque] = useState(0);
  const { id } = useParams();

  const customer = useSelector(getCustomerById(id));
  const customerCircuits = useSelector((state) =>
    selectCircuitByCustomerId(state, id)
  );
  const customerCurrentPayments = useSelector((state) =>
    selectCurrentPaymentsByCustomerId(state, id)
  );

  const { status } = useSelector((state) => state.payments);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notify = useNotify();
  const errorMessage = useSelector(getPaymentsError)?.message || '';


  const onSuccess = (loaded) => {
    if (!loaded) {
      notify('Added successfully', { x: 'right', y: 'bottom' }, 'success');
      //resetForm();
      navigate('/customers');
    }
  };
  const onError = () => {
    notify(errorMessage, { x: 'right', y: 'bottom' }, 'error');
    dispatch(resetError());
  };

  const isLoading = useRequestStatus(status, setStatus, onSuccess, onError);

  useEffect(() => {
    debugger;
    const currentPaymentsForAdding = customerCircuits.reduce((p, circuit) => {
      //find current payment for each circuit
      let payment = customerCurrentPayments.find(
        (cp) => cp.circuit.name === circuit.name
      );
      if (payment) {
        return [...p, payment]; //if there is a payment return it
      } else {
        //else create Temp Payment
        payment = getTempCurrentPayment(circuit, 'TEMP', customer);
        return [...p, payment];
      }
    }, []);
    setcurrentPaymentsForAddingNewPayment(currentPaymentsForAdding);
    /*eslint-disable */
  }, [customerCurrentPayments, customerCircuits]);

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
    const paymentsRemoved = findPaymentsToBeRemoved(circuitNames, newPayments);

    let filteredPayments = circuitNames.reduce((prev, circuitName) => {
      return prev.filter((p) => p.circuit.name !== circuitName);
    }, newPayments);

    setNewPayments([...filteredPayments]);

    //then increament the balanceAmountOnCheque by the the total amount
    //on the deseleted payments
    const sumOfPaymentsAmount = paymentsRemoved.reduce(
      (sum, payment) => sum + payment.amount,
      0
    );
    setBalanceAmountOnCheque((prev) => prev + sumOfPaymentsAmount);
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
      let balance = 0;
      if (amount >= newCurrentBalanceOnDisplay) {
        balance = amount - newCurrentBalanceOnDisplay;
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
          amount,
          balance
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
    amount,
    balance
  ) => {
    if (!circuit) throw new Error('circuit Cannot be null');
    if (!userName) throw new Error('userName Cannot be null');
    if (!customer) throw new Error('customer Cannot be null');
    if (!numberOfMonths) throw new Error('numberOfMonths Cannot is required');

    const currentPaymentEndDate = currentPayment?.billed.to || 0;
    const tempPreviousId = new ObjectID();
    return {
      amount: amount,
      receiveBy: userName,
      circuit: {
        name: circuit.name,
        cost: circuit.cost,
      },
      customerName: customer.name,
      customerId: id,
      chequeId: cheque?.name,
      current: true,
      billed: {
        from: getNewPaymentStartDate(currentPaymentEndDate),
        to: getNewPaymentEndDate(currentPaymentEndDate, numberOfMonths),
      },
      balance: balance,
      previousBalance: {
        paymentId: currentPayment?._id || tempPreviousId,
        amount: currentPayment?.balance || 0,
      },
      dateDeposited: Date.now(),
    };
  };

  const newPaymentEdited = (payment) => {
    let paymentSum = 0;
    const editedPayments = newPayments.map((p) => {
      if (payment.circuit.name === p.circuit.name) {
        paymentSum += payment.amount;
        return payment;
      }
      paymentSum += p.amount;
      return p;
    });
    setBalanceAmountOnCheque(cheque.amount - paymentSum);
    setNewPayments(editedPayments);
  };

  const confirmNavigation = () => {
    setConfirmNavigationIsOpen(true);
  };

  const { location, setCanNavigate } = usePrompt(
    confirmNavigation,
    cheque !== null
  );

  const handleCanNavigateClose = (isConfirmed) => {
    setConfirmNavigationIsOpen(false);
    setCanNavigate(isConfirmed);
    navigate(location.pathname);
  };

  const handleSavePayments = () => {
    const { file, ...chequeInfo } = cheque;
    const formData = new FormData();

    chequeInfo.customerId = id;
    //formData does not take objects or array therefore convert the object and array to string
    const paymentsJson = JSON.stringify(newPayments);
    const chequeInfoJson = JSON.stringify(chequeInfo);

    formData.append('file', file);
    formData.append('chequeInfo', chequeInfoJson);
    formData.append('payments', paymentsJson);

    dispatch(addPayments(formData));
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
              disabled={newPayments.length !== 0}
            >
              Make Payment
            </Button>
            <ConfirmationDialogRaw
              id='ringtone-menu'
              keepMounted
              open={confirmNavigationIsOpen}
              onClose={handleCanNavigateClose}
              message='You have unsave changes! You will loose your changes if you leave!'
              title='Are you sure you want to leave?'
            />
            <AddPaymentAmountDialog
              open={dialogIsOpen}
              onClose={handleAddPaymentDialogClose}
            />
          </Stack>
          <Grid container spacing={2}>
            <Grid item md={12}>
              <CurrentPaymentList
                currentPayments={currentPaymentsForAddingNewPayment}
                disableAddingToPaymentList={!Boolean(cheque)}
                onItemsDeselected={handleItemsDeselected}
                onItemsSelected={handleItemsSelected}
              />
            </Grid>
            {cheque && (
              <>
                <Grid item md={9}>
                  <Typography variant='h5' sx={{ mb: 1 }}>
                    New Payments
                  </Typography>
                  <NewPaymentList
                    newPayments={newPayments}
                    onChange={newPaymentEdited}
                  />
                </Grid>
                <Grid item md={3}>
                  <Stack spacing={2}>
                    <Card>
                      <CardHeader title='Balance Amount' />
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
                        <Box
                          sx={{
                            position: 'relative',
                            mt: 3,
                            pl: 3,
                            '&:before': {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              bottom: 0,
                              width: '10px',
                              backgroundColor: `${
                                balanceAmountOnCheque === 0
                                  ? 'success.main'
                                  : 'error.main'
                              }`,
                            },
                          }}
                        >
                          {balanceAmountOnCheque === 0
                            ? 'Balanced'
                            : 'Not Balanced'}
                        </Box>
                      </CardContent>
                    </Card>
                    <Button
                      disabled={balanceAmountOnCheque !== 0 || isLoading}
                      variant='contained'
                      onClick={handleSavePayments}
                    >
                      Save Payments
                    </Button>
                  </Stack>
                </Grid>
              </>
            )}
          </Grid>
        </>
      )}
      {isLoading && <Loading />}
    </Box>
  );
};

const getNewPaymentStartDate = (currentPaymentEndDate) => {
  return currentPaymentEndDate ? currentPaymentEndDate : getNewDate();
};

const getNewPaymentEndDate = (currentPaymentEndDate, numberOfMonths) => {
  const newPaymentStartDate = getNewPaymentStartDate(currentPaymentEndDate);
  return Date.parse(addMonths(newPaymentStartDate, numberOfMonths));
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
    lastDayOfMonth(
      Date.parse(`${new Date().getMonth()}/10/${new Date().getFullYear()}`)
    )
  );
};

const getLastDayOfCurrentMonth = () => {
  return Date.parse(lastDayOfMonth(Date.now()));
};

const findPaymentsToBeRemoved = (circuitNames, newPayments) => {
  return circuitNames.reduce(
    (payments, circuitName) => [
      ...payments,
      newPayments.find((p) => p.circuit.name === circuitName),
    ],
    []
  );
};

const calculatePaymentAmount = (circuit, currentPayment, numberOfMonths) => {
  const amount = circuit.cost * numberOfMonths + (currentPayment?.balance || 0);

  return amount;
};

const getTempCurrentPayment = (circuit, userName, customer) => {
  return {
    amount: 'NEW',
    receiveBy: userName,
    circuit: {
      name: circuit.name,
      cost: circuit.cost,
    },
    customerName: customer.name,
    customerId: customer._id,
    chequeId: '',
    current: true,
    billed: {
      from: Date.now(),
      to: Date.now(),
    },
    balance: 0,
    previousBalance: {
      paymentId: '',
      amount: 0,
    },
    dateDeposited: Date.now(),
  };
};

export default AddCustomerPayments;
