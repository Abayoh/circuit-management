import React from 'react';
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save'

import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import TextInput from '../../../components/form-inputs/TextInput.jsx';
import SelectInput from '../../../components/form-inputs/SelectInput';
import InputWithAdorment from '../../../components/form-inputs/InputWithAdorment';
import SelectFliter from '../../../components/form-inputs/SelectFliter';
import { useDispatch, useSelector } from 'react-redux';
import { addCircuits } from '../services/circuit-slice';
import { v4 as uuidv4, validate } from 'uuid';
import { useSnackbar } from 'notistack';

function AddCircuitsForm({ customers }) {
    const dispatch = useDispatch();
    const { message, status } = useSelector((state) => state.circuits)
    const { enqueueSnackbar } = useSnackbar()

    const formValues = {
        name: "",
        customerId: "",
        capacity: "",
        cost: ""
    }

    const validateForm = {
        name: Yup.string()
            .required('Circuits name is required'),
        customerId: Yup.string()
            .required('please select a customer'),
        capacity: Yup.string()
            .required('Capacity is required'),
        cost: Yup.number()
            .required('Cost is required'),
    }

    const handleSubmit = (values, action) => {
        const id = uuidv4();
        const circuit = { id, ...values }
        dispatch(addCircuits(circuit))
        enqueueSnackbar(message,
            {
                variant: status,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                },
            }
        )
        action.resetForm()
    }

    return (
        <Formik
            initialValues={formValues}
            validationSchema={Yup.object(validateForm)}
            onSubmit={handleSubmit}
        >
            <Form>
                <Grid container spacing={3}>
                    <Grid item md={6} xs={12}>
                        <TextInput
                            label="Circuits Name"
                            name="name"
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
                            label="Select Customer"
                            name="customerId"
                            fullWidth
                            variant='outlined'>
                            {customers.map((customer) => (
                                <MenuItem key={customer.id} value={customer.id}>
                                    {customer.name}
                                </MenuItem>
                            ))}
                        </SelectInput>
                    </Grid>

                    <Grid item md={6} xs={12}>
                        <TextInput
                            label='Circuits Capacity'
                            name="capacity"
                            fullWidth
                            variant='outlined'
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <InputWithAdorment
                            label="Cost"
                            name="cost"
                            type="number"
                            adornment='$'
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
                        variant="contained">
                        Save details
                    </LoadingButton>
                </Box>
            </Form>
        </Formik>
    )
}

export default AddCircuitsForm