import React from 'react';
import { Container, Box, Typography, Grid } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate, useParams } from 'react-router-dom';

export default function Ticket() {
  const response = localStorage.getItem('data');
  const decodedResponse = decodeURIComponent(response);
  const resp = JSON.parse(decodedResponse);
  const navigate = useNavigate()
  
  if(response !== '' || response !== null) {
    setTimeout(() => {
      localStorage.removeItem('data');
      navigate("/")
      //window.location.href = '/'
    }, 7000);
  }
  

  return (
    <>
      {(response !== null || response !== '') ? (
        <Container
        maxWidth="xl"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Box
          sx={{ m: 5, border: '1px solid #bebebe', borderRadius: 1, width: '50%' }}
        >
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <CheckCircleOutlineIcon
              color="success"
              sx={{ fontSize: 100, strokeWidth: 0.5 }}
            />
          </Box>
  
          <Typography
            variant="h4"
            sx={{
              mb: 4,
              fontWeight: 700,
              marginTop: 6,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            Orden de compra{' '}
            {resp.detailsPayment.Details.status === 'AUTHORIZED'
              ? 'autorizada'
              : ''}
          </Typography>
          <Grid
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            direction="column"
            justifyContent="center"
            alignItems="center"
            container
          >
            <Grid item xs={2} sm={4} md={4}>
              <Typography
                variant="h6"
                sx={{ margin: 2, fontWeight: 500, padding: 2 }}
              >
                Número de orden: {resp.detailsPayment.Details.buy_order}
              </Typography>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <Typography
                variant="h6"
                sx={{ margin: 2, fontWeight: 500, padding: 2 }}
              >
                Estado de la compra: {resp.order.Status}
              </Typography>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <Typography
                variant="h6"
                sx={{ margin: 2, fontWeight: 500, padding: 2 }}
              >
                Tienda: Mundo Tenis CGA
              </Typography>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <Typography
                variant="h6"
                sx={{ margin: 2, fontWeight: 500, padding: 2 }}
              >
                Datos de tarjeta de pago: **** **** ****{' '}
                {resp.detailsPayment.Details.card_detail.card_number}
              </Typography>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <Typography
                variant="h6"
                sx={{ margin: 2, fontWeight: 500, padding: 2 }}
              >
                Cantidad de artículos:{' '}
                {resp.order.Cart[1].Products.length}
              </Typography>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <Typography
                variant="h6"
                sx={{ margin: 2, fontWeight: 500, padding: 2 }}
              >
                Total de la compra: ${resp.detailsPayment.Details.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
      ) : (
        <Container
      maxWidth="xl"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{ m: 5, border: '1px solid #bebebe', borderRadius: 1, width: '50%' }}
      >
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <CheckCircleOutlineIcon
            color="success"
            sx={{ fontSize: 100, strokeWidth: 0.5 }}
          />
        </Box>

        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontWeight: 700,
            marginTop: 6,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Orden de compra{' '}
          {resp.detailsPayment.Details.status === 'AUTHORIZED'
            ? 'autorizada'
            : ''}
        </Typography>
        <Grid
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          direction="column"
          justifyContent="center"
          alignItems="center"
          container
        >
          <Grid item xs={2} sm={4} md={4}>
            <Typography
              variant="h6"
              sx={{ margin: 2, fontWeight: 500, padding: 2 }}
            >
              Número de orden: {resp.detailsPayment.Details.buy_order}
            </Typography>
          </Grid>
          <Grid item xs={2} sm={4} md={4}>
            <Typography
              variant="h6"
              sx={{ margin: 2, fontWeight: 500, padding: 2 }}
            >
              Estado de la compra: {resp.order.Status}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
      )}
    </>
  );
}
