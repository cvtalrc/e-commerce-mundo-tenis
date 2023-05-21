import { TextField, Box, Typography, Container, Button, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";


const initialForm = {
    title: "",
    brand: "",
    price: "",
    description: "",
    sport: "",
    size: "",
    quantity: "",
    category: "",
    imgUrl: ""
};

const CrudForm = ({ createData, updateData, dataToEdit, setDataToEdit }) => {
    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        if (dataToEdit) {
            setForm(dataToEdit);
        } else {
            setForm(initialForm);
        }
    }, [dataToEdit]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.title || !form.brand || !form.price || !form.description || !form.sport || !form.category || !form.imgUrl) {
            alert("Datos incompletos");
            return;
        }

        console.log(form);
        console.log(form._id);

        if (form._id === undefined) {
            createData(form);
        } else {
            updateData(form);
        }

        handleReset();
    };

    const handleReset = (e) => {
        setForm(initialForm);
        setDataToEdit(null);
    };

    console.log(form.stock);

    return (
        <div style={{ marginBottom: 30 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>{dataToEdit ? "Editar Producto" : "Agregar Producto"}</Typography>
            <Box
                sx={{
                    '& .MuiTextField-root': { width: '100%' }, width: '100%'
                }}
            >
                <form>
                    <Grid container spacing={2}>
                        <Grid sm={12} item>
                            {dataToEdit ?
                                <TextField
                                    disabled
                                    type="text"
                                    name="_id"
                                    placeholder="ID"
                                    label="ID"
                                    onChange={handleChange}
                                    value={form._id}

                                />
                                : ""}
                        </Grid>

                        <Grid sm={6} item>
                            <TextField
                                type="text"
                                name="title"
                                placeholder="Nombre"
                                label="Nombre"
                                onChange={handleChange}
                                value={form.title}
                            />
                        </Grid>
                        <Grid sm={3} item>
                            <TextField
                                type="text"
                                name="brand"
                                placeholder="Marca"
                                label="Marca"
                                onChange={handleChange}
                                value={form.brand}
                            />
                        </Grid>
                        <Grid sm={3} item>
                            <TextField
                                type="number"
                                name="price"
                                placeholder="Precio"
                                label="Precio"
                                onChange={handleChange}
                                value={form.price}
                            />
                        </Grid>

                        <Grid sm={3} item>
                            <TextField
                                type="text"
                                name="size"
                                placeholder="Talla"
                                label="Talla"
                                onChange={handleChange}
                                value={form.size}
                            />
                        </Grid>
                        <Grid sm={3} item>
                            <TextField
                                type="number"
                                name="quantity"
                                placeholder="Cantidad"
                                onChange={handleChange}
                                value={form.quantity}
                            />
                        </Grid>

                        <Grid sm={3} item>
                            <TextField
                                type="text"
                                name="sport"
                                placeholder="Deporte"
                                label="Deporte"
                                onChange={handleChange}
                                value={form.sport}
                            />
                        </Grid>
                        <Grid sm={3} item>
                            <TextField
                                type="text"
                                name="category"
                                placeholder="Categoría"
                                label="Categoría"
                                onChange={handleChange}
                                value={form.category}
                            />
                        </Grid>
                        <Grid sm={12} item>
                            <TextField
                                type="text"
                                name="imgUrl"
                                placeholder="Imagen"
                                label="Imagen"
                                onChange={handleChange}
                                value={form.imgUrl}
                            />
                        </Grid>
                        <Grid sm={12} item>
                            <TextField
                                type="text"
                                name="description"
                                placeholder="Descripción"
                                label="Descripción"
                                onChange={handleChange}
                                value={form.description}
                            />
                        </Grid>
                        
                    </Grid>
                    <Box sx={{display:'flex', justifyContent: 'right', mt: 2}}>
                    <Button color="secondary" variant="outlined" sx={{ width: '200px', mr: 2 }} onClick={handleSubmit}>Agregar</Button>
                    <Button color="secondary"variant="outlined"  sx={{ width: '200px' }} type="reset" onClick={handleReset}>Limpiar</Button>
                    </Box>
                    
                </form>
            </Box>
        </div >
    );
};

export default CrudForm;