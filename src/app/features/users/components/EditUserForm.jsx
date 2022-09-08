import React from 'react';
import Grid from '@mui/material/Grid';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import TextInput from '../../../components/form-inputs/TextInput.jsx';
import SubmitButton from '../../../components/form-inputs/SubmitButton.jsx';

const validateForm = {
  fullName: Yup.string().required('Circuits name is required').min(3),
  phoneNumber: Yup.string().required('phone number is required'),
};

const userFields = {
  fullName: '',
  phoneNumber: '',
};

function UserForm({ isLoading, onSubmit }) {
  return (
    <Formik
      initialValues={userFields}
      validationSchema={Yup.object(validateForm)}
      onSubmit={onSubmit}
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
              label='Phone Number'
              name='phoneNumber'
              fullWidth
              variant='outlined'
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
