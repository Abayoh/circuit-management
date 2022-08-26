import React, { useEffect } from 'react';
import RouteGuide from './app/auth/RouteGuide';
import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import Layout from './app/layouts/Layout';
import { SnackbarProvider } from 'notistack';
import RenderRoutes from './app/features/RenderRoutes';
import routes from './app/features/root-routes';
import tokenService from './app/services/token-service';
import {
  getLoginUser,
  getUser,
  setUser,
} from './app/features/sessions/session-slice';
import { useSelector, useDispatch } from 'react-redux';

const theme = createTheme({
  palette: {
    common: {
      gray: '#F9F9FC',
      pink: '#ff98b5',
    },
  },
});

const useUnload = fn => {
  const cb = React.useRef(fn);

  React.useEffect(() => {
    const onUnload = cb.current;
    window.addEventListener('beforeunload', onUnload);
    return () => {
      window.removeEventListener('beforeunload', onUnload);
    };
  }, [cb]);
};

function App() {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
   console.log(user);
  useUnload(e => {
    e.preventDefault();
    console.log(user);
     if(user){
      tokenService.setUserInfoOnReload(user);
     }
    
  });

  return (
    <RouteGuide>
      <SnackbarProvider maxSnack={3}>
        <ThemeProvider theme={theme}>
          <RenderRoutes routes={routes} />
        </ThemeProvider>
      </SnackbarProvider>
      <CssBaseline />
    </RouteGuide>
  );
}

export default App;
