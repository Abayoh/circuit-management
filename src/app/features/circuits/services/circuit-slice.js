import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  circuits: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

export const fetchCircuits = createAsyncThunk(
  'circuits/fetchCircuits',
  async () => {
    console.log('circuit Call');
    const response = await axios.get('http://localhost:3500/circuits');
    return response.data;
  }
);

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
        state.status = 'succeeded';
        state.circuits = action.payload;
      })
      .addCase(fetchCircuits.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAllCircuits = (state) => state.circuits.circuits;
export const getCircuitsStatus = (state) => state.circuits.status;
export const getCircuitsError = (state) => state.circuits.error;

export const selectCircuitByCustomerId = createSelector(
  [selectAllCircuits, (state, customerId)=>customerId],
  (circuits, customerId)=>circuits.filter(
    (circuit) => circuit.customerId === customerId
  )
)


export default circuitsSlice.reducer;
