import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { requestStates } from '../../models/request-state';
import { setAccessToken } from '../sessions/session-slice';
import { configRequest, axiosPrivate } from '../../services/axios-instance';

const URL = '/users';

const initialState = {
  users: [],
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
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
export const addUser = createAsyncThunk(
  'users/addUser',
  async (user, apiThunk) => {
    const { getState, dispatch } = apiThunk;
    const token = getState().session.accessToken;
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

export const resetPassword = createAsyncThunk(
  'users/resetPassword',
  async (data, apiThunk) => {
    const { getState, dispatch } = apiThunk;
    const token = getState().session.accessToken;

    const { reqInterceptor, resInterceptor } = configRequest(
      token,
      (newToken) => {
        dispatch(setAccessToken(newToken));
      }
    );
    const response = await axiosPrivate.put(
      `${URL}/${data.id}/reset-password`,
      data.user
    );

    axiosPrivate.interceptors.request.eject(reqInterceptor);
    axiosPrivate.interceptors.response.eject(resInterceptor);

    return response.data;
  }
);

export const changeRoles = createAsyncThunk(
  'users/changeRoles',
  async (data, apiThunk) => {
    const { getState, dispatch } = apiThunk;
    const token = getState().session.accessToken;

    const { reqInterceptor, resInterceptor } = configRequest(
      token,
      (newToken) => {
        dispatch(setAccessToken(newToken));
      }
    );
    const response = await axiosPrivate.put(
      `${URL}/${data.id}/roles`,
      data.user
    );

    axiosPrivate.interceptors.request.eject(reqInterceptor);
    axiosPrivate.interceptors.response.eject(resInterceptor);

    return response.data;
  }
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id, apiThunk) => {
    const { getState, dispatch } = apiThunk;
    const token = getState().session.accessToken;

    const { reqInterceptor, resInterceptor } = configRequest(
      token,
      (newToken) => {
        dispatch(setAccessToken(newToken));
      }
    );
    const response = await axiosPrivate.delete(`${URL}/${id}`);

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
        state.error = action.error;
      })
      .addCase(addUser.pending, (state) => {
        state.status = requestStates.loading;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.status = requestStates.succeeded;
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = requestStates.failed;
        state.error = action.error;
      })
      .addCase(editUser.pending, (state) => {
        state.status = requestStates.loading;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.status = requestStates.succeeded;
        const index = state.users.findIndex(
          (user) => user._id === action.payload._id
        );
        state.users[index] = {
          ...state.users[index],
          fullName: action.payload.fullName,
          phoneNumber: action.payload.phoneNumber,
        };
      })
      .addCase(editUser.rejected, (state, action) => {
        state.status = requestStates.failed;
        state.error = action.error;
      })
      .addCase(resetPassword.pending, (state) => {
        state.status = requestStates.loading;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.status = requestStates.succeeded;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.status = requestStates.failed;
        state.error = action.error;
      })
      .addCase(changeRoles.pending, (state) => {
        state.status = requestStates.loading;
      })
      .addCase(changeRoles.fulfilled, (state, action) => {
        
        state.status = requestStates.succeeded;
        const index = state.users.findIndex(
          (user) => user._id === action.payload._id
        );
        state.users[index] = {
          ...state.users[index],
          roles: action.payload.roles,
        };
      })
      .addCase(changeRoles.rejected, (state, action) => {
        state.status = requestStates.failed;
        state.error = action.error;
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = requestStates.loading;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = requestStates.succeeded;
        const index = state.users.findIndex(
          (user) => user._id === action.payload._id
        );
        state.users.splice(index, 1);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = requestStates.failed;
        state.error = action.error;
      });
  },
});

export const selectAllUsers = (state) => {
  return state.users.users;
};
export const getUsersStatus = (state) => state.users.status;
export const getUsersError = (state) => state.users.error;
export const getUserById = (id) => (state) =>
  state.circuits.circuits.find((u) => u._id === id);

export const { setStatus, resetError } = usersSlice.actions;

export default usersSlice.reducer;
