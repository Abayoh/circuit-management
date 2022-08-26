import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { login, getLoginState, setStatus, resetError } from './session-slice';
import { useNavigate, useLocation } from 'react-router-dom';
import { requestStates } from '../../models/request-state';

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Loading from '../../components/Loading';

const Login = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const from = useLocation()?.state?.from?.pathname || '/';
  const loginStatus = useSelector((state) => state.session.status);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {
      dispatch(login(values));
    },
  });

  useEffect(() => {
    if (loginStatus === requestStates.failed) {
      setLoading(false);
    } else if (loginStatus === requestStates.loading) {
      setLoading(true);
    } else if (loginStatus === requestStates.succeeded) {
      dispatch(setStatus(requestStates.idle));
      setLoading(false);
      navigate(from, {replace: true});
    }
  }, [loginStatus, navigate, dispatch]);
  return (
    <Box>
      {loading && <Loading />}
      <form onSubmit={formik.handleSubmit}>
        <TextField
          id='outlined-name'
          label='Email'
          name='email'
          type='email'
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        <TextField
          type='password'
          name='password'
          id='outlined-uncontrolled'
          label='Password'
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <Button type='submit'>Submit</Button>
      </form>
    </Box>
  );
};

export default Login;
