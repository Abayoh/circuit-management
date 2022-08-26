import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {setAccessToken} from '../../sessions/session-slice' 
import {axiosPrivate, configRequest} from '../../../services/axios-instance';

const URL = '/customers';

const initialState = {
  customers: [],
  status: 'idle', // idle | loading | succeeded | failed
  message: '',
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

export const addCustomers = createAsyncThunk(
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

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCustomers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCustomers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customers = action.payload;
      })
      .addCase(fetchCustomers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCustomers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCustomers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.customers.push(action.payload);
        state.message = 'Customer added successfully';
      })
      .addCase(addCustomers.rejected, (state, action) => {
        state.status = 'faild';
        state.message = action.error.message;
        state.error = action.error.message;
      });
  },
});

export const selectAllCustomers = (state) => state.customers.customers;
export const getCustomersStatus = (state) => state.customers.status;
export const getCustomersError = (state) => state.customers.error;
export const getCustomerById = (id) => (state) => {
  return state.customers.customers.find((c) => c._id === id);
};

export default customersSlice.reducer;
