import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const URL ='http://localhost:3500/logs';

const initialState = {
  logs:[],
  state: 'idle', // idle | loading | succeeded | failed
  error: null,
};

export const fetchLogs = createAsyncThunk(
  'logs/fetchLogs',
  async () => {
    const response = await axios.get(URL);
    return response.data;
  }
);

const logsSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchLogs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLogs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.logs = action.payload;
        state.state = 'idle';
      })
      .addCase(fetchLogs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectAllLogs = (state) => state.logs.logs;
export const getLogsStatus = (state) => state.logs.status;
export const getLogsError = (state) => state.logs.error;

export default logsSlice.reducer;
