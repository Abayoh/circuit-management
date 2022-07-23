import React from 'react'
import PageToolsbar from '../../../components/PageToolsbar';
import Spacer from '../../../components/Spacer'
import AddCircuitsForm from './AddCircuitsForm';
import { Box } from '@mui/material';

function AddCircuits() {
    return (
        <>
            <PageToolsbar pageTitle="Add Circuits" linkName="Circuits" linkPath="/circuits" />
            <Box sx={{ mt: 4 }}>
                <AddCircuitsForm />
            </Box>
        </>
    )
}

export default AddCircuits