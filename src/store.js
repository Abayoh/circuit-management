import { configureStore } from '@reduxjs/toolkit';
import circuitReducer from './app/features/circuits/circuit-slice';
import customersReducer from './app/features/customers/customers-slice';
import logsReducer from './app/features/logs/logs-slice';
import paymentsReducer from './app/features/payments/payments-slice';
import usersReducer from './app/features/users/users-slice';

export const store = configureStore({
  reducer: {
    circuits: circuitReducer,
    customers: customersReducer,
    logs: logsReducer,
    payments: paymentsReducer,
    users: usersReducer,
  },
});
