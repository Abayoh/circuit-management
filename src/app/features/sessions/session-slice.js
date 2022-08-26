import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import axios from '../../services/axios-instance';
import tokenService from '../../services/token-service';
import jwtDecode from 'jwt-decode';

const LOGINURL = '/auth';
const LOGOUTURL = '/auth/logout';
const REFRESH_URL = '/auth/refresh-token';


const initialState = {
  user: null,
  accessToken: '',
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

const decodeToken =(token)=>{
  const {aud, name, roles} = jwtDecode(token);
  return {userId:aud, name, roles}
}

export const login = createAsyncThunk('login/requestLogin', async (data) => {
  const response = await axios.post(LOGINURL, data);
  return response.data;
});

export const logout = createAsyncThunk('logout/requestLogout', async (data) => {
  const response = await axios.delete(LOGOUTURL, { data });
  return response.data;
});

export const refreshAccessToken = createAsyncThunk(
  'logout/refreshAccessToken',
  async () => {
    console.log('ey');
    const response = await axios.get(REFRESH_URL);
    return response.data;
  }
);

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setStatus(state, { payload }) {
      state.status = payload;
    },
    resetError(state) {
      state.error = null;
    },
    setUser(state, { payload }) {
      state.user = payload;
    },
    setAccessToken(state, { payload }) {
      state.accessToken = payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        const { accessToken } = action.payload;
        state.status = 'succeeded';
        state.user = decodeToken(accessToken);
        state.accessToken = accessToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(logout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = null;
        state.accessToken =''
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(refreshAccessToken.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(refreshAccessToken.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = decodeToken(action.payload);
        state.accessToken = action.payload;
      })
      .addCase(refreshAccessToken.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      });
  },
});



export const getUser = (state) => state.session.user;
export const getLoginState = (state) => state.session.status;

export const { setStatus, resetError, setUser, setAccessToken } =
  sessionSlice.actions;

export default sessionSlice.reducer;
