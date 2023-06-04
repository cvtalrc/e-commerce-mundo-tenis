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
import { useContext, useState } from 'react';
import * as EmailValidator from 'react-email-validator';
import Fade from '@mui/material/Fade';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

export default function SignIn({ updateUserName }) {
  
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
        const userName = response.data.name
        updateUserName(userName)
        console.log(response.data.name)
        navigate('/')
      }
    })
     // Maneja el error de la solicitud
    .catch((error) => {
      console.error('Error en la solicitud:', error);
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
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
            boxShadow: '1px 1px 60px 5px rgba(118, 145, 255, 1)'
          }}
        >
          <Avatar sx={{ m: 0.5, bgcolor: 'primary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar sesión
          </Typography>
          <Box 
            component="form" 
            onSubmit={handleSubmit} 
            noValidate 
            sx={{ mt: 1 }}>
            <TextField
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
                <Link href="#" variant="body2">
                  ¿Olvidaste la contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"¿No tienes una cuenta? Regístrate"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}