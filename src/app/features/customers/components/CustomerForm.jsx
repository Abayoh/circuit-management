import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

// from inputs
import Grid from '@mui/material/Grid';
import TextInput from '../../../components/form-inputs/TextInput.jsx';
import SubmitButton from '../../../components/form-inputs/SubmitButton';
import ShareDependentField from '../../../components/form-inputs/ShareDependentField.jsx';
import CheckBoxInput from '../../../components/form-inputs/CheckBoxInput';
import FileUploader from '../../../components/form-inputs/FileUploader';
import FormContainer from '../../../components/form-inputs/FormContainer.jsx';
import CountySelection from '../../../components/form-inputs/CountySelection.jsx';

const validateForm = {
  name: Yup.string().required('Customer name is required'),
  contacts: Yup.string().required('Customer contact is Required'),
  isShareholder: Yup.boolean(),
  share: Yup.number().when('isShareholder', {
    is: true,
    then: Yup.number().min(1).max(100).required('Share is required'),
  }),
  file: Yup.mixed()

    .required('file is required')
    .test('fileSize', 'File size must be less then 1MB', (value) => {
      return value && value.size <= 1000000;
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
    <FormContainer header='Create Customer'>
      <Formik
        initialValues={customer}
        validationSchema={Yup.object(validateForm)}
        onSubmit={onSubmit}
      >
        <Form>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <FileUploader btnLabel='Upload Image' enablePreview name='file' />
            </Grid>
            <Grid item md={6} xs={12} container spacing={2} direction='column'>
              <Grid item>
                <TextInput fullWidth label='Customer Name' name='name' />
              </Grid>
              <Grid item>
                <TextInput
                  fullWidth
                  label='Contact'
                  name='contacts'
                  variant='outlined'
                  type='string'
                />
              </Grid>
              <Grid item>
                <CheckBoxInput label='Shareholder' name='isShareholder' />
                <ShareDependentField
                  label='Share'
                  name='share'
                  variant='outlined'
                  type='number'
                />
              </Grid>
              <Grid item>
                <TextInput
                  fullWidth
                  label='Address'
                  name='address.address1'
                  variant='outlined'
                />
              </Grid>
              <Grid item>
                <TextInput
                  fullWidth
                  label='Street'
                  name='address.street'
                  variant='outlined'
                />
              </Grid>
              <Grid item>
                <TextInput
                  fullWidth
                  label='City'
                  name='address.city'
                  variant='outlined'
                />
              </Grid>
              <Grid item>
                <CountySelection
                  fullWidth
                  label='County'
                  name='address.county'
                  variant='outlined'
                />
              </Grid>
              <Grid item>
                <SubmitButton isLoading={isLoading} variant='contained'>
                  Save
                </SubmitButton>
              </Grid>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </FormContainer>
  );
}

export default AddCustomerForm;
