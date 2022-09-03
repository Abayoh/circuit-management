import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';

import {
  getCircuitsError,
  getCircuitsStatus,
  fetchCircuits,
  setStatus,
} from './services/circuit-slice';
import { Outlet } from 'react-router-dom';
import useRequestStatus from '../../hooks/use-request-status';

const Circuits = () => {
  const dispatch = useDispatch();
  const circuitsStatus = useSelector(getCircuitsStatus);
  const { enqueueSnackbar } = useSnackbar();
  const handleRequestError = () => {
    enqueueSnackbar(error?.message, {
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right',
      },
      variant: 'error',
    });
  };
   useRequestStatus(
    circuitsStatus,
    setStatus,
    () => {},
    handleRequestError
  );
  const error = useSelector(getCircuitsError);

  useEffect(() => {
    
    dispatch(fetchCircuits());

    /* eslint-disable */
  }, []);

  return <>{ <Outlet />}</>;
};

export default Circuits;
