import React from 'react';
import Grid from '@mui/material/Grid';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import TextInput from '../../../components/form-inputs/TextInput.jsx';
import SubmitButton from '../../../components/form-inputs/SubmitButton.jsx';
import Button from '@mui/material/Button';

const validateForm = {
  fullName: Yup.string().required('Circuits name is required').min(3),
  phoneNumber: Yup.string().required('Phone number is required'),
};



function UserForm({ user, isLoading, onSubmit, onCancel }) {
  return (
    <Formik
      initialValues={user}
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
