import React from 'react';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import TextInput from '../../../components/form-inputs/TextInput.jsx';
import SelectInput from '../../../components/form-inputs/SelectInput';
import InputWithAdorment from '../../../components/form-inputs/InputWithAdorment';
import SubmitButton from '../../../components/form-inputs/SubmitButton.jsx';
import DependentField from '../../../components/form-inputs/DependentField.jsx';

const validateForm = {
  name: Yup.string().required('Circuits name is required'),
  customerId: Yup.string().required('please select a customer'),
  customerName: Yup.string().required('customer name is required'),
  capacity: Yup.string().required('Capacity is required'),
  cost: Yup.number().required('Cost is required'),
  miu: Yup.number().required('Cost is required').min(0),
};

const newCircuit = {
  name: '',
  customerId: '',
  customerName: '',
  capacity: '',
  cost: '',
  miu: 0,
};

function CircuitForm({ customers, circuit, isLoading, editing, onSubmit }) {
  return (
    <Formik
      initialValues={circuit ? circuit : newCircuit}
      validationSchema={Yup.object(validateForm)}
      onSubmit={onSubmit}
    >
      <Form>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <TextInput
              label='Circuits Name'
              name='name'
              fullWidth
              variant='outlined'
            />
          </Grid>
          <Grid item md={6} xs={12}>
            {/* todo: add search fliter for get customer */}
            {/* <SelectFliter
                            label="Select Customer"
                            name="customerId"
                            options={customers}
                        /> */}
            <SelectInput
              disabled={editing}
              label='Select Customer'
              name='customerName'
              fullWidth
              variant='outlined'
            >
              {customers.map((customer) => (
                <MenuItem key={customer._id} value={customer.name}>
                  {customer.name}
                </MenuItem>
              ))}
            </SelectInput>
          </Grid>
          <DependentField
            name='customerId'
            type='hidden'
            arr={customers}
            dependentFieldName='customerName'
            propertyName='_id'
            searchOn='name'
          />

          <Grid item md={6} xs={12}>
            <TextInput
              label='Circuits Capacity'
              name='capacity'
              fullWidth
              variant='outlined'
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextInput
              label='MIU'
              name='miu'
              fullWidth
              variant='outlined'
              type='number'
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <InputWithAdorment
              label='Cost'
              name='cost'
              type='number'
              adornment='$'
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

export default CircuitForm;
