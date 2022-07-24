import React from 'react';
import { useField } from 'formik';
import TextField from '@mui/material/TextField';

function TextInput({ label, ...props }) {
    const [field, meta] = useField(props);
    
    return (
        <TextField label={label} {...props}
            {...field}
            helperText={meta.touched && meta.error ? meta.error : null}
            error={meta.touched && meta.error ? true : false}
        />
    )
}

export default TextInput