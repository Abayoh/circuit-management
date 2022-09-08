import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useField } from 'formik';
import PropTypes from 'prop-types';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelect({ options, ...props }) {
  const [field, meta] = useField(props);

  return (
    <Select
      multiple
      displayEmpty
      {...field}
      {...props}
      input={<OutlinedInput />}
      renderValue={(selected) => {
        if (selected.length === 0) {
          return <em>Placeholder</em>;
        }

        return selected.join(', ');
      }}
      MenuProps={MenuProps}
      inputProps={{ 'aria-label': 'Without label' }}
      helperText={meta.touched && meta.error ? meta.error : null}
      error={meta.touched && meta.error ? true : false}
    >
      <MenuItem disabled value=''>
        <em>Placeholder</em>
      </MenuItem>
      {options.map((op) => (
        <MenuItem key={op.name} value={op.value}>
          {op.name}
        </MenuItem>
      ))}
    </Select>
  );
}

MultipleSelect.propTypes = {
  options: PropTypes.arrayOf({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
};
