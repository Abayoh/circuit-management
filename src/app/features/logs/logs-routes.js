import React from 'react';

const Logs = React.lazy(() => import('./Logs'));

const logsRoutes = [
  {
    path: 'logs',
    element: <Logs />,
    name: 'Logs',
    icon: 'article',
  },
];

export default logsRoutes;
