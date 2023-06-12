import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { helpHttp } from '../../helpers/helpHttp';
import { useEffect } from 'react';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Mundo Tenis CGA
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (event) => {

    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const validationErrors = {}

    if (!data.get('firstName')) {
      validationErrors.firstName = "Ingrese su nombre."
    }
    if (!data.get('lastName')) {
      validationErrors.lastName = "Ingrese su apellido."
    }
    if (!data.get('address')) {
      validationErrors.address = "Ingrese su dirección."
    }
    if (!data.get('cell-number')) {
      validationErrors.cellNumber = "Ingrese su número telefónico."
    }
    if (!data.get('email')) {
      validationErrors.email = "Ingrese su correo electrónico."
    }
    if (!data.get('rut')) {
      validationErrors.rut = "Ingrese su rut."
    }
    if (!data.get('password')) {
      validationErrors.password = "Ingrese su constraseña."
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);

      setTimeout(() => {
        setErrors({});
      }, 5000);
      return;
    }

    const rute = "http://localhost:3000/API"
    axios.post(`${rute}/sign-up`, {
      name: data.get('firstName'),
      lastname: data.get('lastName'),
      email: data.get('email'),
      pass: data.get('password'),
      rut: data.get('rut'),
      address: data.get('address'),
      type: 'user'
    })
      //Realiza las acciones necesarias con la respuesta del backend
      .then((response) => {
        console.log('Respuesta del backend:', response.data);
        if (response.data.status == "success") {
          //CREACION DEL CARRO UNA VEZ SE REGISTRA
          let api = helpHttp()
          let url = "Http://localhost:3000/API/cart"
          let options = {
            body: data.get("email"),
            headers: { "content-type": "application/json" },
          };

          api
            .post(url, options)
            .then((res) => {
              if (!res.err) {
                console.log("carro creado", options.body)
              }
            })
          navigate('/login')
        }
      })
      // Maneja el error de la solicitud
      .catch((error) => {
        console.error('Error en la solicitud:', error);
      });


    // console.log({
    //   name: data.get('firstName'),
    //   lastName: data.get('lastName'),
    //   address: data.get('address'),
    //   cellphone: data.get('cell-number'),
    //   email: data.get('email'),
    //   rut: data.get('rut'),
    //   password: data.get('password'),
    //   emails: data.get('allowExtraEmails')
    // });
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 10,
          marginBottom: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: 'groove',
          borderRadius: 3,
          padding: '50px',
          boxShadow: '1px 1px 60px 5px rgba(25, 137, 243, 1)'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography color="secondary" component="h1" variant="h5">
          Crea tu cuenta
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                color="secondary"
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="Nombre"
                autoFocus
                placeholder='Esteban'
                error={errors.firstName !== undefined}
                helperText={errors.firstName || ' '}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                color="secondary"
                required
                fullWidth
                id="lastName"
                label="Apellido"
                name="lastName"
                autoComplete="family-name"
                placeholder='González'
                error={errors.lastName !== undefined}
                helperText={errors.lastName || ' '}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                color="secondary"
                required
                fullWidth
                id="address"
                label="Direccion"
                name="address"
                autoComplete="address"
                placeholder='Avenida Los Libertadores 1244'
                error={errors.address !== undefined}
                helperText={errors.address || ' '}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                color="secondary"
                required
                fullWidth
                id="cell-number"
                label="Celular"
                type="text"
                name="cell-number"
                autoComplete="cell-number"
                placeholder='+56912345678'
                error={errors.cellNumber !== undefined}
                helperText={errors.cellNumber || ' '}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                color="secondary"
                required
                fullWidth
                id="rut"
                label="RUT"
                type="text"
                name="rut"
                placeholder='10.542.578-9'
                error={errors.rut !== undefined}
                helperText={errors.rut || ' '}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                color="secondary"
                required
                fullWidth
                id="email"
                label="Correo electrónico"
                name="email"
                autoComplete="email"
                placeholder='ejemplo@gmail.com'
                error={errors.email !== undefined}
                helperText={errors.email || ' '}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                color="secondary"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="new-password"
                placeholder='********'
                error={errors.password !== undefined}
                helperText={errors.password || ' '}
              />
            </Grid>
          </Grid>
          <Button
            color="secondary"
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Registrarse
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button component={NavLink} to="/login" variant="body2">
                ¿Ya tienes una cuenta? Inicia sesión
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* <Copyright sx={{ mt: 5 }} /> */}
    </Container>
  );
}