import { TextField, Box, Typography, Container, Button, Grid, FormControlLabel, Checkbox } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import UserContext from "../../context/UserContext";

// const initialForm = {
//     type: false, //delivery: true, retiro en tienda: false
//     adress: "",
//     numberAdress: "",
//     region: "",
//     comuna: "",
//     cellNumber: "",
//     rut: "",
//     email: "",
//     instructions: ""
// };


const FormDelivery = ({ user }) => {

    const initialForm = { //datos de envío
        type: "", //delivery, retiro
        name: user.name,
        lastName: user.lastname,
        address: user.address,
        addressNumber: "",
        region: "",
        comuna: "",
        cellNumber: user.cellnumber,
        email: user.email,
        instructions: ""
    };

    const [form, setForm] = useState(initialForm);
    const [edit, setEdit] = useState(false)

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
        setForm({
            ...form,
            sale: event.target.checked,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.type || !form.name || !form.lastName || !form.adress || !form.numberAdress || !form.region || !form.comuna || form.cellNumber || !form.email) {
            alert("Datos incompletos");
            return;
        }

        console.log(form);

        //handleReset();
    };

    const handleReset = (e) => {
        setForm(initialForm);
        setDataToEdit(null);
    };

    return (
        <Box sx={{ m: 5 }}>
            <Grid container>
                <Grid sm={6} item>
                    <Typography variant="h5" sx={{ mb: 4, mt: 4 }}>Datos de entrega</Typography>
                    <Box
                        sx={{
                            '& .MuiTextField-root': { width: '100%' }, width: '100%'
                        }}
                    >
                        <form >
                            <Grid spacing={1} container>
                                <Grid sm={4} item>
                                    <TextField
                                        color="secondary"
                                        type="text"
                                        name="name"
                                        placeholder="Nombre"
                                        label="Nombre"
                                        onChange={handleChange}
                                        value={form.name}
                                    />
                                </Grid>
                                <Grid sm={4} item>
                                    <TextField
                                        color="secondary"
                                        type="text"
                                        name="lastName"
                                        placeholder="Apellido"
                                        label="Apellido"
                                        onChange={handleChange}
                                        value={form.lastName}
                                    />
                                </Grid>
                                <Grid sm={4} item>
                                    <TextField
                                        color="secondary"
                                        type="number"
                                        name="cellNumber"
                                        placeholder="Celular"
                                        label="Celular"
                                        onChange={handleChange}
                                        value={form.cellNumber}
                                    />
                                </Grid>

                                <Grid sm={4} item>
                                    <TextField
                                        color="secondary"
                                        type="text"
                                        name="address"
                                        placeholder="Direccion"
                                        label="Direccion"
                                        onChange={handleChange}
                                        value={form.address}
                                    />
                                </Grid>
                                <Grid sm={2} item>
                                    <TextField
                                        color="secondary"
                                        type="number"
                                        name="addressNumber"
                                        placeholder="Número"
                                        label="Numero"
                                        onChange={handleChange}
                                        value={form.addressNumber}
                                    />
                                </Grid>

                                <Grid sm={4} item>
                                    <TextField
                                        color="secondary"
                                        type="text"
                                        name="region"
                                        placeholder="Region"
                                        label="Region"
                                        onChange={handleChange}
                                        value={form.region}
                                    />
                                </Grid>

                                <Grid sm={12} item>
                                    <TextField
                                        color="secondary"
                                        type="text"
                                        name="instructions"
                                        placeholder="Intrucciones de entrega"
                                        label="Intrucciones de entrega"
                                        onChange={handleChange}
                                        value={form.instructions}
                                    />
                                </Grid>

                                <Box sx={{ display: 'flex', justifyContent: 'right', mt: 2 }}>
                                    <Button color="secondary" variant="contained" sx={{ width: '200px', mr: 2 }} onClick={handleSubmit}>Enviar</Button>
                                    <Button color="secondary" variant="contained" sx={{ width: '200px' }} type="reset" onClick={handleReset}>Limpiar</Button>
                                </Box>
                            </Grid>

                        </form>
                    </Box>
                </Grid>
            </Grid>
        </Box >
    );
};

export default FormDelivery;