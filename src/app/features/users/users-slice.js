import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { requestStates } from '../../models/request-state';
import { setAccessToken } from '../sessions/session-slice';
import { configRequest, axiosPrivate } from '../../services/axios-instance';

const URL = '/users';

const initialState = {
  users: [],
  state: 'idle', // idle | loading | succeeded | failed
  error: null,
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, apiThunk) => {
    const { getState, dispatch } = apiThunk;
    const token = getState().session.accessToken;
    debugger;
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
export const addUser = createAsyncThunk(
  'users/addUser',
  async (user, apiThunk) => {
    const { getState, dispatch } = apiThunk;
    const token = getState().session.accessToken;
    debugger;
    const { reqInterceptor, resInterceptor } = configRequest(
      token,
      (newToken) => {
        dispatch(setAccessToken(newToken));
      }
    );
    const response = await axiosPrivate.post(URL, user);

    axiosPrivate.interceptors.request.eject(reqInterceptor);
    axiosPrivate.interceptors.response.eject(resInterceptor);

    return response.data;
  }
);
export const editUser = createAsyncThunk(
  'users/editUser',
  async (data, apiThunk) => {
    const { getState, dispatch } = apiThunk;
    const token = getState().session.accessToken;
    
    const { reqInterceptor, resInterceptor } = configRequest(
      token,
      (newToken) => {
        dispatch(setAccessToken(newToken));
      }
    );
    const response = await axiosPrivate.patch(`${URL}/${data.id}`, data.user);

    axiosPrivate.interceptors.request.eject(reqInterceptor);
    axiosPrivate.interceptors.response.eject(resInterceptor);

    return response.data;
  }
);

const usersSlice = createSlice({
  name: 'users',
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
      .addCase(fetchUsers.pending, (state) => {
        state.status = requestStates.loading;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = requestStates.loaded;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = requestStates.failed;
        state.error = action.error.message;
      });
  },
});

export const selectAllUsers = (state) => state.users.users;
export const getUsersStatus = (state) => state.users.status;
export const getUsersError = (state) => state.users.error;
export const getUserById = (id) => (state) =>
  state.circuits.circuits.find((u) => u._id === id);

export const { setStatus, resetError } = usersSlice.actions;

export default usersSlice.reducer;
