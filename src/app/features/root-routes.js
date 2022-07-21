import React from 'react';
import { Navigate } from 'react-router-dom';
import sessionRoutes from './sessions/session-routes';
import customersRoutes from './customers/customer-routes';
import dashboardRoutes from './dashboard/dashboard-routes';
import logsRoutes from './logs/logs-routes';
import usersRoutes from './users/users-routes';
import paymentsRoutes from './payments/payments-routes';
import circuitsRoutes from './circuits/circuits-routes';

const errorRoute = [
  {
    component: (props) => <Navigate to='/404' />,
    action: '*',
  },
];

const routes = [
  {
    path: '/',
    children: [
      ...dashboardRoutes,
      ...customersRoutes,
      ...circuitsRoutes,
      ...paymentsRoutes,
      ...logsRoutes,
      ...usersRoutes,
      ...sessionRoutes,
      ...errorRoute,
    ],
  },
];

export default routes;
