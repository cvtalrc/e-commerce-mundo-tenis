import React from 'react';
import { Container, Box, Typography, Grid } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function EmailConfirm() {

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
          <CheckCircleOutlineIcon
            color="success"
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
          Confirmación de email realizada con éxito.
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
          Ya puedes iniciar sesión en tu nueva cuenta.
        </Typography>

      </Box>

    </Container>

  );
}
