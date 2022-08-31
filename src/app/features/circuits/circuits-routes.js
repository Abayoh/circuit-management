import React from 'react';
import CircuitsList from './CircuitsList';


const Circuits = React.lazy(() => import('./Circuits'));
const AddEditCircuit = React.lazy(() => import('./AddEditCircuit'));

const circuitsRoutes = [
  {
    path: 'circuits',
    element: <Circuits />,
    name: 'Circuits',
    icon: 'cable',
    children:[
      { 
        index:true,
        element: <CircuitsList />,
        name:'Circuits',
      },
      { 
        path: 'add',
        element: <AddEditCircuit />,
        name:'Add Circuit',
      },
      { 
        path: 'edit/:id',
        element: <AddEditCircuit />,
        name:'Edit Circuit',
      },
    ]
  },
];

export default circuitsRoutes;
