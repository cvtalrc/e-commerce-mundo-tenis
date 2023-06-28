import React from 'react';
import { Container, Box, Typography, Grid } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

export default function TicketError() {

  // setTimeout(() => {
  //   window.location.href = '/login'
  // }, 10000);

  return (
    <Container maxWidth="xl" sx={{
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    }}>

      <Box sx={{  m: 5, border: '1px solid #bebebe', borderRadius: 1, width: '50%', mb:15}}>

        <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
          <ErrorIcon 
            color="error"
            sx={{ fontSize: 100, strokeWidth: 0.5 }}
          />
        </Box>

        <Typography variant="h4"
          sx={{
            fontWeight: 500,
            marginTop: 6,
            justifyContent: 'center',
            textAlign: 'center',
            fontSize: 33
          }}
        >
          El proceso de pago ha sido rechazado.
        </Typography>

        <Typography variant="h4"
          sx={{
            fontWeight: 500,
            marginTop: 2,
            justifyContent: 'center',
            textAlign: 'center',
            mb: 20,
            fontSize: 33
          }}
        >
          Vuelve a intentarlo.
        </Typography>

      </Box>

    </Container>

  );
}
