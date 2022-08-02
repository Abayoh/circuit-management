import React from 'react'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

import { Formik, Form, useFormik } from 'formik';
import * as Yup from 'yup';
// from inputs
import TextInput from '../../../components/form-inputs/TextInput.jsx';
import SelectInput from '../../../components/form-inputs/SelectInput';

import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { addCustomers } from '../services/customers-slice'
import { useSnackbar } from 'notistack'

function AddCustomerForm() {

    const dispatch = useDispatch();
    const {status , message} = useSelector((state) => state.customers);
    const { enqueueSnackbar } = useSnackbar()
   
    const formValue = {
        customername: '',
        type: '',
        contact: '',
        address1: '',
        street: '',
        city: '',
        county: ''
    }

    const validateForm = {
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
    }

    const handleSubmit = (values, action) => {
        const customerid = uuidv4()
        // customer data collected from the form
        const customer = {
            id: customerid,
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
        enqueueSnackbar(message, 
            {
            variant: 'success',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'right'
            },
            autoHideDuration: 3000
        })
        action.resetForm()
    }

    return (
        <Formik
            initialValues={formValue}
            validationSchema={Yup.object(validateForm)}
            onSubmit={handleSubmit}
        >
            <Form>
                <Grid container spacing={3} >
                    <Grid item md={6} xs={12} >
                        <TextInput
                            fullWidth
                            label="Customer Name"
                            name="customername"
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <SelectInput fullWidth
                            label="Customer type"
                            name="type" select
                            variant="outlined"
                        >
                            <MenuItem value='regular'>
                                Regular
                            </MenuItem>
                            <MenuItem value='stock holder'>
                                Stock Holder
                            </MenuItem>
                        </SelectInput>
                    </Grid>

                    <Grid item md={3} xs={12} >
                        <TextInput fullWidth
                            label="Contact"
                            name="contact"
                            variant="outlined"
                            type="number"
                        />
                    </Grid>
                    <Grid item md={3} xs={12} >
                        <TextInput fullWidth
                            label="Address"
                            name="address1"
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item md={6} xs={12} >
                        <TextInput fullWidth
                            label="street"
                            name="street"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item md={6} xs={12} >
                        <TextInput fullWidth
                            label="City"
                            name="city"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item md={6} xs={12} >
                        <TextInput fullWidth
                            label="County"
                            name="county"
                            variant="outlined"
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
            </Form>
        </Formik>
    )
}

export default AddCustomerForm