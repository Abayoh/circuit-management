import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectAllCircuits,
  getCircuitsError,
  getCircuitsStatus,
  fetchCircuits,
} from './circuit-slice';

const Circuits = () => {
  const circuits = useSelector(selectAllCircuits);
  const jsonCircuit = JSON.stringify(
    circuits.map((c) => ({ [c.id]: { name: c.name, cost: c.cost } }))
  );
  console.log(jsonCircuit);
  return <div>Circuits</div>;
};

export default Circuits;
