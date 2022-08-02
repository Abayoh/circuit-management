import React from 'react'
import { useField } from 'formik'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';

function InputWithAdorment({label, ...props }) {
    const [field, meta] = useField(props)
    return (
        <FormControl fullWidth >
            <InputLabel htmlFor={props.id || props.name}>{label}</InputLabel>
            <OutlinedInput
                {...props}
                {...field}
                startAdornment={<InputAdornment position="start">{props.adornment}</InputAdornment>}
                label={label}
                error={meta.touched && meta.error ? true : false}
            />
        </FormControl>
    )
}

export default InputWithAdorment