import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import * as EmailValidator from 'react-email-validator';
import Fade from '@mui/material/Fade';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { Toast } from '../Alerts/Toast';

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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn({ handleLogin }) {
  const [errorMsg, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const email = data.get('email')

    if(!EmailValidator.validate(email)) {
      setErrorMessage("Formato de email inválido")

      // Desaparecer el mensaje de error después de 3 segundos
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);

      return
    } 

    const rute = "http://localhost:3000/api"
    axios.post(`${rute}/sign-in`, {
      email: data.get('email'),
      pass: data.get('password'),
    }) 
     //Realiza las acciones necesarias con la respuesta del backend
    .then((response) => {
      console.log('Respuesta del backend:', response.data);
      if(response.data.message == "Ingreso de usuario exitoso"){
        handleLogin();
        Toast(
          'bottom-end',
          'success',
          'Se ha iniciado sesión'
        )
        navigate('/')
      }
    })
     // Maneja el error de la solicitud
    .catch((error) => {
      console.error('Error en la solicitud:', error);
    });
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
          <Avatar sx={{ m: 0.5, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography color="secondary" component="h1" variant="h5">
            Iniciar sesión
          </Typography>
          <Box 
            component="form" 
            onSubmit={handleSubmit} 
            noValidate 
            sx={{ mt: 1 }}>
            <TextField
              color="secondary"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo electrónico"
              name="email"
              autoComplete="email"
              autoFocus
              type="email"
              placeholder='ejemplo@gmail.com'
            />
            <TextField
              color="secondary"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              placeholder='**********'
            />
            <Button
              type="submit"
              color="secondary"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ingresar
            </Button>
            <Fade in={!!errorMsg} timeout={500}>
              <Typography variant="body2" color="error" align="center">
                {errorMsg}
              </Typography>
            </Fade>
            <Grid container>
              <Grid item xs>
                <Button href="#" 
                variant="body1" 
                component={NavLink}
                to="/">
                  ¿Olvidaste la contraseña?
                </Button>
              </Grid>
              <Grid item xs>
                <Button
                variant="body1"
                component={NavLink}
                to="/register">
                  {"¿No tienes una cuenta? Regístrate"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}