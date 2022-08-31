import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import { setAccessToken } from '../../sessions/session-slice';
import { configRequest, axiosPrivate } from '../../../services/axios-instance';
import { requestStates } from '../../../models/request-state';

const URL = '/circuits';
const initialState = {
  circuits: [],
  status: 'idle', // idle | loading | success | error
  error: null,
};

export const fetchCircuits = createAsyncThunk(
  'circuits/fetchCircuits',
  async (_, apiThunk) => {
    const { getState, dispatch } = apiThunk;
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

export const addCircuit = createAsyncThunk(
  'circuits/addCircuit',
  async (circuit, apiThunk) => {
    const { getState, dispatch } = apiThunk;
    const token = getState().session.accessToken;

    const { reqInterceptor, resInterceptor } = configRequest(
      token,
      (newToken) => {
        dispatch(setAccessToken(newToken));
      }
    );
    const response = await axiosPrivate.post(URL, circuit);

    axiosPrivate.interceptors.request.eject(reqInterceptor);
    axiosPrivate.interceptors.response.eject(resInterceptor);

    return response.data;
  }
);

export const editCircuit = createAsyncThunk(
  'circuits/editCircuit',
  async ({ id, circuit }, apiThunk) => {
    const { getState, dispatch } = apiThunk;
    const token = getState().session.accessToken;

    const { reqInterceptor, resInterceptor } = configRequest(
      token,
      (newToken) => {
        dispatch(setAccessToken(newToken));
      }
    );
    const response = await axiosPrivate.put(`${URL}/${id}`, circuit);

    axiosPrivate.interceptors.request.eject(reqInterceptor);
    axiosPrivate.interceptors.response.eject(resInterceptor);

    return response.data;
  }
);

const circuitsSlice = createSlice({
  name: 'circuits',
  initialState,
  reducers: {
    setStatus(state, action) {
      state.status = action.payload;
    },
    resetError(state) {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCircuits.pending, (state) => {
        state.status = requestStates.loading;
      })
      .addCase(fetchCircuits.fulfilled, (state, action) => {
        state.status = requestStates.succeeded;
        state.circuits = action.payload;
      })
      .addCase(fetchCircuits.rejected, (state, action) => {
        state.status = requestStates.failed;
        state.error = action.error;
      })
      .addCase(addCircuit.pending, (state) => {
        state.status = requestStates.loading;
      })
      .addCase(addCircuit.fulfilled, (state, action) => {
        state.status = requestStates.succeeded;
        state.circuits.push(action.payload);
      })
      .addCase(addCircuit.rejected, (state, action) => {
        state.status = requestStates.failed;
        state.error = action.error;
      })
      .addCase(editCircuit.pending, (state) => {
        state.status = requestStates.loading;
      })
      .addCase(editCircuit.fulfilled, (state, action) => {
        state.status = requestStates.succeeded;
        const cirIndex = state.circuits.findIndex(
          (c) => c._id === action.payload._id
        );
        state.circuits[cirIndex] = action.payload;
      })
      .addCase(editCircuit.rejected, (state, action) => {
        state.status = requestStates.failed;
        state.error = action.error;
      });
  },
});

export const selectAllCircuits = (state) => state.circuits.circuits;
export const getCircuitsStatus = (state) => state.circuits.status;
export const getCircuitsError = (state) => state.circuits.error;
export const getCircuitById = (id) => (state) =>
  state.circuits.circuits.find((c) => c._id === id);
export const selectCircuitByCustomerId = createSelector(
  [selectAllCircuits, (state, customerId) => customerId],
  (circuits, customerId) =>
    circuits.filter((circuit) => circuit.customerId === customerId)
);

export const { setStatus, resetError } = circuitsSlice.actions;

export default circuitsSlice.reducer;
