import React from 'react';
import RouteGuide from './app/auth/RouteGuide';
import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import RenderRoutes from './app/features/RenderRoutes';
import routes from './app/features/root-routes';
import Notifier from './app/components/Notifier';

const theme = createTheme({
  palette: {
    primary:{
      main: '#010206',
    },
    common: {
      gray: '#F9F9FC',
      pink: '#ff98b5',
    },
  },
});

function App() {
  return (
    <RouteGuide>
      <ThemeProvider theme={theme}>
        <Notifier>
          <RenderRoutes routes={routes} />
        </Notifier>
      </ThemeProvider>
      <CssBaseline />
    </RouteGuide>
  );
}

export default App;
