import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'http://localhost:3500/payments';

const initialState = {
  payments: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

export const fetchPayments = createAsyncThunk(
  'payments/fetchPayments',
  async () => {
    const response = await axios.get(URL);
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

export default paymentsSlice.reducer;
