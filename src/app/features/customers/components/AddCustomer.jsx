import { useState } from 'react';
import PageToolsbar from '../../../components/PageToolsbar';
import Box from '@mui/material/Box';
import AddCustomerForm from './AddCustomerForm';

function AddCustomer() {
  
  return (
    <>
      <PageToolsbar pageTitle="Add customers" linkName="Customers" linkPath="/customers" />
      <Box sx={{ mt: 4 }} >
        <AddCustomerForm />
      </Box>
    </>
  )
}

export default AddCustomer