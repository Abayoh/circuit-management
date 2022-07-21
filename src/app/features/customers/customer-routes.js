import React from 'react';
import CustomersList from './CustomerLists';
import CustomerDetails from './CustomerDetails';

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
        path: ':id',
        element: <CustomerDetails />,
        name: 'Hey',
      },
    ],
  },
];

export default customersRoutes;
