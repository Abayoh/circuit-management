import React from 'react';
import CustomersList from './CustomerLists';
import AddCustomerPayments from './AddCustomerPayments';
import AddEditCustomer from './AddEditCustomer';

const Customers = React.lazy(() => import('.'));

const customersRoutes = [
  {
    path: 'customers',
    element: <Customers />,
    name: 'Customers',
    icon: 'hub',
    children: [
      {
        index: true,
        element: <CustomersList />,
        name: 'Customers',
      },
      {
        path: 'add',
        element: <AddEditCustomer />,
        name: 'Add Customer',
      },
      {
        path: 'edit/:id',
        element: <AddEditCustomer />,
        name: 'Edit Customer',
      },
      {
        path: ':id',
        element: <AddCustomerPayments />,
        name: 'Hey',
      },
    ],
  },
];

export default customersRoutes;
