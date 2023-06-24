import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { NavLink, useNavigate } from 'react-router-dom';
import { helpHttp } from '../../helpers/helpHttp';
import { MenuItem, Select } from '@mui/material';

/*
*******************************************************************************
*******************************************************************************
*******************************************************************************
***************** AGREGAR NUMERO DE TELEFONO EN EL FORMULARIO *****************
*******************************************************************************
*******************************************************************************
*******************************************************************************
*/

function isValidName(name) {
  const regex = /^[A-Za-zÁ-ÿ\s]+$/;
  return regex.test(name);
}

function isValidLastName(lastname) {
  const regex = /^[A-Za-zÁ-ÿ\s]+$/;
  return regex.test(lastname);
}

function isValidEmail(email) {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return regex.test(email);
}

function isValidPassword(password) {
  const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return regex.test(password);
}

function isValidPhoneNumber(cellNumber) {
  const regex = /^\d+$/;
  return regex.test(cellNumber);
}

export default function SignUp() {
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();
  const region = ['Valparaíso', "Libertador General Bernardo O'Higgins", 'Metropolitana'];
  const comunas = [
    ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana', 'Concón',
     'Quillota', 'La Calera', 'Los Andes', 'San Felipe', 'Limache', 'Olmué',
     'Lllay Llay', 'Casablanca', 'San Antonio', 'Cartagena', 'El Tabo',
     'El Quisco', 'Algarrobo', 'Papudo', 'La Ligua', 'Petorca',
     'Zapallar', 'Puchuncaví', 'Quintero', 'Nogales', 'Hijuelas', 'Santa María'],
    ['Rancagua', 'Machalí', 'Graneros', 'San Fernando', 
     'San Vicente de Tagua Tagua', 'Requínoa', 'Coltauco', 'Doñihue',
     'Olivar', 'Coinco', 'Quilta de Tilcoco', 'Las Cabras', 'Peumo',
     'Pichidegua', 'Malloa', 'Placilla', 'Nancagua', 'Chépica', 'Santa Cruz',
     'Lolol', 'Litueche', 'Pumanque', 'Palmilla', 'Peralillo', 'Navidad'],
    ['Cerrillos', 'Cerro Navia', 'Conchalí', 'El Bosque', 'Estación Central',
     'Huechuraba', 'Independencia', 'La Cisterna', 'La Florida', 'La Granja',
     'La Pintana', 'La Reina', 'Las Condes', 'Lo Barnechea', 'Lo Espejo', 'Lo Prado',
     'Macul', 'Maipú', 'Ñuñoa', 'Pedro Aguirre Cerda', 'Peñalolén', 'Providencia',
     'Pudahuel', 'Quilicura', 'Quinta Normal', 'Recoleta', 'Renca', 'San Joaquín',
     'San Miguel', 'San Ramón', 'Santiago', 'Vitacura']
  ];

  comunas.forEach((el) => {
    el.sort();
  })

  const initialForm = {
    name: '',
    lastname: '',
    email: '',
    pass: '',
    address: '',
    region: '',
    comuna: '',
    cellNumber: '',
    type: 'user'
  };

  const [form, setForm] = useState(initialForm);

  const validateField = (fieldName, value) => {
    let isValid = true;

    if (fieldName === 'name') {
      isValid = isValidName(value);
    } else if (fieldName === 'lastname') {
      isValid = isValidLastName(value);
    } else if (fieldName === 'email') {
      isValid = isValidEmail(value);
    } else if (fieldName === 'pass') {
      isValid = isValidPassword(value);
    } else if (fieldName === 'cellNumber') {
      isValid = isValidPhoneNumber(value);
    }

    setValidationErrors((prevState) => ({
      ...prevState,
      [fieldName]: isValid ? undefined : 'Campo inválido',
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    validateField(name, value);
  };

  const handleRegionChange = (e) => {
    const { value } = e.target;
    const index = region.indexOf(value);
    const comunasChosen = index >= 0 ? comunas[index] : [];

    setForm((prevForm) => ({
      ...prevForm,
      region: value,
      comuna: comunasChosen[0] || ''
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (Object.keys(validationErrors).length > 0) {
      setTimeout(() => {
        setValidationErrors({});
      }, 5000);
      return;
    }

    const api = helpHttp();
    const url = 'http://localhost:3000/api/sign-up';
    const options = {
      body: form,
      headers: { 'content-type': 'application/json' }
    };

    api
      .post(url, options)
      .then((res) => {
        if (!res.err) {
          console.log('usuario registrado', res);
          if (res.status === 'success') {
            const cartUrl = 'http://localhost:3000/api/cart';
            const cartOptions = {
              body: form.email,
              headers: {
                'content-type': 'application/json',
                Authorization: res.accessToken
              }
            };

            api
              .post(cartUrl, cartOptions)
              .then((res) => {
                if (!res.err) {
                  console.log('carro creado', cartOptions.body);
                }
              });

            navigate('/login');
          }
        }
      })
      .catch(e => {
        console.error(e);
      });

    setForm(initialForm);
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
                onChange={handleChange}
                name="name"
                required
                fullWidth
                id="firstName"
                label="Nombre"
                value={form.name}
                autoFocus
                placeholder='Esteban'
                error={validationErrors.name !== undefined}
                helperText={validationErrors.name || ' '}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                color="secondary"
                onChange={handleChange}
                required
                fullWidth
                id="lastName"
                label="Apellido"
                name="lastname"
                autoComplete="family-name"
                placeholder='González'
                value={form.lastname}
                error={validationErrors.lastname !== undefined}
                helperText={validationErrors.lastname || ' '}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                color="secondary"
                onChange={handleChange}
                required
                fullWidth
                id="address"
                label="Direccion"
                name="address"
                autoComplete="address"
                placeholder='Avenida Los Libertadores 1244'
                value={form.address}
                error={validationErrors.address !== undefined}
                helperText={validationErrors.address || ' '}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                color="secondary"
                onChange={handleRegionChange}
                required
                fullWidth
                id="region"
                label="Región"
                select
                placeholder='Región'
                value={form.region}
              >
                {region.map((regionName, index) => (
                  <MenuItem key={index} value={regionName}>
                    {regionName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                color="secondary"
                onChange={handleChange}
                required
                fullWidth
                id="comuna"
                label="Comuna"
                select
                placeholder='Comuna'
                value={form.comuna}
              >
                {comunas[region.indexOf(form.region)]?.map((comunaName, index) => (
                    <MenuItem key={index} value={comunaName}>
                      {comunaName}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                color="secondary"
                onChange={handleChange}
                required
                fullWidth
                id="cell-number"
                label="Celular"
                type="text"
                name="cellNumber"
                autoComplete="cell-number"
                placeholder='+56912345678'
                value={form.cellNumber}
                error={validationErrors.cellNumber !== undefined}
                helperText={validationErrors.cellNumber || ' '}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                color="secondary"
                onChange={handleChange}
                required
                fullWidth
                id="email"
                label="Correo electrónico"
                name="email"
                autoComplete="email"
                placeholder='ejemplo@gmail.com'
                value={form.email}
                error={validationErrors.email !== undefined}
                helperText={validationErrors.email || ' '}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                color="secondary"
                onChange={handleChange}
                required
                fullWidth
                name="pass"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="new-password"
                placeholder='********'
                value={form.pass}
                error={validationErrors.pass !== undefined}
                helperText={validationErrors.pass || ' '}
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
    </Container>
  );
}
