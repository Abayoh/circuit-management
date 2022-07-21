import dashboardRoutes from '../../features/dashboard/dashboard-routes';
import customersRoutes from '../../features/customers/customer-routes';
import logsRoutes from '../../features/logs/logs-routes';
import paymentsRoutes from '../../features/payments/payments-routes';
import usersRoutes from '../../features/users/users-routes';
import circuitsRoutes from '../../features/circuits/circuits-routes';

const navLinks = [
  ...dashboardRoutes,
  ...customersRoutes,
  ...circuitsRoutes,
  ...paymentsRoutes,
  ...usersRoutes,
  ...logsRoutes,
];

export default navLinks;
