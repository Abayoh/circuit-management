import React from 'react';
import Grid from '@mui/material/Grid';
import RadialChat from './components/RadialChat';
import Container from '../../components/form-inputs/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

const Dashboard = () => {
  return (
    <Box
      display='grid'
      gridTemplateColumns='repeat(16, 1fr)'
      gridTemplateRows='100px 2fr, auto'
      gap={3}
    >
      <Box
        gridColumn='1/2'
        gridRow='1/2'
        sx={{ backgroundColor: 'red', width: '100%', height: '100%' }}
      >
        hey
      </Box>
      <Box
        gridColumn='2/3'
        gridRow='1/2'
        sx={{ backgroundColor: 'red', width: '100%', height: '100%' }}
      >
        hey
      </Box>
      <Box
        gridColumn='3/4'
        gridRow='1/2'
        sx={{ backgroundColor: 'red', width: '100%', height: '100%' }}
      >
        hey
      </Box>
      <Box
        gridColumn='4/5'
        gridRow='1/2'
        sx={{ backgroundColor: 'red', width: '100%', height: '100%' }}
      >
        hey
      </Box>
      <Box
        gridColumn='5/6'
        gridRow='1/2'
        sx={{ backgroundColor: 'red', width: '100%', height: '100%' }}
      >
        hey
      </Box>
      <Box
        gridColumn='6/7'
        gridRow='1/2'
        sx={{ backgroundColor: 'red', width: '100%', height: '100%' }}
      >
        hey
      </Box>
      <Box
        gridColumn='7/8'
        gridRow='1/2'
        sx={{ backgroundColor: 'red', width: '100%', height: '100%' }}
      >
        hey
      </Box>
      <Box
        gridColumn='8/9'
        gridRow='1/2'
        sx={{ backgroundColor: 'red', width: '100%', height: '100%' }}
      >
        hey
      </Box>
      <Box
        gridColumn='9/10'
        gridRow='1/2'
        sx={{ backgroundColor: 'red', width: '100%', height: '100%' }}
      >
        hey
      </Box>
      <Box
        gridColumn='10/11'
        gridRow='1/2'
        sx={{ backgroundColor: 'red', width: '100%', height: '100%' }}
      >
        hey
      </Box>
      <Box
        gridColumn='11/12'
        gridRow='1/2'
        sx={{ backgroundColor: 'red', width: '100%', height: '100%' }}
      >
        hey
      </Box>
      <Box
        gridColumn='12/13'
        gridRow='1/2'
        sx={{ backgroundColor: 'red', width: '100%', height: '100%' }}
      >
        hey
      </Box>
      <Box
        gridRow='2/3'
        gridColumn='span 12'
        direction='row'
        gap={3}
        display='grid'
        gridTemplateColumns='repeat(12, 1fr)'
      >
        <Container header='Capacity' gridColumn='span 4'>
          <RadialChat />
        </Container>
        <Container header='Capacity' height='300px' gridColumn='span 4'>
          <RadialChat />
        </Container>
        <Container header='Capacity' height='300px' gridColumn='span 4'>
          <RadialChat />
        </Container>
        <Container header='Capacity' height='300px' gridColumn='span 4'>
          <RadialChat />
        </Container>
      </Box>

      <Box gridRow='3/4' gridColumn='span 6'>
        <Container header='Capacity' width='100%'>
          <RadialChat />
        </Container>
      </Box>
      <Box gridRow='3/4' gridColumn='span 6'>
        <Container header='Capacity' width='100%'>
          <RadialChat />
        </Container>
      </Box>
      <Box gridRow='2/10' gridColumn='span 4'>
        <Container header='Capacity' width='100%'>
          <RadialChat />
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
