import React from 'react';

const Login = React.lazy(() => import('./Login'));

const sessionRoutes = [
  {
    path: 'login',
    element: <Login />,
    name: 'Login',
    icon: 'settings',
  },
];

export default sessionRoutes;
