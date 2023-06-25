import { TextField, Box, Typography, Grid, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from "@mui/material";
import React, { useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';



const FormDelivery = ({ user, form, setForm , deliveryMethod, setDeliveryMethod}) => {
    const [edit, setEdit] = useState(false)
    console.log(form)

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
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
      
        if (!form.delivery || !form.name || !form.lastName || !form.address || !form.addressNumber || !form.region || !form.comuna || !form.cellNumber ) {
            console.log(form);
            alert("Datos incompletos");
            return;
        }

        setEdit(false)
      
        console.log(form);
      
        //handleReset();
      };

    return (
        <Box sx={{ m: 4, mb: 10 }}>

            <FormControl sx={{mt: 2}} component="fieldset">
                <FormLabel sx={{ fontWeight: 700, color: 'black' }} component="legend">Método de entrega</FormLabel>
                <RadioGroup
                    aria-label="delivery"
                    name="delivery"
                    value={deliveryMethod}
                    onChange={handleDeliveryMethodChange}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <FormControlLabel value="store-pickup" control={<Radio color="secondary" />} label="Retiro en tienda" />
                        <FormControlLabel value="delivery" control={<Radio color="secondary" />} label="Delivery" />
                    </Box>
                </RadioGroup>
            </FormControl>

            <Grid spacing={2} justifyContent={"space-between"} container>
                <Grid sm={6} item>
                    <Typography variant="h5" sx={{ mb: 2, mt: 4, fontWeight: 700 }}>Datos personales</Typography>
                    <Typography>Nombre: {user.name}</Typography>
                    <Typography>Apellido: {user.lastName}</Typography>
                    <Typography>Email: {user.email}</Typography>
                    <Typography>Celular: {user.cellNumber}</Typography>
                    <Typography>Dirección: {user.address}</Typography>
                    <Typography>Región: {user.region}</Typography>
                    <Typography>Comuna: {user.comuna}</Typography>

                </Grid>
                <Grid sm={6} item>
                    {deliveryMethod === 'store-pickup' ?
                        (<>
                            <Typography variant="h5" sx={{ mb: 2, mt: 4, fontWeight: 700 }}>Datos de retiro</Typography>
                            <Typography>Dirección: blahblah</Typography>
                            <Typography>Contacto: +569939333</Typography>
                        </>)

                        :
                        (<>
                            <Typography variant="h5" sx={{ mb: 2, mt: 4, fontWeight: 700 }}>Datos de entrega</Typography>
                            {edit ? (<form >
                                <Grid spacing={1} rowSpacing={2} container>
                                    <Grid sm={4} item>
                                        <TextField
                                            size="small"
                                            color="secondary"
                                            delivery="text"
                                            name="name"
                                            placeholder="Nombre"
                                            label="Nombre"
                                            onChange={handleChange}
                                            value={form.name}
                                        />
                                    </Grid>
                                    <Grid sm={4} item>
                                        <TextField
                                            size="small"
                                            color="secondary"
                                            delivery="text"
                                            name="lastName"
                                            placeholder="Apellido"
                                            label="Apellido"
                                            onChange={handleChange}
                                            value={form.lastName}
                                        />
                                    </Grid>
                                    <Grid sm={4} item>
                                        <TextField
                                            size="small"
                                            color="secondary"
                                            delivery="number"
                                            name="cellNumber"
                                            placeholder="Celular"
                                            label="Celular"
                                            onChange={handleChange}
                                            value={form.cellNumber}
                                        />
                                    </Grid>

                                    <Grid sm={12} item>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            color="secondary"
                                            delivery="text"
                                            name="address"
                                            placeholder="Direccion"
                                            label="Direccion"
                                            onChange={handleChange}
                                            value={form.address}
                                        />
                                    </Grid>
                                    <Grid sm={6} item>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            color="secondary"
                                            delivery="text"
                                            name="comuna"
                                            placeholder="Comuna"
                                            label="Comuna"
                                            onChange={handleChange}
                                            value={form.comuna}
                                        />
                                    </Grid>

                                    <Grid sm={6} item>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            color="secondary"
                                            delivery="text"
                                            name="region"
                                            placeholder="Región"
                                            label="Región"
                                            onChange={handleChange}
                                            value={form.region}
                                        />
                                    </Grid>

                                    <Grid sm={12} item>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            color="secondary"
                                            delivery="text"
                                            name="email"
                                            placeholder="Correo electrónico"
                                            label="Correo electrónico"
                                            onChange={handleChange}
                                            value={form.instructions}
                                        />
                                    </Grid>

                                    <Grid sm={12} item>
                                        <TextField
                                            fullWidth
                                            size="small"
                                            color="secondary"
                                            delivery="text"
                                            name="instructions"
                                            placeholder="Intrucciones de entrega"
                                            label="Intrucciones de entrega"
                                            onChange={handleChange}
                                            value={form.instructions}
                                        />
                                    </Grid>

                                </Grid>
                                <Box sx={{display:'flex', justifyContent:'right', pt: 1}}>
                                <Button onClick={handleSubmit}>
                                    <CheckIcon color="secondary"/>
                                </Button>
                                </Box>

                            </form>) :
                                (<Grid container>
                                    <Grid sm={10} item>
                                        <Typography>Nombre: {form.name}</Typography>
                                        <Typography>Apellido: {form.lastName}</Typography>
                                        <Typography>Celular: {form.cellNumber}</Typography>
                                        <Typography>Dirección: {form.address} {form.addressNumber}</Typography>
                                        <Typography>Región: {form.region}</Typography>
                                        <Typography>Comuna: {form.comuna}</Typography>
                                        {form.instructions ? <Typography>Instrucciones de entrega: {form.instructions}</Typography> : ''}
                                    </Grid>
                                    <Grid sm={2} item>
                                        <Button onClick={() => { setEdit(true) }}>
                                            <EditIcon variant="contained" color="secondary"/>
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