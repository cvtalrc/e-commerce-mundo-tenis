import { TextField, Box, Typography, Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button, MenuItem, List, ListItem, ListItemAvatar } from "@mui/material";
import React, { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import { Modal } from "../Alerts/Modal";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StoreIcon from '@mui/icons-material/Store';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';

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

const FormDelivery = ({ user, form, setForm, deliveryMethod, setDeliveryMethod, edit, setEdit }) => {
    const [validationErrors, setValidationErrors] = useState({});
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

    const validateField = (fieldName, value) => {
        let isValid = true;

        if (!value.trim()) {
            isValid = false;
            setValidationErrors((prevState) => ({
                ...prevState,
                [fieldName]: 'Campo obligatorio',
            }));
        } else {
            if (fieldName === 'name') {
                isValid = isValidName(value);
            } else if (fieldName === 'lastName') {
                isValid = isValidLastName(value);
            } else if (fieldName === 'cellNumber') {
                isValid = isValidPhoneNumber(value);
            } else if (fieldName === 'address') {
                isValid = isValidAddress(value);
            }

            if (isValid) {
                setValidationErrors((prevState) => {
                    const updatedErrors = { ...prevState };
                    delete updatedErrors[fieldName];
                    return updatedErrors;
                });
            } else {
                setValidationErrors((prevState) => ({
                    ...prevState,
                    [fieldName]: 'Campo inválido',
                }));
            }
        }
    };

    console.log(form)

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

        if (name !== 'instructions') {
            validateField(name, value);
        }
    };

    const handleRegionChange = (e) => {
        const { value } = e.target;
        const index = region.indexOf(value);
        const comunasChosen = index >= 0 ? comunas[index] : [];

        setForm((prevForm) => ({
            ...prevForm,
            region: value,
            comuna: comunasChosen[0] || ""
        }))
    };

    const handleDeliveryMethodChange = (e) => {
        setDeliveryMethod(e.target.value);
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        form.delivery = deliveryMethod

        console.log(validationErrors)

        if ((!form.delivery || !form.name || !form.lastName || !form.address || !form.region || !form.comuna || !form.cellNumber) || Object.keys(validationErrors).length > 0) {
            Modal(
                'Datos de entrega',
                'Faltan datos por ingresar o son erróneos',
                'error',
                ''
            )
            return;
        }

        setEdit(false)
        console.log(form);
    };

    return (

        <Box sx={{ mt: 4, mb: 4, border: '1px solid #bebebe', borderRadius: 1, p: 5 }}>

            <FormControl component="fieldset">
                <FormLabel sx={{ fontWeight: 700, color: 'black' }} component="legend">Método de entrega</FormLabel>
                <RadioGroup
                    aria-label="delivery"
                    name="delivery"
                    value={deliveryMethod}
                    onChange={handleDeliveryMethodChange}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
                        <FormControlLabel value="store-pickup" control={<Radio />} label="Retiro en tienda" />
                        <FormControlLabel value="delivery" control={<Radio />} label="Delivery" />
                    </Box>
                </RadioGroup>
            </FormControl>

            <Grid spacing={2} justifyContent={"space-between"} container>
                <Grid sm={6} item>
                    <List>
                        <ListItem variant="h5" component={Typography} sx={{ mt: 1, fontWeight: 700 }}>
                            <Typography variant="h5" sx={{ mt: 1, fontWeight: 700 }}>Datos personales</Typography>
                            <AccountCircleIcon sx={{ ml: 2, fontSize: 38 }} />
                        </ListItem>
                        <ListItem>
                            <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                            <Typography variant="h6" sx={{ ml: 2, fontSize: 18 }} >Nombre: {user.name}</Typography>
                        </ListItem>
                        <ListItem>
                            <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                            <Typography variant="h6" sx={{ ml: 2, fontSize: 18 }} >Apellido: {user.lastName}</Typography>
                        </ListItem>
                        <ListItem>
                            <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                            <Typography variant="h6" sx={{ ml: 2, fontSize: 18 }} >Celular: {user.cellNumber}</Typography>
                        </ListItem>
                        <ListItem>
                            <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                            <Typography variant="h6" sx={{ ml: 2, fontSize: 18 }} >Correo electrónico: {user.email}</Typography>
                        </ListItem>

                        <ListItem>
                            <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                            <Typography variant="h6" sx={{ ml: 2, fontSize: 18 }} >Dirección: {user.address}</Typography>
                        </ListItem>
                        <ListItem>
                            <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                            <Typography variant="h6" sx={{ ml: 2, fontSize: 18 }} >Región: {user.region}</Typography>
                        </ListItem>
                        <ListItem>
                            <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                            <Typography variant="h6" sx={{ ml: 2, fontSize: 18 }} >Comuna: {user.comuna}</Typography>
                        </ListItem>
                    </List>

                </Grid>
                <Grid sm={6} item>
                    {deliveryMethod === 'store-pickup' ?
                        (<List>
                            <ListItem variant="h5" component={Typography} sx={{ mt: 1, fontWeight: 700 }}>
                                <Typography variant="h5" sx={{ mt: 1, fontWeight: 700 }}>Datos de Retiro</Typography>
                                <StoreIcon sx={{ ml: 2, fontSize: 40 }} />
                            </ListItem>
                            <ListItem>
                                <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                                <Typography variant="h6" sx={{ ml: 2, fontSize: 18 }} >Dirección: Vargas Buston 960</Typography>
                            </ListItem>
                            <ListItem>
                                <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                                <Typography variant="h6" sx={{ ml: 2, fontSize: 18 }} >Región: Metropolitana</Typography>
                            </ListItem>
                            <ListItem>
                                <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                                <Typography variant="h6" sx={{ ml: 2, fontSize: 18 }} >Comuna: San Miguel</Typography>
                            </ListItem>
                            <ListItem>
                                <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                                <Typography variant="h6" sx={{ ml: 2, fontSize: 18 }} >Contacto: +56952360764</Typography>
                            </ListItem>
                        </List>)

                        :
                        (<>
                            <ListItem variant="h5" component={Typography} sx={{ mt: 1, fontWeight: 700 }}>
                                <Typography variant="h5" sx={{ mt: 1, fontWeight: 700 }}>Datos de Entrega</Typography>
                                <DeliveryDiningOutlinedIcon sx={{ ml: 2, fontSize: 40 }} />
                            </ListItem>
                            {edit ? (<form >
                                <Grid spacing={1} rowSpacing={2} sx={{ mt: 1 }} container>
                                    <Grid sm={4} item>
                                        <TextField
                                            size="small"
                                            color="secondary"
                                            type="text"
                                            name="name"
                                            required
                                            placeholder="Nombre"
                                            label="Nombre"
                                            onChange={handleChange}
                                            value={form.name}
                                            error={validationErrors.name !== undefined}
                                            helperText={validationErrors.name || ''}
                                        />
                                    </Grid>
                                    <Grid sm={4} item>
                                        <TextField
                                            required
                                            size="small"
                                            color="secondary"
                                            type="text"
                                            name="lastName"
                                            placeholder="Apellido"
                                            label="Apellido"
                                            onChange={handleChange}
                                            value={form.lastName}
                                            error={validationErrors.lastName !== undefined}
                                            helperText={validationErrors.lastName || ''}
                                        />
                                    </Grid>
                                    <Grid sm={4} item>
                                        <TextField
                                            required
                                            size="small"
                                            color="secondary"
                                            type="text"
                                            name="cellNumber"
                                            placeholder="Celular"
                                            label="Celular"
                                            onChange={handleChange}
                                            value={form.cellNumber}
                                            error={validationErrors.cellNumber !== undefined}
                                            helperText={validationErrors.cellNumber || ''}
                                        />
                                    </Grid>
                                    <Grid sm={12} item>
                                        <TextField
                                            required
                                            fullWidth
                                            size="small"
                                            color="secondary"
                                            type="text"
                                            name="email"
                                            placeholder="Correo electrónico"
                                            label="Correo electrónico"
                                            onChange={handleChange}
                                            value={form.email}
                                            disabled
                                        />
                                    </Grid>
                                    <Grid sm={12} item>
                                        <TextField
                                            required
                                            fullWidth
                                            size="small"
                                            color="secondary"
                                            type="text"
                                            name="address"
                                            id="address"
                                            placeholder="Direccion"
                                            label="Direccion"
                                            onChange={handleChange}
                                            value={form.address}
                                            error={validationErrors.address !== undefined}
                                            helperText={validationErrors.address || ''}
                                        />
                                    </Grid>
                                    <Grid sm={6} item>
                                        <TextField
                                            required
                                            fullWidth
                                            size="small"
                                            color="secondary"
                                            type="text"
                                            name="region"
                                            placeholder="Región"
                                            label="Región"
                                            select
                                            onChange={handleRegionChange}
                                            value={form.region}
                                        >
                                            {region.map((regionName, index) => (
                                                <MenuItem key={index} value={regionName}>
                                                    {regionName}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid sm={6} item>
                                        <TextField
                                            required
                                            fullWidth
                                            size="small"
                                            color="secondary"
                                            type="text"
                                            name="comuna"
                                            placeholder="Comuna"
                                            label="Comuna"
                                            onChange={handleChange}
                                            value={form.comuna}
                                            select
                                        >
                                            {(comunas[region.indexOf(form.region)] || []).map((comunaName, index) => (
                                                <MenuItem key={index} value={comunaName}>
                                                    {comunaName}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>

                                    <Grid sm={12} item>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            color="secondary"
                                            type="text"
                                            name="instructions"
                                            placeholder="Intrucciones de entrega"
                                            label="Intrucciones de entrega"
                                            onChange={handleChange}
                                            value={form.instructions}
                                        />
                                    </Grid>

                                </Grid>
                                <Box sx={{ display: 'flex', justifyContent: 'right', pt: 1 }}>
                                    <Button onClick={handleSubmit}>
                                        <CheckIcon />
                                    </Button>
                                </Box>

                            </form>) :
                                (<Grid container>
                                    <Grid sm={10} xs={10} item>
                                        <List>
                                            <ListItem>
                                                <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                                                <Typography variant="h6" sx={{ ml: 2, fontSize: 18 }} >Nombre: {form.name}</Typography>
                                            </ListItem>
                                            <ListItem>
                                                <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                                                <Typography variant="h6" sx={{ ml: 2, fontSize: 18 }} >Apellido: {form.lastName}</Typography>
                                            </ListItem>
                                            <ListItem>
                                                <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                                                <Typography variant="h6" sx={{ ml: 2, fontSize: 18 }} >Celular: {form.cellNumber}</Typography>
                                            </ListItem>
                                            <ListItem>
                                                <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                                                <Typography variant="h6" sx={{ ml: 2, fontSize: 18 }} >Correo electrónico: {form.email}</Typography>
                                            </ListItem>
                                            <ListItem>
                                                <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                                                <Typography variant="h6" sx={{ ml: 2, fontSize: 18 }} >Dirección: {form.address} </Typography>
                                            </ListItem>
                                            <ListItem>
                                                <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                                                <Typography variant="h6" sx={{ ml: 2, fontSize: 18 }} >Región: {form.region}</Typography>
                                            </ListItem>
                                            <ListItem>
                                                <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                                                <Typography variant="h6" sx={{ ml: 2, fontSize: 18 }} >Comuna: {form.comuna}</Typography>
                                            </ListItem>
                                            {form.instructions ?
                                                <ListItem>
                                                    <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                                                    <Typography variant="h6" sx={{ ml: 2, fontSize: 18 }} >Instrucciones de entrega: {form.instructions}</Typography>
                                                </ListItem>
                                                : ''}

                                        </List>
                                    </Grid>
                                    <Grid sm={2} xs={2} item>
                                        <Button onClick={() => { setEdit(true) }}>
                                            <EditIcon variant="contained" />
                                        </Button>
                                    </Grid>
                                </Grid>
                                )
                            }

                        </>)
                    }
                </Grid>
            </Grid>
        </Box >
    );
};

export default FormDelivery;

