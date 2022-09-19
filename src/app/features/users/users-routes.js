import React from 'react';

const Users = React.lazy(() => import('./'));
const UserList = React.lazy(() => import('./UserList'));
const AddEditUser = React.lazy(() => import('./AddEditUser'));

const usersRoutes = [
  {
    path: 'users',
    element: <Users />,
    icon: 'people',
    name: 'Users',
    children: [
      {
        index: true,
        element: <UserList />,
        name: 'Users',
      },
      {
        path: 'add',
        element: <AddEditUser />,
        name: 'Add Circuit',
      },
    ],
  },
];

export default usersRoutes;
