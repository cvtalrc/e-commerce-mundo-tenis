import {
    Typography,
    Box,
    Grid,
    List,
    ListItem,
    Container
} from "@mui/material";

import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import { Modal } from "../../components/Alerts/Modal";
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';

function isValidName(name) {
    const regex = /^[A-Za-zÁ-ÿ\s]+$/;
    return regex.test(name);
}

function isValidLastName(lastname) {
    const regex = /^[A-Za-zÁ-ÿ\s]+$/;
    return regex.test(lastname);
}

function isValidPhoneNumber(cellNumber) {
    const regex = /^\+569\d{8}$/;
    return regex.test(cellNumber);
}

function isValidAddress(address) {
    const regex = /^[A-Za-zÁ-ÿ\s]+\s\d+$/;
    return regex.test(address)
}

export default function User() {
    const { user } = useContext(UserContext);
    const [validationErrors, setValidationErrors] = useState({});
    const [form, setForm] = useState(null);

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

    useEffect(() => {
        if (user != null) {
            const initialForm = {
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                address: user.address,
                region: user.region,
                comuna: user.comuna,
                cellNumber: user.cellNumber,
            }
            setForm(initialForm);
        }
    }, [user])

    comunas.forEach((el) => {
        el.sort();
    });

    const validateField = (fieldName, value) => {
        let isValid = true;

        if (!value.trim()) {
            isValid = false;
            setValidationErrors((prevState) => ({
                ...prevState,
                [fieldName]: 'Campo obligatorio'
            }));
        } else {
            if (fieldName === "name") {
                isValid = isValidName(value);
            } else if (fieldName === "lastName") {
                isValid = isValidName(value);
            } else if (fieldName === "cellNumber") {
                isValid = isValidName(value);
            } else if (fieldName === "address") {
                isValid = isValidName(value);
            }

            if (isValid) {
                setValidationErrors((prevState) => {
                    const updatedErrors = { ...prevState };
                    delete updatedErrors[fieldName];
                    return updatedErrors;
                })
            } else {
                setValidationErrors((prevState) => ({
                    ...prevState,
                    [fieldName]: 'Campo inválido'
                }));
            }
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleRegionChange = (e) => {
        const { value } = e.target;
        const index = region.indexOf(value);
        const comunasChosen = index >= 0 ? comunas[index] : [];

        setForm((prevForm) => ({
            ...prevForm,
            region: value,
            comuna: comunasChosen[0] || ""
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if ((!form.name || !form.lastName || !form.address || !form.region || !form.comuna || !form.cellNumber) || Object.keys(validationErrors).length > 0) {
            Modal(
                'Actualización de datos',
                'Faltan datos por ingresar o son erróneos',
                'error',
                ''
            )
            return;
        }
    };

    return (
        <>
            {
                user != null ? (   
                  <Container maxWidth="xl" sx={{
                    alignItems: 'flex-start', display: 'flex', flexDirection: 'column'
                  }}
                  >
                    <Typography variant="h4" sx={{
                        mb: 4, 
                        fontWeight: 700,
                        mt: 4,
                    }}
                    >
                        Panel de usuario
                    </Typography> 
                    <Box sx={{ mt: 4, mb: 4, border: '1px solid #bebebe', borderRadius: 1, p: 5}}>
                        <Grid spacing={2} container direction='row' justifyContent='center' alignItems='center'>
                            <Grid sm={12} item >
                                <List>
                                    <ListItem variant="h5" component={Typography} sx={{ mt: 1, fontWeight: 700 }}>Datos personales</ListItem>
                                    <ListItem>Nombre: {user.name}</ListItem>
                                    <ListItem>Apellido: {user.lastName}</ListItem>
                                    <ListItem>Correo electrónico: {user.email}</ListItem>
                                    <ListItem>Celular: {user.cellNumber}</ListItem>
                                    <ListItem>Dirección: {user.address}</ListItem>
                                    <ListItem>Región: {user.region}</ListItem>
                                    <ListItem>Comuna: {user.comuna}</ListItem>
                                </List>
                            </Grid>
                        </Grid>
                    </Box>
                    </Container>
                ) : (
                    <Typography>
                        No hay usuario registrado
                    </Typography>
                )
            }
        </>
    )
}