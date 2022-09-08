import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import PageToolsbar from '../../components/PageToolsbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import {
  fetchUsers,
  setStatus,
  getUsersError,
  getUsersStatus,
  selectAllUsers,
} from './users-slice';
import useRequestStatus from '../../hooks/use-request-status';
import EnhancedTable from '../../components/data-table/EnhancedTable';

const headCells = [
  {
    id: 'fullName',
    numeric: false,
    disablePadding: false,
    label: 'Name',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Email',
  },
  {
    id: 'phoneNumber',
    numeric: false,
    disablePadding: false,
    label: 'Phone Number',
  },
];
const UserList = () => {
  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();
  const circuitsStatus = useSelector(getUsersStatus);
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
  const isLoading = useRequestStatus(
    circuitsStatus,
    setStatus,
    () => {},
    handleRequestError
  );

  const error = useSelector(getUsersError);

  useEffect(() => {
    dispatch(fetchUsers());

    /* eslint-disable */
  }, []);

  const actionButtons = (row) => {
    return (
      <Box sx={{ display: 'flex', '&>button': { ml: 2 } }}>
        <Button
          variant='outlined'
          color='success'
          onClick={() => handleEditCircuit(row._id)}
        >
          Edit
        </Button>
        <Button variant='outlined' color='error'>
          Delete
        </Button>
      </Box>
    );
  };

  return (
    <>
      <PageToolsbar pageTitle='Users' linkName='Add User' linkPath='add' />
      <EnhancedTable
        idFieldName='_id'
        headCells={headCells}
        tableLabel='Users Info'
        rows={users}
        enableActionCell
        actionButtons={actionButtons}
        selectDisabled
      />
    </>
  );
};

export default UserList;
