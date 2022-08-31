import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setAccessToken } from '../../sessions/session-slice';
import { axiosPrivate, configRequest } from '../../../services/axios-instance';
import { requestStates } from '../../../models/request-state';

const URL = '/customers';

const initialState = {
  customers: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

export const fetchCustomers = createAsyncThunk(
  'customers/fetchCustomers',
  async (_, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const token = getState().session.accessToken;

    const { reqInterceptor, resInterceptor } = configRequest(
      token,
      (newToken) => {
        dispatch(setAccessToken(newToken));
      }
    );
    const response = await axiosPrivate.get(URL);

    axiosPrivate.interceptors.request.eject(reqInterceptor);
    axiosPrivate.interceptors.response.eject(resInterceptor);

    return response.data;
  }
);

export const addCustomer = createAsyncThunk(
  'customers/addCustomer',
  async (customers, thunkApi) => {
    const { getState, dispatch } = thunkApi;
    const token = getState().session.accessToken;

    const { reqInterceptor, resInterceptor } = configRequest(
      token,
      (newToken) => {
        dispatch(setAccessToken(newToken));
      }
    );

    const response = await axiosPrivate.post(URL, customers);

    axiosPrivate.interceptors.request.eject(reqInterceptor);
    axiosPrivate.interceptors.response.eject(resInterceptor);

    return response.data;
  }
);
export const editCustomer = createAsyncThunk(
  'customers/editCustomer',
  async ({id, customer}, thunkApi) => {
    const { getState, dispatch } = thunkApi;

    //get token for the request
    const token = getState().session.accessToken;

    //add Access on the request
    const { reqInterceptor, resInterceptor } = configRequest(
      token,
      (newToken) => {
        dispatch(setAccessToken(newToken));
      }
    );

    const response = await axiosPrivate.put(`${URL}/${id}`, customer);

    //remove the interceptors handlers
    axiosPrivate.interceptors.request.eject(reqInterceptor);
    axiosPrivate.interceptors.response.eject(resInterceptor);

    return response.data;
  }
);

const customersSlice = createSlice({
  name: 'customers',
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
      .addCase(fetchCustomers.pending, (state) => {
        state.status = requestStates.loading;
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = requestStates.succeeded;
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = requestStates.failed;
        state.error = action.error;
      })
      .addCase(addCustomer.pending, (state) => {
        state.status = requestStates.loading;
      })
      .addCase(addCustomer.fulfilled, (state, action) => {
        state.status = requestStates.succeeded;
        state.customers.push(action.payload);
      })
      .addCase(addCustomer.rejected, (state, action) => {
        state.status = requestStates.failed;
        state.error = action.error;
      })
      .addCase(editCustomer.pending, (state) => {
        state.status = requestStates.loading;
      })
      .addCase(editCustomer.fulfilled, (state, action) => {
       
        state.status = requestStates.succeeded;
        let index = state.customers.findIndex(c => c._id === action.payload._id);
        state.customers[index] = action.payload;
      })
      .addCase(editCustomer.rejected, (state, action) => {
        state.status = requestStates.failed;
        state.error = action.error;
      });
  },
});

export const selectAllCustomers = (state) => state.customers.customers;
export const getCustomersStatus = (state) => state.customers.status;
export const getCustomersError = (state) => state.customers.error;
export const getCustomerById = (id) => (state) => {
  return state.customers.customers.find((c) => c._id === id);
};

export const { resetError, setStatus } = customersSlice.actions;

export default customersSlice.reducer;
