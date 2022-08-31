import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchCustomers,
  selectAllCustomers,
} from '../customers/services/customers-slice';
import { useParams, useNavigate } from 'react-router-dom';
import useNotify from '../../hooks/use-notify';
import {
  getCircuitById,
  getCircuitsError,
  resetError,
  setStatus,
  editCircuit,
  addCircuit,
} from './services/circuit-slice';
import useRequestStatus from '../../hooks/use-request-status';

import PageToolsbar from '../../components/PageToolsbar';
import CircuitForm from './components/CircuitForm';
import { Box } from '@mui/material';
import Loading from '../../components/Loading';

const newCircuit = {
  name: '',
  customerId: '',
  customerName: '',
  capacity: '',
  cost: '',
};

function AddEditCircuit() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.circuits);
  const { id } = useParams();
  const editing = Boolean(id);
  const circuit = useSelector(getCircuitById(id));
  const notify = useNotify();
  const errorMessage = useSelector(getCircuitsError)?.message || '';
  const navigate = useNavigate();
  let resetForm = () => {};
  const allCustomers = useSelector(selectAllCustomers).map((c) => ({
    _id: c._id,
    name: c.name,
  }));

  useEffect(() => {
    //if we dont have a customer and we are adding get customers
    if (!Boolean(allCustomers?.length)) {
      dispatch(fetchCustomers());
    }

    /*eslint-disable */
  }, []);

  const onSuccess = () => {
   
    notify(
      `${editing ? 'Edited' : 'Added'} successfully`,
      { x: 'right', y: 'bottom' },
      'success'
    );
    resetForm();
    navigate('/circuits');
  };
  const onError = () => {
    notify(errorMessage, { x: 'right', y: 'bottom' }, 'error');
    dispatch(resetError());
  };

  const isLoading = useRequestStatus(status, setStatus, onSuccess, onError);

  const handleSubmit = (values, action) => {
    if (editing) {
      delete values._id;
      dispatch(editCircuit({ id, circuit: values }));
    } else {
      dispatch(addCircuit(values));
    }

    resetForm = action.resetForm();
  };

  return (
    <>
      <PageToolsbar
        pageTitle={`${editing ? 'Edit Circuit' : 'Add Circuit'}`}
        linkName='Circuits'
        linkPath='/circuits'
      />
      <Box sx={{ mt: 4 }}>
        {allCustomers.length ? (
          <CircuitForm
            customers={allCustomers}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            circuit={editing ? circuit : newCircuit}
            editing={editing}
          />
        ) : (
          <Loading />
        )}
      </Box>
    </>
  );
}

export default AddEditCircuit;
