import { configureStore } from '@reduxjs/toolkit';
import circuitReducer from './app/features/circuits/services/circuit-slice';
import customersReducer from './app/features/customers/services/customers-slice';
import logsReducer from './app/features/logs/logs-slice';
import paymentsReducer from './app/features/payments/payments-slice';
import usersReducer from './app/features/users/users-slice';
import sessionReducer from './app/features/sessions/session-slice'

export const store = configureStore({
  reducer: {
    circuits: circuitReducer,
    customers: customersReducer,
    logs: logsReducer,
    payments: paymentsReducer,
    users: usersReducer,
    session: sessionReducer
  },
});
