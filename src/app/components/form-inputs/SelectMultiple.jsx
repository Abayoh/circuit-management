import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';

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
    <FormControl error={meta.touched && meta.error ? true : false} fullWidth>
      <InputLabel id='select-error-label'>Role</InputLabel>
      <Select
        labelId='select-error-label'
        id='select-error'
        multiple
        displayEmpty
        {...field}
        {...props}
        renderValue={(selected) => {

          return selected?.join(', ');
        }}
        MenuProps={MenuProps}
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
      <FormHelperText>
        {meta.touched && meta.error ? meta.error : null}
      </FormHelperText>
    </FormControl>
  );
}

MultipleSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
