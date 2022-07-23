import React from 'react';
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save'

function AddCircuitsForm() {
    return (
        <form >
            <Grid container spacing={3}>
                <Grid item md={6} xs={12}>
                    <TextField
                        fullWidth
                        label="Circuits Name"
                        variant='outlined'
                    />
                </Grid>
                <Grid item md={6} xs={12}>
                    <TextField
                        fullWidth
                        label="Select Customer"
                        variant='outlined'
                        select
                    >
                        <MenuItem value="cus1">
                            Orange Liberia
                        </MenuItem>
                        <MenuItem value="cus2">
                            MTN Liberia
                        </MenuItem>
                    </TextField>
                </Grid>
                <Grid item md={6} xs={12}>
                    <TextField
                        fullWidth
                        label='Circuits Capacity'
                        variant='outlined'
                    />
                </Grid>
                <Grid item md={6} xs={12}>
                    <FormControl fullWidth>
                        <InputLabel htmlFor="outlined-adornment-amount">Cost</InputLabel>
                        <OutlinedInput
                            type="number"
                            startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            label="Cost"
                        />
                    </FormControl>
                </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }} >
                <LoadingButton
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    type="submit"
                    color="primary"
                    variant="contained"
                >
                    Save details
                </LoadingButton>
            </Box>
        </form>
    )
}

export default AddCircuitsForm