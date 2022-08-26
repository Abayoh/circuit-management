import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import PersistLogin from './app/features/sessions/PersistLogin';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistLogin>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistLogin>
  </Provider>
);
