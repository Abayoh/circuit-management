import React from 'react'
import { useField } from 'formik';
import TextField from '@mui/material/TextField';

function SelectInput({ children, label, ...props }) {
    const [field, meta] = useField(props)
    return (
        <TextField select {...props}  {...field}
            label={label}
            helperText={meta.touched && meta.error ? meta.error : null}
            error={meta.touched && meta.error ? true : false}
        >
            {children}
        </TextField>
    )
}

export default SelectInput