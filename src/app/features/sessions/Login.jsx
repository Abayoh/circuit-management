import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, getLoginState, setStatus, resetError, getErrorState } from './session-slice';
import { useNavigate, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
import useRequestStatus from '../../hooks/use-request-status';

import { Formik, Form } from 'formik';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import TextInput from '../../components/form-inputs/TextInput';
import SubmitButton from '../../components/form-inputs/SubmitButton';

const validateForm = {
  email: Yup.string().email('Invalid email format').required('Required'),
  password: Yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(
      /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      'Must Contain 8 Characters, One Lowercase, One Number and One Special Case Character'
    ),
};

const initialValues = {
  email: '',
  password: '',
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const from = useLocation()?.state?.from?.pathname || '/';
  const loginStatus = useSelector(getLoginState);
  const [errorMessage, setErrorMessage] = useState('');
  const error = useSelector(getErrorState)

  const onLoginError = () => {
    setErrorMessage(error?.message);
    resetError();
  };
  
  const onLoginSuccess = () => navigate(from, { replace: true });

  const isLoading = useRequestStatus(
    loginStatus,
    setStatus,
    onLoginSuccess,
    onLoginError
  );

  const handleSubmit = (values, { resetForm }) => {
    dispatch(login(values));
    resetForm();
  };

  const resetErrorMessage = ()=> {if(errorMessage)setErrorMessage('');}

  return (
    <Grid container direction='row' sx={{ height: '100vh', width: '100vw' }}>
      <Grid
        item
        xs={6}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ width: '400px' }}>
          <Box sx={{ display: 'flex', mb: 8, alignItems: 'center' }}>
            <img src='./assets/images/ccllogo.png' alt='logo' />
            <Typography variant='h5' sx={{ ml: 1 }}>
              Cable Consortium of Liberia
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography color='' variant='h4' sx={{ mb: 1 }}>
              Log In
            </Typography>
            <Typography variant='body1'>
              Please enter your details to continue
            </Typography>
          </Box>
          {errorMessage &&<Box
            sx={{
              bgcolor: 'error.light',
              width: '100%',
              borderRadius: '5px',
              py: 1,
              pl:2,
              mb:2
            }}
          >
            <Typography variant='body' color='white'>
              {errorMessage}
            </Typography>
          </Box>}
          <Formik
            initialValues={initialValues}
            validationSchema={Yup.object(validateForm)}
            onSubmit={handleSubmit}
          >
            <Form>
              <TextInput
                label='Email'
                name='email'
                fullWidth
                variant='outlined'
                type='email'
                sx={{ mb: 4 }}
                onFocus={resetErrorMessage}
              />
              <TextInput
                label='Password'
                name='password'
                type='password'
                fullWidth
                variant='outlined'
                sx={{ mb: 4 }}
                onFocus={resetErrorMessage}
              />
              <SubmitButton isLoading={isLoading} variant='contained' fullWidth>
                Sign In
              </SubmitButton>
            </Form>
          </Formik>
        </Box>
      </Grid>
      <Grid
        item
        xs={6}
        sx={{
          justifyContent: 'center',
          backgroundColor: '#010206',
          display: 'grid',
        }}
      >
        <Box sx={{ placeSelf: 'end' }}>
          <Typography
            variant='h3'
            color='white'
            sx={{
              fontWeight: 'bold',
              letterSpacing: '8px',
              width: '100%',
              textAlign: 'center',
            }}
          >
            Welcome Back
          </Typography>
          <Typography
            variant='h6'
            color='white'
            sx={{ width: '100%', textAlign: 'center' }}
          >
            Capacity Manager App
          </Typography>
        </Box>
        <Box>
          <img src='./assets/images/fiber4.webp' alt='fiber' />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
