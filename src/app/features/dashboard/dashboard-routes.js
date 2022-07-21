import React from 'react';

const Dashboard = React.lazy(() => import('./Dashboard'));

const dashboardRoutes = [
  {
    index: true,
    element: <Dashboard />,
    name: 'Dashboard',
    icon: 'dashboard',
    navPath: '/',
  },
];

export default dashboardRoutes;
