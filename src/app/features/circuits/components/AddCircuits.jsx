import React from 'react';
import PageToolsbar from '../../../components/PageToolsbar';
import Spacer from '../../../components/Spacer'
import AddCircuitsForm from './AddCircuitsForm';
import { Box } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectAllCustomers } from '../../customers/services/customers-slice';

function AddCircuits() {
    const allCustomers = useSelector(selectAllCustomers);
    return (
        <>
            <PageToolsbar pageTitle="Add Circuits" linkName="Circuits" linkPath="/circuits" />
            <Box sx={{ mt: 4 }}>
                <AddCircuitsForm customers={allCustomers}/>
            </Box>
        </>
    )
}

export default AddCircuits