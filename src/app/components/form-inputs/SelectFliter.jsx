import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';
import { useFormik } from 'formik';

function SelectFliter({ options, label, ...props }) {
    const { field, meta } = useFormik(props);
    return (
        <Autocomplete
            id="country-select-demo"
            options={options}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
                <Box component="li"  {...props}>
                    {option.name}
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...field}
                    {...params}
                    label={label}
                    // helperText={meta.touched && meta.error ? meta.error : null}
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                />
            )}
        />
    );
}

export default SelectFliter