import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState, useContext } from 'react';
import Fade from '@mui/material/Fade';
import { NavLink } from 'react-router-dom'
import UserContext from '../../context/UserContext';

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

function isValidEmail(email) {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return regex.test(email);
}

function isValidPassword(password) {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return regex.test(password);  
}

// TODO remove, this demo shouldn't need to reset the theme.

export default function SignIn() {
  const [validationErrors, setValidationErrors] = useState({});

  const initialForm = {
    email: "",
    pass: ""
  };

  const [form, setForm] = useState(initialForm);
  const [errorMsg, setErrorMessage] = useState('');
  const { logIn } = useContext(UserContext);

  const validateField = (fieldName, value) => {
    let isValid = true;

    if (fieldName === 'email') {
      isValid = isValidEmail(value)
    } else if (fieldName === 'pass') {
      isValid = isValidPassword(value)
    }

    setValidationErrors((prevState) => ({
      ...prevState,
      [fieldName]: isValid ? undefined : 'Campo inválido'
    }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    validateField(name, value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(form)

    logIn(form);
  }
  
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
              label="Correo electrónico"
              onChange={handleChange}
              id='email'
              name="email"
              value={form.email}
              autoComplete="email"
              autoFocus
              type="email"
              placeholder='ejemplo@gmail.com'
              error={validationErrors.email !== undefined}
              helperText={validationErrors.email || ' '}
            />
            <TextField
              color="secondary"
              margin="normal"
              required
              fullWidth
              name="pass"
              label="Contraseña"
              onChange={handleChange}
              value={form.pass}
              type="password"
              autoComplete="current-password"
              placeholder='**********'
              error={validationErrors.pass !== undefined}
              helperText={validationErrors.pass || ' '}
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