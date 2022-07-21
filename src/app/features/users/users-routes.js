import React from 'react';

const Users = React.lazy(() => import('./Users'));

const usersRoutes = [
  {
    path: 'users',
    element: <Users />,
    name: 'Users',
    icon: 'people',
  },
];

export default usersRoutes;
