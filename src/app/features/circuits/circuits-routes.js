import React from 'react';

const Circuits = React.lazy(() => import('./Circuits'));

const circuitsRoutes = [
  {
    path: 'circuits',
    element: <Circuits />,
    name: 'Circuits',
    icon: 'cable',
  },
];

export default circuitsRoutes;
