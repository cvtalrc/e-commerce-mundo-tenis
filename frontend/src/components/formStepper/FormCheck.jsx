import { Box, Typography, Grid, List, ListItem } from "@mui/material";
import React, { useState } from "react";

const FormCheck = ({ cartProducts, totalPrice, form }) => {
    console.log(cartProducts)

    return (
        <Box sx={{ m: 4, mb: 10 }}>
            <Typography sx={{ fontWeight: 700, mb: 4 }}>REVISAR Y PAGAR</Typography>
            <Grid container>
                <Grid sm={6} item>
                    <Typography sx={{ fontWeight: 700 }}>Productos </Typography>
                    <List>
                        {cartProducts.map((product) => (
                            <ListItem key={product.TitleProduct}>{product.TitleProduct} x {product.Quantity} = ${product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</ListItem>
                        ))}
                    </List>
                    <Typography>Total: ${totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} </Typography>
                </Grid>

                <Grid sm={6} item>
                <Typography sx={{ fontWeight: 700 }}>Entrega </Typography>
                    <Typography>Tipo de Entrega: {form.delivery === 'store-pickup' ? 'Retiro en Tienda' : 'Delivery'}</Typography>
                    {form.delivery === 'store-pickup' ?
                        <>
                            <Typography>Datos de retiro: </Typography>
                            <Typography>Dirección: blahalbha </Typography>
                            <Typography>Contacto: blahblah </Typography>
                        </>
                        :
                        <>
                            <Typography>Datos de entrega: </Typography>
                            <Typography>Nombre: {form.name}</Typography>
                            <Typography>Apellido: {form.lastName}</Typography>
                            <Typography>Celular: {form.cellNumber}</Typography>
                            <Typography>Dirección: {form.address} {form.addressNumber}</Typography>
                            <Typography>Región: {form.region}</Typography>
                            <Typography>Comuna: {form.comuna}</Typography>
                            {form.instructions ? <Typography>Instrucciones de entrega: {form.instructions}</Typography> : ''
                            }
                        </>

                    }

                </Grid>
            </Grid>

        </Box>
    );
};

export default FormCheck;