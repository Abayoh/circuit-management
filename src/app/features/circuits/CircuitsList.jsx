import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllCircuits } from './services/circuit-slice';
import PageToolsbar from '../../components/PageToolsbar';
import EnhancedTable from '../../components/data-table/EnhancedTable';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Circuit Name',
  },
  {
    id: 'customerName',
    numeric: false,
    disablePadding: false,
    label: 'Customer Name',
  },
  {
    id: 'capacity',
    numeric: false,
    disablePadding: false,
    label: 'Capacity',
  },
  {
    id: 'cost',
    numeric: true,
    disablePadding: false,
    label: 'Cost',
  },
  {
    id: 'miu',
    numeric: true,
    disablePadding: false,
    label: 'MIU',
  },
];
function CircuitsList() {
  const circuits = useSelector(selectAllCircuits);

  const navigate = useNavigate();

  const actionButtons = (row) => {
    return (
      <Box sx={{ display: 'flex', '&>button': { ml: 2 } }}>
        <Button
          variant='outlined'
          color='success'
          onClick={() => handleEditCircuit(row._id)}
        >
          Edit
        </Button>
        <Button variant='outlined' color='error'>
          Delete
        </Button>
      </Box>
    );
  };

  const handleEditCircuit = (id) => {
    navigate(`edit/${id}`);
  };

  return (
    <>
      <PageToolsbar
        pageTitle='Circuits'
        linkName='Add Circuits'
        linkPath='add'
      />
      <EnhancedTable
        idFieldName='_id'
        headCells={headCells}
        tableLabel='Circuits Info'
        rows={circuits}
        enableActionCell
        actionButtons={actionButtons}
        selectDisabled
      />
    </>
  );
}

export default CircuitsList;
