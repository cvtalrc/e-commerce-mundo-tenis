import { TextField, Box, Typography, Container, Button, Grid, FormControlLabel, Checkbox, MenuItem } from "@mui/material";
import React, { useState, useEffect } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Modal } from "../Alerts/Modal";

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

function isValidTitle(title) {
    const regex = /^[A-Za-zÁ-ÿ\s]+$/;
    return regex.test(title);
}

function isValidBrand(brand) {
    const regex = /^[A-Za-zÁ-ÿ\s]+$/;
    return regex.test(brand);
}

function isValidPrice(price) {
    const regex = /^(?:(?:\d{1,3}(?:\.\d{3})*)|\d+)(?:,\d{1,2})?$/
    return regex.test(price)
}

const CrudForm = ({ createData, updateData, dataToEdit, setDataToEdit }) => {
    const [form, setForm] = useState(initialForm);
    const [newStockItem, setNewStockItem] = useState({ size: "", quantity: "" });
    const [isChecked, setIsChecked] = useState(initialForm.sale);
    const [validationErrors, setValidationErrors] = useState({})
    const [imageSelected, setImageSelected] = useState('');

    const uploadImage = async () => {

        const file = imageSelected;
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "j62vurvw");

        fetch(
            "https://api.cloudinary.com/v1_1/dhikzemgc/image/upload",
            {
                method: "POST",
                body: formData,
            }
        )
            .then((response) => response.json())
            .then((data) => {
                setImageSelected('');
                console.log(data)
                form.imgUrl = data.secure_url
                console.log(form)
                createData(form);

            })
            .catch((error) => {
                console.error(error);
                customAlert('Error', 'No se pudo cargar la imagen.', 'error');
                return false;
            })

    };

    const sports = ["Tenis", "Padel"];
    const categories = [
        ["Raquetas", "Cuerdas", "Pelotas", "Bolsos", "Zapatillas", "Textiles", "Accesorios"],
        ["Palas", "Pelotas", "Bolsos", "Zapatillas", "Textiles", "Accesorios"]
    ];

    categories.forEach((el) => {
        el.sort()
    })

    useEffect(() => {
        if (dataToEdit) {
            setForm(dataToEdit);
        } else {
            setForm(initialForm);
        }
    }, [dataToEdit]);

    const validateField = (fieldName, value) => {
        let isValid = true;

        if (!value.trim()) {
            isValid = false;
            setValidationErrors((prevState) => ({
                ...prevState,
                [fieldName]: 'Campo obligatorio',
            }));
        } else {
            if (fieldName === 'title') {
                isValid = isValidTitle(value);
            } else if (fieldName === 'brand') {
                isValid = isValidBrand(value);
            } else if (fieldName === 'price') {
                isValid = isValidPrice(value);
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
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setForm({
            ...form,
            [name]: value,
        });

        validateField(name, value);
    };

    const handleChangeStockItem = (event, index) => {
        console.log(event.target.value)
        const { name, value } = event.target;
        const updatedStock = [...form.stock];
        updatedStock[index][name] = value;

        setForm((prevForm) => ({
            ...prevForm,
            stock: updatedStock
        }));
    };

    const handleSportChange = (e) => {
        const { value } = e.target;
        const index = sports.indexOf(value);
        const categoryChosen = index >= 0 ? categories[index] : [];

        setForm((prevForm) => ({
            ...prevForm,
            sport: value,
            categories: categoryChosen[0] || ''
        }))
    }

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

        var allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;

        // console.log(form)
        // //console.log(imageSelected.name)

        console.log(validationErrors)
        console.log(imageSelected)

        console.log(form)

        if (!form.title) {
            console.log('error titulo')
            Modal(
                'Agregación de producto',
                'Los datos proporcionados no son suficientes o son incorrectos. Por favor, revísalos.',
                'error',
                ''
            )
            return;
        }
        if (!form.brand) {
            console.log('error marca')
            Modal(
                'Agregación de producto',
                'Los datos proporcionados no son suficientes o son incorrectos. Por favor, revísalos.',
                'error',
                ''
            )
            return;
        }
        if (!form.price) {
            console.log('error precio')
            Modal(
                'Agregación de producto',
                'Los datos proporcionados no son suficientes o son incorrectos. Por favor, revísalos.',
                'error',
                ''
            )
            return;
        }
        if (!form.description) {
            console.log('error descripcion')
            Modal(
                'Agregación de producto',
                'Los datos proporcionados no son suficientes o son incorrectos. Por favor, revísalos.',
                'error',
                ''
            )
            return;
        }
        if (!form.sport) {
            console.log('error deporte')
            Modal(
                'Agregación de producto',
                'Los datos proporcionados no son suficientes o son incorrectos. Por favor, revísalos.',
                'error',
                ''
            )
            return;
        }
        if (!form.category) {
            console.log('error categoria')
            Modal(
                'Agregación de producto',
                'Los datos proporcionados no son suficientes o son incorrectos. Por favor, revísalos.',
                'error',
                ''
            )
            return;
        }
        if (form.stock.length < 1) {
            console.log('error stock')
            Modal(
                'Agregación de producto',
                'Los datos proporcionados no son suficientes o son incorrectos. Por favor, revísalos.',
                'error',
                ''
            )
            return;
        }
        if (!allowedExtensions.exec(imageSelected.name)) {
            console.log('error img')
            Modal(
                'Agregación de producto',
                'Los datos proporcionados no son suficientes o son incorrectos. Por favor, revísalos.',
                'error',
                ''
            )
            return;
        } if (Object.keys(validationErrors).length > 0) {
            console.log('Existen errores de validación');
            Modal(
                'Agregación de producto',
                'Los datos proporcionados no son suficientes o son incorrectos. Por favor, revísalos.',
                'error',
                ''
            )
            return;
        }

        console.log(form);
        console.log(form._id);

        if (form._id === '') {
            delete form._id;
            uploadImage();
            console.log(form)
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
                                required
                                color="secondary"
                                type="text"
                                name="title"
                                placeholder="Nombre"
                                label="Nombre"
                                onChange={handleChange}
                                value={form.title}
                                error={validationErrors.title}
                                helperText={validationErrors.title}
                            />
                        </Grid>
                        <Grid sm={3} item>
                            <TextField
                                required
                                color="secondary"
                                type="text"
                                name="brand"
                                placeholder="Marca"
                                label="Marca"
                                onChange={handleChange}
                                value={form.brand}
                                error={validationErrors.brand}
                                helperText={validationErrors.brand || ''}
                            />
                        </Grid>
                        <Grid sm={3} item>
                            <TextField
                                required
                                color="secondary"
                                type="number"
                                name="price"
                                placeholder="Precio"
                                label="Precio"
                                onChange={handleChange}
                                value={form.price}
                                error={validationErrors.price}
                                helperText={validationErrors.price || ''}
                            />
                        </Grid>

                        <Grid sm={3} item>
                            <TextField
                                required
                                color="secondary"
                                type="text"
                                name="sport"
                                id="sport"
                                placeholder="Deporte"
                                label="Deporte"
                                select
                                onChange={handleSportChange}
                                value={form.sport}
                            >
                                {sports.map((sportName, index) => (
                                    <MenuItem key={index} value={sportName}>
                                        {sportName}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid sm={3} item>
                            <TextField
                                required
                                color="secondary"
                                type="text"
                                name="category"
                                id="category"
                                placeholder="Categoría"
                                label="Categoría"
                                select
                                onChange={handleChange}
                                value={form.category}
                            >
                                {(categories[sports.indexOf(form.sport)] || []).map((categoryName, index) => (
                                    <MenuItem key={index} value={categoryName}>
                                        {categoryName}
                                    </MenuItem>
                                ))}
                            </TextField>
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
                                            required
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
                                required
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
                                required
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
                            {/* <TextField
                                color="secondary"
                                type="text"
                                name="imgUrl"
                                placeholder="Imagen"
                                label="Imagen"
                                onChange={handleChange}
                                value={form.imgUrl}
                            /> */}

                            <TextField
                                required
                                type="file"
                                onChange={(event) => {
                                    setImageSelected(event.target.files[0]);
                                }}
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