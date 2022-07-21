import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Link as RouterLink } from 'react-router-dom';

function PageToolsbar({ pageTitle, linkName, linkPath }) {
    return (
        <>
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    m: -1
                }}
            >
                <Typography
                    sx={{ m: 1 }}
                    variant="h4"
                >
                    {pageTitle}
                </Typography>
                <Box sx={{ m: 1 }}>
                    <Button
                        component={RouterLink}
                        color="primary"
                        variant="contained"
                        to={linkPath}>
                        {linkName}
                    </Button>
                </Box>
            </Box>
            <Divider sx={{ mt: 3 }} />
        </>
    )
}

export default PageToolsbar