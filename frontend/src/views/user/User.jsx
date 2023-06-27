import {
    Typography,
    Box,
    Grid,
    List,
    ListItem,
    Container,
    Button,
    TextField,
    MenuItem
} from "@mui/material";

import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../context/UserContext";
import { Modal } from "../../components/Alerts/Modal";
import CheckIcon from '@mui/icons-material/Check';
import EditIcon from '@mui/icons-material/Edit';
import { helpHttp } from "../../helpers/helpHttp";
import OrderContext from '../../context/OrderContext'
import PaginationOrder from "../../components/OrderItem/PaginationOrder";

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
    const { user, updateUserData } = useContext(UserContext);
    // const { orderByUser } = useContext(OrderContext)
    const { orders } = useContext(OrderContext)
    const [validationErrors, setValidationErrors] = useState({});
    const [edit, setEdit] = useState(false);
    const [editPass, setEditPass] = useState(false);
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmedPass, setConfirmedPass] = useState('')
    const [form, setForm] = useState(null);
    const [userOrders, setUserOrders] = useState(null)
    

    useEffect(() => {
        if (orders !== null && user !== null) {
            setUserOrders(orders.filter((order) => order.User._id === user._id));
        }
    }, [orders, user]);

    console.log(orders)

    console.log(userOrders)

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
                pass: '********',
                newPass: ''
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
            [name]: value
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

    const handlePassChange = () => {
        if (editPass && (newPass !== confirmedPass)) {
            Modal(
                'Actualización de contraseña',
                'Las contraseñas no coinciden',
                'error',
                ''
            );
            return;
        } else {
            Modal(
                'Actualización de contraseña',
                'Se actualizó correctamente la contraseña',
                'success',
                ''
            );
            setEditPass(false)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if ((!form.name ||
            !form.lastName ||
            !form.address ||
            !form.region ||
            !form.comuna ||
            !form.cellNumber) ||
            Object.keys(validationErrors).length > 0) {
            Modal(
                'Actualización de datos',
                'Faltan datos por ingresar o son erróneos',
                'error',
                ''
            )
            return;
        } else {
            updateUserData(form)
        }

        setEdit(false);
    };

    return (
        <>
            {
                user != null && userOrders !== null && (
                    <Container maxWidth="xl">
                        <Typography variant="h4" sx={{
                            mb: 4,
                            fontWeight: 700,
                            marginTop: 6,
                        }}
                        >
                            Panel de usuario
                        </Typography>

                        {edit ?
                            <>
                                <Grid spacing={2} rowSpacing={2} sx={{ mt: 1 }} container>
                                    <Grid sm={4} item>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            color="secondary"
                                            type="text"
                                            name="name"
                                            id="name"
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
                                            fullWidth
                                            size="small"
                                            color="secondary"
                                            type="text"
                                            name="lastName"
                                            id="lastName"
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
                                            fullWidth
                                            size="small"
                                            color="secondary"
                                            type="text"
                                            name="cellNumber"
                                            placeholder="Celular"
                                            label="Celular"
                                            id="cellNumber"
                                            onChange={handleChange}
                                            value={form.cellNumber}
                                            error={validationErrors.cellNumber !== undefined}
                                            helperText={validationErrors.cellNumber || ''}
                                        />
                                    </Grid>

                                    {editPass ?
                                        <>
                                            <Grid sm={4} item>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    size="small"
                                                    color="secondary"
                                                    type="password"
                                                    name="oldPass"
                                                    placeholder="*********"
                                                    label="Contraseña antigua"
                                                    id="oldPass"
                                                    onChange={(e) => setOldPass(e.target.value)}
                                                    value={oldPass}
                                                    error={validationErrors.pass !== undefined}
                                                    helperText={validationErrors.pass || ''}
                                                />
                                            </Grid>
                                            <Grid sm={4} item>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    size="small"
                                                    color="secondary"
                                                    type="password"
                                                    name="newPass"
                                                    placeholder="*********"
                                                    label="Contraseña nueva"
                                                    id="newPass"
                                                    onChange={(e) => setNewPass(e.target.value)}
                                                    value={newPass}
                                                    error={validationErrors.pass !== undefined}
                                                    helperText={validationErrors.pass || ''}
                                                />
                                            </Grid>
                                            <Grid sm={4} item>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    size="small"
                                                    color="secondary"
                                                    type="password"
                                                    name="confirmedPass"
                                                    placeholder="*********"
                                                    label="Confirme su contraseña nueva"
                                                    id="confirmedPass"
                                                    onChange={(e) => setConfirmedPass(e.target.value)}
                                                    value={confirmedPass}
                                                    error={validationErrors.pass !== undefined}
                                                    helperText={validationErrors.pass || ''}
                                                />
                                            </Grid>
                                            <Button onClick={handlePassChange}>
                                                <CheckIcon variant="contained" color="secondary" />
                                            </Button>

                                        </> :
                                        <>
                                            <Grid sm={4} item>
                                                <TextField
                                                    required
                                                    fullWidth
                                                    size="small"
                                                    color="secondary"
                                                    type="password"
                                                    name="oldPass"
                                                    placeholder="*********"
                                                    label="Contraseña antigua"
                                                    id="oldPass"
                                                    value={oldPass}
                                                    disabled
                                                />
                                            </Grid>
                                            <Button onClick={() => { setEditPass(true) }}>
                                                <EditIcon variant="contained" color="secondary" />
                                            </Button>
                                        </>
                                    }


                                    <Grid sm={12} item>
                                        <TextField
                                            required
                                            fullWidth
                                            size="small"
                                            color="secondary"
                                            type="text"
                                            name="email"
                                            id="email"
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
                                </Grid>

                                <Box sx={{ display: 'flex', justifyContent: 'right', pt: 1 }}>
                                    <Button onClick={handleSubmit}>
                                        <CheckIcon color="secondary" />
                                    </Button>
                                </Box>
                            </>
                            :
                            <>
                                {form != null ?
                                    <>
                                        <Box sx={{ mt: 4, mb: 4, border: '1px solid #bebebe', borderRadius: 1, p: 5, display: 'flex' }}>
                                            <Grid spacing={2} container direction='row' justifyContent='center'>
                                                <Grid sm={5} item >
                                                    <List>
                                                        <ListItem variant="h5" component={Typography} sx={{ mt: 1, fontWeight: 700 }}>Datos personales</ListItem>
                                                        <ListItem>Nombre: {form.name}</ListItem>
                                                        <ListItem>Apellido: {form.lastName}</ListItem>
                                                        <ListItem>Correo electrónico: {form.email}</ListItem>
                                                        <ListItem>Celular: {form.cellNumber}</ListItem>
                                                        <ListItem>Dirección: {form.address}</ListItem>
                                                        <ListItem>Región: {form.region}</ListItem>
                                                        <ListItem>Comuna: {form.comuna}</ListItem>
                                                    </List>
                                                </Grid>
                                                <Box sm={7} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                    <Button onClick={() => { setEdit(true) }}>
                                                        <EditIcon variant="contained" color="secondary" />
                                                    </Button>
                                                </Box>
                                            </Grid>
                                        </Box>

                                        <Box sx={{ mt: 4, mb: 4, border: '1px solid #bebebe', borderRadius: 1, p: 5, display: 'flex' }}>
                                            <Typography variant='h5' sx={{ mt:1, fontWeight: 700 }}> Pedidos </Typography>
                                                        <PaginationOrder type={'user'} orders={userOrders}></PaginationOrder>
                                                    
                                        </Box>
                                    </>
                                    : ''

                                }
                            </>

                        }
                    </Container>
                )
            }
        </>
    )
}