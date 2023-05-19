import React, { useState, useEffect } from "react";

const initailForm = {
    title: "",
    brand: "",
    price: null,
    description: "",
    sport: "",
    category: "",
    imgUrl: ""
};

const CrudForm = ({ createData, updateData, dataToEdit, setDataToEdit }) => {
    const [form, setForm] = useState(initailForm);

    useEffect(() => {
        if (dataToEdit) {
            setForm(dataToEdit);
        } else {
            setForm(initailForm);
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

        if (form.id === null) {
            createData(form);
        } else {
            updateData(form);
        }

        handleReset();
    };

    const handleReset = (e) => {
        setForm(initailForm);
        setDataToEdit(null);
    };

    return (
        <div>
            <h3>{dataToEdit ? "Editar" : "Agregar"}</h3>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="title"
                    placeholder="Nombre"
                    onChange={handleChange}
                    value={form.title}
                />
                <input
                    type="text"
                    name="brand"
                    placeholder="Marca"
                    onChange={handleChange}
                    value={form.brand}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Precio"
                    onChange={handleChange}
                    value={form.price}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Descripción"
                    onChange={handleChange}
                    value={form.description}
                />
                <input
                    type="text"
                    name="sport"
                    placeholder="Deporte"
                    onChange={handleChange}
                    value={form.sport}
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Categoría"
                    onChange={handleChange}
                    value={form.category}
                />
                <input type="submit" value="Enviar" />
                <input type="reset" value="Limpiar" onClick={handleReset} />
            </form>
        </div>
    );
};

export default CrudForm;