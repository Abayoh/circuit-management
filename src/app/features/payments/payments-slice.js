import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import { requestStates } from '../../models/request-state';
import { axiosPrivate, configRequest } from '../../services/axios-instance';

import { setAccessToken } from '../sessions/session-slice';

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
  async (data, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const token = getState().session.accessToken;

    const { reqInterceptor, resInterceptor } = configRequest(
      token,
      (newToken) => {
        dispatch(setAccessToken(newToken));
      }
    );

    const response = await axiosPrivate.post(URL, data);

    axiosPrivate.interceptors.request.eject(reqInterceptor);
    axiosPrivate.interceptors.response.eject(resInterceptor);

    return response.data;
  }
);

const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    setStatus(state, { payload }) {
      state.status = payload;
    },
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.status = requestStates.loading;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.status = requestStates.loaded;
        state.payments = action.payload;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.status = requestStates.failed;
        state.error = action.error;
      })
      .addCase(addPayments.pending, (state) => {
        state.status = requestStates.loading;
      })
      .addCase(addPayments.fulfilled, (state, action) => {
        state.status = requestStates.succeeded;
        const { newPayments } = action.payload;
        
        state.payments = state.payments.reduce((nps, p) => {
          
          //if it is not a current payment skip it
          if (!p.current) return [...nps, p];
          //check if the current payment is in the newPayment list
          const newPayment = newPayments.find(
            (np) => np.circuit.name === p.circuit.name
          );
          //if it is not there skip it
          if (!newPayment) return [...nps, p];

          //edit the current payment
          return [...nps,  { ...p, current: false }];
        }, [...newPayments]);
      })
      .addCase(addPayments.rejected, (state, action) => {
        console.log(action.error.message);
        state.status = 'failed';
        state.error = action.error;
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
    return payments.filter((payment) => {
      return payment.customerId === customerId && payment.current;
    });
  }
);

export const { resetError, setStatus } = paymentsSlice.actions;

export default paymentsSlice.reducer;
