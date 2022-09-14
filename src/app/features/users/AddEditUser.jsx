import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useNotify from '../../hooks/use-notify';
import {
  resetError,
  setStatus,
  addUser,
  getUsersError,
  getUsersStatus,
} from './users-slice';
import useRequestStatus from '../../hooks/use-request-status';

import PageToolsbar from '../../components/PageToolsbar';
import { Box } from '@mui/material';
import Loading from '../../components/Loading';
import UserForm from './components/UserForm';

function AddEditUser() {
  const dispatch = useDispatch();
  const status = useSelector(getUsersStatus);
  const notify = useNotify();
  const errorMessage = useSelector(getUsersError)?.message || '';
  const navigate = useNavigate();
  let resetForm = () => {};

  const onSuccess = () => {
    notify(`Added successfully`, { x: 'right', y: 'bottom' }, 'success');
    resetForm();
    navigate('/users');
  };
  const onError = () => {
    notify(errorMessage, { x: 'right', y: 'bottom' }, 'error');
    dispatch(resetError());
  };

  const isLoading = useRequestStatus(status, setStatus, onSuccess, onError);

  const handleSubmit = (values, action) => {
    dispatch(addUser(values));
    resetForm = action.resetForm;
  };

  return (
    <>
      <PageToolsbar pageTitle='Add User' linkName='Users' linkPath='/users' />
      <Box sx={{ mt: 4 }}>
        <UserForm isLoading={isLoading} onSubmit={handleSubmit} />
        {isLoading && <Loading />}
      </Box>
    </>
  );
}

export default AddEditUser;
