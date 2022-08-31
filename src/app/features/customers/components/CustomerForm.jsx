import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';


// from inputs
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import TextInput from '../../../components/form-inputs/TextInput.jsx';
import SelectInput from '../../../components/form-inputs/SelectInput';
import SubmitButton from '../../../components/form-inputs/SubmitButton';

const validateForm = {
  name: Yup.string().required('Customer name is required'),
  type: Yup.string().required('Please select customer type'),
  contacts: Yup.string().required('Customer contact is Required'),
  address: Yup.object().shape({
    address1: Yup.string().required('address1 is required'),
    street: Yup.string().required('street is required'),
    city: Yup.string().required('city is required'),
    county: Yup.string().required('county is required'),
  }),
};



function AddCustomerForm({customer, isLoading, onSubmit}) {
  return (
      
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
              <Grid item md={6} xs={12}>
                <SelectInput
                  fullWidth
                  label='Customer type'
                  name='type'
                  select
                  variant='outlined'
                >
                  <MenuItem value='regular'>Regular</MenuItem>
                  <MenuItem value='stock holder'>Stock Holder</MenuItem>
                </SelectInput>
              </Grid>

              <Grid item md={3} xs={12}>
                <TextInput
                  fullWidth
                  label='Contact'
                  name='contacts'
                  variant='outlined'
                  type='string'
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
    
    
  );
}

export default AddCustomerForm;
