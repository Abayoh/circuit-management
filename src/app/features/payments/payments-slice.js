import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import { axiosPrivate } from '../../services/axios-instance';

const URL = '/payments';

const initialState = {
  payments: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

export const fetchPayments = createAsyncThunk(
  'payments/fetchPayments',
  async () => {
    const response = await axiosPrivate.get(URL);
    return response.data;
  }
);
export const addPayments = createAsyncThunk(
  'payments/savePayments',
  async (data) => {
    const response = await axiosPrivate.post(URL, data);
    return response.data;
  }
);

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.payments = action.payload;
        state.state = 'idle';
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAllPayments = (state) => state.payments.payments;
export const getPaymentsStatus = (state) => state.payments.status;
export const getPaymentsError = (state) => state.payments.error;
export const selectPaymentsByCustomerId = createSelector(
  [selectAllPayments, (state, customerId) => customerId],
  (payments, customerId) =>
    payments.filter((payment) => payment.customerId === customerId)
);
export const selectCurrentPaymentsByCustomerId = createSelector(
  [selectAllPayments, (state, customerId) => customerId],
  (payments, customerId) => {
    return payments.filter(
      (payment) => payment.customerId === customerId && payment.current
    );
  }
);

export default paymentsSlice.reducer;
