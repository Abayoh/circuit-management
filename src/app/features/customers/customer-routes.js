import React from 'react';
import CustomersList from './components/CustomerLists';
import CustomerDetails from './components/CustomerDetails';
import AddCustomer from './components/AddCustomer';

const Customers = React.lazy(() => import('./Customers'));

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
        path: 'add-customer',
        element: <AddCustomer />,
        name: 'Add Customer',
      },
      {
        path: ':id',
        element: <CustomerDetails />,
        name: 'Hey',
      },
    ],
  },
];

export default customersRoutes;
