import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'http://localhost:3500/circuits'
const initialState = {
  circuits: [],
  status: 'idle', // idle | loading | success | error
  error: null,
  message: ''
};

export const fetchCircuits = createAsyncThunk(
  'circuits/fetchCircuits',
  async () => {
    const response = await axios.get(URL);
    return response.data;
  }
);

export const addCircuits = createAsyncThunk('circuits/addcircuuts',
  async (circuit) => {
    const response = await axios.post(URL, circuit);
    return response.data
  }
)

const circuitsSlice = createSlice({
  name: 'circuits',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCircuits.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchCircuits.fulfilled, (state, action) => {
        state.status = 'success';
        state.circuits = action.payload;
      })
      .addCase(fetchCircuits.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message;
      })
      .addCase(addCircuits.pending, (state) => {
        state.status = "padding"
      })
      .addCase(addCircuits.fulfilled, (state, action) => {
        state.status = "success";
        state.circuits.push(action.payload);
        state.message = "Circuits successfully saved";
      })
      .addCase(addCircuits.rejected ,(state , action) => { 
         state.status = 'error';
         state.message = action.error.message
         state.error = action.error.message
      })
  },
});

export const selectAllCircuits = (state) => state.circuits.circuits;
export const getCircuitsStatus = (state) => state.circuits.status;
export const getCircuitsError = (state) => state.circuits.error;

export const selectCircuitByCustomerId = createSelector(
  [selectAllCircuits, (state, customerId) => customerId],
  (circuits, customerId) => circuits.filter(
    (circuit) => circuit.customerId === customerId
  )
)


export default circuitsSlice.reducer;
