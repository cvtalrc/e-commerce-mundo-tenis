import { Box, Typography, Container } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function Sports() {
  const { sport } = useParams();
  console.log(sport);
  return (

    <Container sx={{ width: 1300 }}>
      <Typography variant="h3"> {sport} </Typography>
    </Container>



  )
}