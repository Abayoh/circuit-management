import React from 'react';

const Payments = React.lazy(() => import('./Payments'));

const paymentsRoutes = [
  {
    path: 'payments',
    element: <Payments />,
    name: 'Payments',
    icon: 'payments',
  },
];

export default paymentsRoutes;
