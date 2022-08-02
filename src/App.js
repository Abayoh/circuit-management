
import RouteGuide from './app/auth/RouteGuide';
import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import Layout from './app/layouts/Layout';
import { SnackbarProvider } from 'notistack';

const theme = createTheme({
  palette: {
    common: {
      gray: '#F9F9FC',
      pink: '#ff98b5',
    },
  },
});

function App() {
  return (
    <RouteGuide>
      <SnackbarProvider maxSnack={3}>
        <ThemeProvider theme={theme}>
          <Layout />
        </ThemeProvider>
      </SnackbarProvider>
      <CssBaseline />
    </RouteGuide>
  );
}

export default App;
