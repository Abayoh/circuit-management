import React from 'react';
import Grid from '@mui/material/Grid';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import TextInput from '../../../components/form-inputs/TextInput.jsx';
import SubmitButton from '../../../components/form-inputs/SubmitButton.jsx';
import MultipleSelect from '../../../components/form-inputs/SelectMultiple.jsx';

const validateForm = {
  fullName: Yup.string().required('Circuits name is required').min(3),
  email: Yup.string()
    .email('please enter a valid email')
    .required('email is required'),
  phoneNumber: Yup.string().required('phone number is required'),
  roles: Yup.array().of(Yup.string('atleast on role is required')).min(1),
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

const newUser = {
  fullName: '',
  email: '',
  phoneNumber: '',
  roles: [],
  password: '',
  confirmPassword: '',
};

const roles = [
  { name: 'Admin', value: 'admin' },
  { name: 'Capacity Manager', value: 'manager' },
  { name: 'User', value: 'user' },
  { name: 'Finance', value: 'finance' },
];

function UserForm({ isLoading, onSubmit }) {
  const handleSubmit = (values, action) => {
    const { confirmPassword, ...newValues } = values;
    onSubmit(newValues, action);
  };
  return (
    <Formik
      initialValues={newUser}
      validationSchema={Yup.object(validateForm)}
      onSubmit={handleSubmit}
    >
      <Form>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <TextInput
              label='Full Name'
              name='fullName'
              fullWidth
              variant='outlined'
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextInput
              label='Email'
              name='email'
              fullWidth
              variant='outlined'
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextInput
              label='Phone Number'
              name='phoneNumber'
              fullWidth
              variant='outlined'
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <MultipleSelect
              label='Select Roles'
              options={roles}
              name='roles'
              fullWidth
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <TextInput
              label='Password'
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

          <Grid item md={6} xs={12}>
            <SubmitButton isLoading={isLoading} variant='contained'>
              Save
            </SubmitButton>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
}

export default UserForm;
