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
import { useDispatch, useSelector } from 'react-redux';
import { addCircuits } from '../services/circuit-slice';
import { v4 as uuidv4 } from 'uuid';
import { useSnackbar } from 'notistack';

function AddCircuitsForm({ customers }) {
    const { enqueueSnackbar } = useSnackbar()
    const dispatch = useDispatch();
    const { message, error, status } = useSelector((state) => state.circuits)
    
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
            initialValues={{
                name: "",
                customerId: "",
                capacity: "",
                cost: ""
            }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .required('Circuits name is required'),
                customerId: Yup.string()
                    .required('please select a customer'),
                capacity: Yup.string()
                    .required('Capacity is required'),
                cost: Yup.number()
                    .required('Cost is required'),
            })
            }
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