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
import Swal from 'sweetalert2'

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StoreIcon from '@mui/icons-material/Store';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ChecklistIcon from '@mui/icons-material/Checklist';
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

export default function User() {
    const { user, updateUserData, logOut } = useContext(UserContext);
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

    const handleEdit = () => {
        Swal.fire({
            title: '¿Quieres editar tu información?',
            text: "Para ver los cambios, deberás cerrar sesión",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '¡Si, cambiémoslo!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Cambios!',
                    'Tus datos estarán disponibles para cambio.',
                    'success'
                )
                setEdit(true)
            }
        })
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
                    <Container sx={{ p: 5 }} maxWidth="xl">
                        <Typography variant="h4" sx={{
                            mb: 4,
                            fontWeight: 700,
                            marginTop: 2,
                        }}
                        >
                            ¡Bienvenid@ a tu perfil!
                        </Typography>

                        {edit ?
                            <Box sx={{}}>
                                <Grid spacing={2} rowSpacing={2} container>
                                    <Grid sm={4} item>
                                        <TextField
                                            fullWidth
                                            size="medium"
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
                                            size="medium"
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
                                            size="medium"
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
                                                    size="medium"
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
                                                    size="medium"
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
                                                    size="medium"
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
                                                    size="medium"
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
                                            size="medium"
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
                                            size="medium"
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
                                            size="medium"
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
                                            size="medium"
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
                            </Box>
                            :
                            <>
                                {form != null ?
                                    <>
                                        <Box sx={{ mt: 4, mb: 4, border: '1px solid #bebebe', borderRadius: 1, p: 5, display: 'flex', justifyContent: 'center' }}>
                                            <Grid container>
                                                <Grid sm={8} xs={10} item>
                                                    <List>
                                                        <ListItem variant="h5" component={Typography} sx={{ mb: 2, fontWeight: 700 }}>
                                                            <Typography variant="h5" sx={{ fontWeight: 700 }}>Datos personales</Typography>
                                                            <AccountCircleIcon sx={{ ml: 2, fontSize: 38 }} />
                                                        </ListItem>
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
                                                <Grid sm={4} xs={2} item>
                                                    <Button sx={{ mt: { xs: 2 } }} onClick={() => { setEdit(true) }}>
                                                        <EditIcon variant="contained" />
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Box>



                                        <Box sx={{ mt: 4, mb: 4, border: '1px solid #bebebe', borderRadius: 1, p: 5, display: 'flex', flexDirection: 'column' }}>
                                            <ListItem variant="h5" component={Typography} sx={{ mb: 2, fontWeight: 700 }}>
                                                <Typography variant="h5" sx={{ fontWeight: 700 }}>Pedidos</Typography>
                                                <ChecklistIcon sx={{ ml: 2, fontSize: 38 }} />
                                            </ListItem>
                                            {userOrders.length > 0 ? <PaginationOrder type={'user'} orders={userOrders}></PaginationOrder>
                                                :
                                                <Box sx={{ m: 10, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                                                    <Typography>Aún no tienes pedidos.</Typography>
                                                </Box>
                                            }


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