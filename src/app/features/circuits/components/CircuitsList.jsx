import React from 'react';
import { useSelector } from 'react-redux';
import { selectAllCircuits } from '../services/circuit-slice'
import { selectAllCustomers } from '../../customers/services/customers-slice';
import PageToolsbar from '../../../components/PageToolsbar';
import EnhancedTable from '../../../components/data-table/EnhancedTable';

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
    }
];
function CircuitsList() {
    const circuits = useSelector(selectAllCircuits);
    const customers = useSelector(selectAllCustomers);

    //combine circuits data along with the customer data
    // is there a better way to impliment the code ?
    const circutsAndCustomers = circuits.map((circuits) => {
        let data = {};
        customers.forEach((customer) => {
            if (circuits.customerId === customer.id) {
                data = {
                    name: circuits.name,
                    customerName: customer.name,
                    customerid: circuits.customerId,
                    capacity: circuits.capacity,
                    cost: circuits.cost
                }
            }
        })
        return data
    })
    
    return (
        <>
            <PageToolsbar pageTitle="Circuits" linkName="Add Circuits" linkPath="add-circuits" />
            <EnhancedTable
                headCells={headCells}
                tableLabel='Circuits Info'
                rows={circutsAndCustomers} />
        </>
    )
}

export default CircuitsList