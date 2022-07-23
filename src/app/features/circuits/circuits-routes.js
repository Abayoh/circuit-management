import React from 'react';
import CircuitsList from './components/CircuitsList';


const Circuits = React.lazy(() => import('./Circuits'));
const AddCircuits = React.lazy(() => import('../circuits/components/AddCircuits'));

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
        path: 'add-circuits',
        element: <AddCircuits />,
        name:'Add Circuits',
      },
    ]
  },
];

export default circuitsRoutes;
