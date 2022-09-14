import React from 'react';
import Grid from '@mui/material/Grid';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import TextInput from '../../../components/form-inputs/TextInput.jsx';
import SubmitButton from '../../../components/form-inputs/SubmitButton.jsx';
import Button from '@mui/material/Button'
const validateForm = {
  password: Yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(
      /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      'Must Contain 8 Characters, One Lowercase, One Number and One Special Case Character'
    ),
  confirmPassword: Yup.string().when('password', (password, field) =>
    password
      ? field.required().oneOf([Yup.ref('password')], 'password must match')
      : field
  ),
};

const newPassword = {
  password: '',
  confirmPassword: '',
};


function UserForm({ user, isLoading, onSubmit, onCancel }) {
  const handleSubmit = (values, action) => {
    const password = {_id:user._id, password:values.password};
    onSubmit(password, action);
  };
  return (
    <Formik
      initialValues={newPassword}
      validationSchema={Yup.object(validateForm)}
      onSubmit={handleSubmit}
    >
      <Form>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <TextInput
              label='New Password'
              name='password'
              fullWidth
              variant='outlined'
              type='password'
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextInput
              label='Confirm Password'
              name='confirmPassword'
              fullWidth
              variant='outlined'
              type='password'
            />
          </Grid>

          <Grid
            container
            item
            xs={12}
            direction='row'
            justifyContent='flex-end'
          >
            <SubmitButton isLoading={isLoading} variant='contained'>
              Save
            </SubmitButton>
            <Button
              variant='outlined'
              color='error'
              onClick={onCancel}
              sx={{ ml: 1 }}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
}

export default UserForm;
