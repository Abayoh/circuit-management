
import RouteGuide from './app/auth/RouteGuide';
import { CssBaseline, createTheme, ThemeProvider } from '@mui/material';
import Layout from './app/layouts/Layout';

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
      <ThemeProvider theme={theme}>
        <Layout />
      </ThemeProvider>
      <CssBaseline />
    </RouteGuide>
  );
}

export default App;
