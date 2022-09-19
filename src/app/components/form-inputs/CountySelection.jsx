import React from 'react';
import SelectInput from './SelectInput';
import MenuItem from '@mui/material/MenuItem';

//counties of Libeia
const counties = [
  { label: 'Bomi', value: 'bomi' },
  { label: 'Bong', value: 'bong' },
  { label: 'Grand Bassa', value: 'grand bassa' },
  { label: 'Grand Cape Mount', value: 'grand cape mount' },
  { label: 'Grand Gedeh', value: 'grand gedeh' },
  { label: 'Grand Kru', value: 'grand kru' },
  { label: 'Lofa', value: 'lofa' },
  { label: 'Margibi', value: 'margibi' },
  { label: 'Maryland', value: 'maryland' },
  { label: 'Montserrado', value: 'montserrado' },
  { label: 'Nimba', value: 'nimba' },
  { label: 'River Cess', value: 'river cess' },
  { label: 'River Gee', value: 'river gee' },
  { label: 'Sinoe', value: 'sinoe' },
];

const CountySelection = (props) => {
  return (
    <SelectInput {...props}>
      {counties.map((county) => (
        <MenuItem key={county.value} value={county.value}>
          {county.label}
        </MenuItem>
      ))}
    </SelectInput>
  );
};

export default CountySelection;
