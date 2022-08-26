import React from 'react';
import { Navigate } from 'react-router-dom';
import customersRoutes from './customers/customer-routes';
import dashboardRoutes from './dashboard/dashboard-routes';
import logsRoutes from './logs/logs-routes';
import usersRoutes from './users/users-routes';
import paymentsRoutes from './payments/payments-routes';
import circuitsRoutes from './circuits/circuits-routes';
import Login from './sessions/Login';
import Layout from '../layouts/Layout'

const errorRoute = [
  {
    component: (props) => <Navigate to='/404' />,
    action: '*',
  },
];

const routes = [
  {
    path: '/',
    element:<Layout />,
    children: [
      ...dashboardRoutes,
      ...customersRoutes,
      ...circuitsRoutes,
      ...paymentsRoutes,
      ...logsRoutes,
      ...usersRoutes,
      ...errorRoute,
    ],
  },
  {
    path:'/login',
    element:<Login />,
    action: '*'
  }
];

export default routes;
