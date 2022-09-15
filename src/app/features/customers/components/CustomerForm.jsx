import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// from inputs
import Grid from '@mui/material/Grid';
import TextInput from '../../../components/form-inputs/TextInput.jsx';
import SubmitButton from '../../../components/form-inputs/SubmitButton';
import ShareDependentField from '../../../components/form-inputs/ShareDependentField.jsx';
import CheckBoxInput from '../../../components/form-inputs/CheckBoxInput';
import Paper from '@mui/material/Paper';

const validateForm = {
  name: Yup.string().required('Customer name is required'),
  contacts: Yup.string().required('Customer contact is Required'),
  isShareholder: Yup.boolean(),
  share: Yup.number()
    .when('isShareholder', {
      is: true,
      then: Yup.number().min(1).max(100).required('Share is required'),
    }),
  address: Yup.object().shape({
    address1: Yup.string().required('address1 is required'),
    street: Yup.string().required('street is required'),
    city: Yup.string().required('city is required'),
    county: Yup.string().required('county is required'),
  }),
};

function AddCustomerForm({ customer, isLoading, onSubmit }) {
  return (
    <Paper sx={{ p: 2 }}>
      <Formik
        initialValues={customer}
        validationSchema={Yup.object(validateForm)}
        onSubmit={onSubmit}
      >
        <Form>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextInput fullWidth label='Customer Name' name='name' />
            </Grid>
            <Grid item md={6} xs={12}></Grid>

            <Grid item md={3} xs={12}>
              <TextInput
                fullWidth
                label='Contact'
                name='contacts'
                variant='outlined'
                type='string'
              />
            </Grid>
            <Grid item xs={12} container direction='row'>
              <CheckBoxInput label='Shareholder' name='isShareholder' />
              <ShareDependentField
                fullWidth
                label='Share'
                name='share'
                variant='outlined'
                type='number'
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <TextInput
                fullWidth
                label='Address'
                name='address.address1'
                variant='outlined'
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextInput
                fullWidth
                label='Street'
                name='address.street'
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextInput
                fullWidth
                label='City'
                name='address.city'
                variant='outlined'
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextInput
                fullWidth
                label='County'
                name='address.county'
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
    </Paper>
  );
}

export default AddCustomerForm;
