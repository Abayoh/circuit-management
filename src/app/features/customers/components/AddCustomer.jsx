import { useState } from 'react';
import PageToolsbar from '../../../components/PageToolsbar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomers, getCustomersStatus } from '../services/customers-slice'
import { useSnackbar } from 'notistack'

function AddCustomer() {
  const dispatch = useDispatch();
  const status = useSelector(getCustomersStatus);
  const customerUid = uuidv4()
  const { enqueueSnackbar } = useSnackbar()
  
  const customerForm = useFormik({
    initialValues: {
      customername: '',
      type: '',
      contact: '',
      address1: '',
      street: '',
      city: '',
      county: ''
    },
    validationSchema: Yup.object({
      customername: Yup.string()
        .required('Customer name is required'),
      type: Yup.string()
        .required("Please select customer type"),
      contact: Yup.string()
        .required('Customer contact is Required'),
      address1: Yup.string()
        .required('Customer address is Required'),
      street: Yup.string()
        .required('Street name is Required'),
      city: Yup.string()
        .required('City name is Required'),
      county: Yup.string()
        .required('Counry name is Required'),
    }),
    onSubmit: values => {
      const customer = {
        id: customerUid,
        name: values.customername,
        type: values.type,
        address: {
          address1: values.address1,
          street: values.street,
          city: values.city,
          county: values.county
        },
        contacts: values.contact
      }
      dispatch(addCustomers(customer));
      enqueueSnackbar('Custoners Save Successfully!', {
        variant: 'success', anchorOrigin: {
          vertical: 'top',
          horizontal: 'right'
        },
        autoHideDuration: 3000
      })
      customerForm.resetForm()
    },
  })

  return (
    <>
      <PageToolsbar pageTitle="Add customers" linkName="Customers" linkPath="/customers" />
      <Box sx={{ mt: 4 }} >
        <form noValidate onSubmit={customerForm.handleSubmit}>
          <Grid container spacing={3} >
            <Grid item md={6} xs={12} >
              <TextField
                fullWidth
                label="Customer Name"
                name="customername"
                {...customerForm.getFieldProps('customername')}
                variant="outlined"
                helperText={customerForm.touched.customername &&
                  customerForm.errors.customername ?
                  customerForm.errors.customername : null}
                error={customerForm.touched.customername &&
                  customerForm.errors.customername ? true : false}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField fullWidth
                label="Customer type"
                name="type" select
                variant="outlined"
                {...customerForm.getFieldProps('type')}
                helperText={customerForm.touched.type &&
                  customerForm.errors.type ?
                  customerForm.errors.type : null}
                error={customerForm.touched.type &&
                  customerForm.errors.type ? true : false}
              >
                <MenuItem value='regular'>
                  Regular
                </MenuItem>
                <MenuItem value='stock holder'>
                  Stock Holder
                </MenuItem>
              </TextField>
            </Grid>

            <Grid item md={3} xs={12} >
              <TextField fullWidth
                label="Contact"
                name="contact"
                variant="outlined"
                type="number"
                {...customerForm.getFieldProps('contact')}
                helperText={customerForm.touched.contact &&
                  customerForm.errors.contact ?
                  customerForm.errors.contact : null}
                error={customerForm.touched.contact &&
                  customerForm.errors.contact ? true : false}
              />
            </Grid>
            <Grid item md={3} xs={12} >
              <TextField fullWidth
                label="Address"
                name="address1"
                variant="outlined"
                {...customerForm.getFieldProps('address1')}
                helperText={customerForm.touched.address1 &&
                  customerForm.errors.address1 ?
                  customerForm.errors.address1 : null}
                error={customerForm.touched.address1 &&
                  customerForm.errors.address1 ? true : false}
              />
            </Grid>

            <Grid item md={6} xs={12} >
              <TextField fullWidth
                label="street"
                name="street"
                variant="outlined"
                {...customerForm.getFieldProps('street')}
                helperText={customerForm.touched.street &&
                  customerForm.errors.street ?
                  customerForm.errors.street : null}
                error={customerForm.touched.street &&
                  customerForm.errors.street ? true : false}
              />
            </Grid>
            <Grid item md={6} xs={12} >
              <TextField fullWidth
                label="City"
                name="city"
                required
                variant="outlined"
                {...customerForm.getFieldProps('city')}
                helperText={customerForm.touched.city &&
                  customerForm.errors.city ?
                  customerForm.errors.city : null}
                error={customerForm.touched.city &&
                  customerForm.errors.city ? true : false}
              />
            </Grid>
            <Grid item md={6} xs={12} >
              <TextField fullWidth
                label="County"
                name="county"
                required
                variant="outlined"
                {...customerForm.getFieldProps('county')}
                helperText={customerForm.touched.county &&
                  customerForm.errors.county ?
                  customerForm.errors.county : null}
                error={customerForm.touched.county &&
                  customerForm.errors.county ? true : false}
              />
            </Grid>
          </Grid>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }} >
            <LoadingButton
              loading={status === 'loading' ? true : false}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              type="submit"
              color="primary"
              variant="contained"
            >
              Save details
            </LoadingButton>
          </Box>
        </form>
      </Box>
    </>
  )
}

export default AddCustomer