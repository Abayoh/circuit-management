import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchUsers,
  setStatus,
  getUsersError,
  getUsersStatus,
  selectAllUsers,
  editUser,
  changeRoles,
  resetPassword,
  deleteUser,
} from './users-slice';
import useNotify from '../../hooks/use-notify';

import PageToolsbar from '../../components/PageToolsbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import EditUserform from './components/EditUserForm';
import EditUserRoles from './components/EditUseRoles';
import ResetUserPassword from './components/ResetUserPassword';
import useRequestStatus from '../../hooks/use-request-status';
import EnhancedTable from '../../components/data-table/EnhancedTable';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import DeleteUser from './components/DeleteUser';

const formStates = {
  editUser: 'editUser',
  editUserRoles: 'editRoles',
  resetUserPassword: 'reset',
  deleteUser: 'delete',
};

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
  const userStatus = useSelector(getUsersStatus);
  const [modalOpen, setModalOpen] = useState(false);
  const [formState, setFormState] = useState(formStates.editUserRoles);
  const [user, setUser] = useState(null);
  const notify = useNotify();
  const errorMessage = useSelector(getUsersError)?.message || '';

  const onSuccess = (loading) => {
    
    if (!loading) {
      notify(`save successfully`, { x: 'right', y: 'bottom' }, 'success');
    }
  };
  const onError = () => {
    notify(errorMessage, { x: 'right', y: 'bottom' }, 'error');
  };

  const isLoading = useRequestStatus(userStatus, setStatus, onSuccess, onError);

  useEffect(() => {
    dispatch(fetchUsers());

    /* eslint-disable */
  }, []);

  const actionButtons = useCallback(
    (row) => {
      return (
        <Box sx={{ display: 'flex', '&>button': { ml: 2 } }}>
          <Button
            variant='outlined'
            color='warning'
            onClick={() => handleResetPassword(row._id)}
          >
            Reset Password
          </Button>
          <Button
            variant='outlined'
            color='warning'
            onClick={() => handleChangeRoles(row._id)}
          >
            change Role
          </Button>
          <Button
            variant='outlined'
            color='success'
            onClick={() => handleEditUser(row._id)}
          >
            Edit
          </Button>
          <Button
            variant='outlined'
            color='error'
            onClick={() => handleDeleteUser(row._id)}
          >
            Delete
          </Button>
        </Box>
      );
    },
    [users]
  );

  let renderModalContent = () => {
    if (formState === formStates.editUser) {
      return (
        <EditUserform
          user={user}
          isLoading={isLoading}
          onSubmit={handleSubmit}
          onCancel={handleClose}
        />
      );
    } else if (formState === formStates.editUserRoles) {
      return (
        <EditUserRoles
          user={user}
          isLoading={isLoading}
          onSubmit={handleSubmit}
          onCancel={handleClose}
        />
      );
    } else if (formState === formStates.resetUserPassword) {
      return (
        <ResetUserPassword
          user={user}
          isLoading={isLoading}
          onSubmit={handleSubmit}
          onCancel={handleClose}
        />
      );
    } else if (formState === formStates.deleteUser) {
      return <DeleteUser onCancel={handleClose} onConfirm={handleSubmit} />;
    } else {
      return <></>;
    }
  };

  const handleClose = () => {
    setModalOpen(false);
    setFormState('');
    setUser(null);
  };

  const handleEditUser = (id) => {
    const user = users.find((user) => user._id === id);
    const userInfo = {
      _id: user._id,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
    };
    setFormState(formStates.editUser);
    setUser(userInfo);
    setModalOpen(true);
  };
  const handleResetPassword = (id) => {
    const user = users.find((user) => user._id === id);
    const userInfo = {
      _id: user._id,
    };
    setFormState(formStates.resetUserPassword);
    setUser(userInfo);
    setModalOpen(true);
  };
  const handleChangeRoles = (id) => {
    const { roles, _id } = users.find((user) => user._id === id);
    const userInfo = { _id, roles };
    setFormState(formStates.editUserRoles);
    setUser(userInfo);
    setModalOpen(true);
  };

  const handleDeleteUser = (id) => {
    const user = users.find((user) => user._id === id);
    const userInfo = {
      _id: user._id,
    };
    setFormState(formStates.deleteUser);
    setUser(userInfo);
    setModalOpen(true);
  };

  const handleSubmit = (values) => {
    if (formState === formStates.editUser) {
      dispatch(editUser({ id: values._id, user: values }));
    } else if (formState === formStates.editUserRoles) {
      const { roles } = values;
      dispatch(changeRoles({ id: values._id, user: { roles } }));
    } else if (formState === formStates.resetUserPassword) {
      const { password } = values;
      dispatch(resetPassword({ id: values._id, user: { password } }));
    } else if (formState === formStates.deleteUser) {
      dispatch(deleteUser(user._id));
    }
    handleClose();
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

      <Modal open={modalOpen}>
        <Card
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            boxShadow: 24,
          }}
        >
          <CardHeader title='Shrimp and Chorizo Paella' />
          <CardContent>{renderModalContent()}</CardContent>
        </Card>
      </Modal>
    </>
  );
};

export default UserList;
