import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function CustomerCard({
  name,
  imageUrl,
  circuitsCount,
  onMakePaymentsClick,
  onEditPaymentClick,
}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component='img'
        alt='green iguana'
        height='140'
        image={imageUrl || `/assets/images/lizard.jpeg`}
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          This Customer has about {circuitsCount}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small' onClick={onMakePaymentsClick}>
          Make Payments
        </Button>
        <Button size='small' onClick={onEditPaymentClick}>
          Edit
        </Button>
      </CardActions>
    </Card>
  );
}
