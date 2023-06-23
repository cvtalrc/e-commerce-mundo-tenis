import { TextField, Box, Typography, Container, Button, Grid, FormControlLabel, Checkbox } from "@mui/material";
import React, { useState, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const initialForm = {
    _id: "",
    title: "",
    brand: "",
    price: "",
    description: "",
    stock: [],
    sport: "",
    category: "",
    imgUrl: "",
    sale: false,
    percentageSale: ""
};

const CrudForm = ({ createData, updateData, dataToEdit, setDataToEdit }) => {
    const [form, setForm] = useState(initialForm);
    const [newStockItem, setNewStockItem] = useState({ size: "", quantity: "" });
    const [isChecked, setIsChecked] = useState(initialForm.sale);

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

    const handleChangeStockItem = (event, index) => {
        console.log(e.target.value)
        const { name, value } = event.target;
        const updatedStock = [...form.stock];
        updatedStock[index][name] = value;

        setForm((prevForm) => ({
            ...prevForm,
            stock: updatedStock
        }));
    };

    const handleAddStockItem = () => {
        setForm((prevForm) => ({
            ...prevForm,
            stock: [...prevForm.stock, { ...newStockItem }]
        }));
        setNewStockItem({ size: "", quantity: "" });
    };

    const handleRemoveStockItem = (index) => {
        const updatedStock = form.stock.filter((item, itemIndex) => itemIndex !== index);

        setForm((prevForm) => ({
            ...prevForm,
            stock: updatedStock
        }));
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

        if (!form.title || !form.brand || !form.price || !form.description || !form.sport || !form.category || !form.imgUrl || form.stock.length < 1) {
            alert("Datos incompletos");
            return;
        }

        console.log(form);
        console.log(form._id);

        if (form._id === '') {
            delete formData._id;
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

    return (
        <div style={{ marginBottom: 30 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>{dataToEdit ? "Editar Producto" : "Agregar Producto"}</Typography>
            <Box
                sx={{
                    '& .MuiTextField-root': { width: '100%' }, width: '100%'
                }}
            >
                <form>
                    <Grid container spacing={1}>
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

                        <Grid sm={12} item>
                            <TextField
                                color="secondary"
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
                                color="secondary"
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
                                color="secondary"
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
                                color="secondary"
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
                                color="secondary"
                                type="text"
                                name="category"
                                placeholder="Categoría"
                                label="Categoría"
                                onChange={handleChange}
                                value={form.category}
                            />
                        </Grid>
                        {form.stock.length > 1 ?
                            (form.stock.map((item, index) => (
                                < React.Fragment key={index}>
                                    <Grid sm={5.5} item>
                                        <TextField
                                            color="secondary"
                                            type="text"
                                            name={`stock[${index}].size`}
                                            placeholder="Talla"
                                            label="Talla"
                                            onChange={(event) => handleChangeStockItem(event, index)}
                                            value={item.size}
                                        />
                                    </Grid>
                                    <Grid sm={5.5} item>
                                        <TextField
                                            color="secondary"
                                            type="number"
                                            name={`stock[${index}].quantity`}
                                            placeholder="Cantidad"
                                            label="Cantidad"
                                            onChange={(event) => handleChangeStockItem(event, index)}
                                            value={item.quantity}
                                        />
                                    </Grid>
                                    <Grid sm={1} item>
                                        <Button color="error" variant="outlined" sx={{ mr: 2, borderRadius: 1 }} fullWidth onClick={() => handleRemoveStockItem(index)}>
                                            <RemoveIcon sx={{ height: '42px' }} />
                                        </Button>
                                    </Grid>
                                </React.Fragment>
                            ))) : ((form.stock.map((item, index) => (
                                < React.Fragment key={index}>
                                    <Grid sm={6} item>
                                        <TextField
                                            color="secondary"
                                            type="text"
                                            name={`stock[${index}].size`}
                                            placeholder="Talla"
                                            label="Talla"
                                            onChange={(event) => handleChangeStockItem(event, index)}
                                            value={item.size}
                                        />
                                    </Grid>
                                    <Grid sm={6} item>
                                        <TextField
                                            color="secondary"
                                            type="number"
                                            name={`stock[${index}].quantity`}
                                            placeholder="Cantidad"
                                            label="Cantidad"
                                            onChange={(event) => handleChangeStockItem(event, index)}
                                            value={item.quantity}
                                        />
                                    </Grid>
                                </React.Fragment>
                            ))))}


                        <Grid sm={5.5} item>
                            <TextField
                                color="secondary"
                                type="text"
                                name="size"
                                placeholder="Talla"
                                label="Talla"
                                onChange={(event) => setNewStockItem({ ...newStockItem, size: event.target.value })}
                                value={newStockItem.size}
                            />
                        </Grid>
                        <Grid sm={5.5} item>
                            <TextField
                                color="secondary"
                                type="number"
                                name="quantity"
                                placeholder="Cantidad"
                                label="Cantidad"
                                onChange={(event) => setNewStockItem({ ...newStockItem, quantity: event.target.value })}
                                value={newStockItem.quantity}
                            />
                        </Grid>

                        <Grid sm={1} item>
                            <Button color="secondary" variant="outlined" sx={{ mr: 2, borderRadius: 1 }} fullWidth onClick={handleAddStockItem}>
                                <AddIcon sx={{ height: '42px' }} />
                            </Button>
                        </Grid>

                        <Grid sm={12} item>
                            <TextField
                                color="secondary"
                                type="text"
                                name="description"
                                placeholder="Descripción"
                                label="Descripción"
                                onChange={handleChange}
                                value={form.description}
                            />
                        </Grid>

                        <Grid sm={12} item>
                            <TextField
                                color="secondary"
                                type="text"
                                name="imgUrl"
                                placeholder="Imagen"
                                label="Imagen"
                                onChange={handleChange}
                                value={form.imgUrl}
                            />
                        </Grid>

                        <Grid sm={12} item>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={isChecked}
                                        onChange={handleCheckboxChange}
                                        name="sale"
                                        color="secondary"
                                    />
                                }
                                label="Añadir oferta"
                            />

                            {isChecked && (
                                <TextField
                                    sx={{ mt: 1.5 }}
                                    color="secondary"
                                    type="number"
                                    name="percentageSale"
                                    placeholder="Porcentaje de oferta"
                                    label="Porcentaje de oferta"
                                    onChange={handleChange}
                                    value={form.percentageSale}
                                />
                            )}
                        </Grid>


                    </Grid>
                    <Box sx={{ display: 'flex', justifyContent: 'right', mt: 2 }}>
                        <Button color="secondary" variant="contained" sx={{ width: '200px', mr: 2 }} onClick={handleSubmit}>Enviar</Button>
                        <Button color="secondary" variant="contained" sx={{ width: '200px' }} type="reset" onClick={handleReset}>Limpiar</Button>
                    </Box>

                </form>
            </Box>
        </div >
    );
};

export default CrudForm;