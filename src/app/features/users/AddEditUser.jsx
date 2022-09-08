import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import useNotify from '../../hooks/use-notify';
import {
  getUserById,
  resetError,
  setStatus,
  editUser,
  addUser,
  getUsersError,
} from './users-slice';
import useRequestStatus from '../../hooks/use-request-status';

import PageToolsbar from '../../components/PageToolsbar';
import { Box } from '@mui/material';
import Loading from '../../components/Loading';
import UserForm from './components/UserForm';

function AddEditUser() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.circuits);
  const { id } = useParams();
  const editing = Boolean(id);
  const user = useSelector(getUserById(id));
  const notify = useNotify();
  const errorMessage = useSelector(getUsersError)?.message || '';
  const navigate = useNavigate();
  let resetForm = () => {};

  const onSuccess = () => {
    notify(
      `${editing ? 'Edited' : 'Added'} successfully`,
      { x: 'right', y: 'bottom' },
      'success'
    );
    resetForm();
    navigate('/users');
  };
  const onError = () => {
    notify(errorMessage, { x: 'right', y: 'bottom' }, 'error');
    dispatch(resetError());
  };

  const isLoading = useRequestStatus(status, setStatus, onSuccess, onError);

  const handleSubmit = (values, action) => {
    if (editing) {
      delete values._id;
      dispatch(editUser({ id, user: values }));
    } else {
      dispatch(addUser(values));
    }

    resetForm = action.resetForm();
  };

  return (
    <>
      <PageToolsbar
        pageTitle={`${editing ? 'Edit User' : 'Add User'}`}
        linkName='Users'
        linkPath='/users'
      />
      <Box sx={{ mt: 4 }}>
        <UserForm isLoading={isLoading} onSubmit={handleSubmit} />
        {isLoading && <Loading />}
      </Box>
    </>
  );
}

export default AddEditUser;
