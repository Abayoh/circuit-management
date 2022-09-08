import React from 'react';
import Grid from '@mui/material/Grid';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import MultipleSelect from '../../../components/form-inputs/SelectMultiple.jsx';

import SubmitButton from '../../../components/form-inputs/SubmitButton.jsx';

const validateForm = {
  roles: Yup.array().of(Yup.string('atleast on role is required')).min(1),
};
const roles = [
  { name: 'Admin', value: 'admin' },
  { name: 'Capacity Manager', value: 'manager' },
  { name: 'User', value: 'user' },
  { name: 'Finance', value: 'finance' },
];

function UserForm({ isLoading, onSubmit, oldRoles }) {
  return (
    <Formik
      initialValues={oldRoles ?? []}
      validationSchema={Yup.object(validateForm)}
      onSubmit={onSubmit}
    >
      <Form>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <MultipleSelect
              label='Select Roles'
              options={roles}
              name='roles'
              fullWidth
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
