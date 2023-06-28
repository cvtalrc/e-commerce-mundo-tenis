import { Box, Typography, Grid, List, ListItem } from "@mui/material";
import React, { useState } from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StoreIcon from '@mui/icons-material/Store';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';

const FormCheck = ({ cartProducts, totalPrice, form }) => {
    console.log(cartProducts)

    return (
        <Box sx={{ mt: 4, mb: 4, border: '1px solid #bebebe', borderRadius: 1, p: 5 }}>
            <Grid container>
                <Grid sm={6} item>
                    <ListItem variant="h5" component={Typography} sx={{ mt: 1, fontWeight: 700 }}>
                        <Typography variant="h5" sx={{ mt: 1, fontWeight: 700 }}>Productos</Typography>
                        <LocalMallOutlinedIcon sx={{ ml: 2, fontSize: 40 }} />
                    </ListItem>

                    <List>
                        {cartProducts.map((product) => (
                            <ListItem>
                                <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                                <Typography variant="h6" sx={{ ml: 2, fontSize: 18 }} >{product.TitleProduct} x {product.Quantity} = ${product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Typography>
                            </ListItem>

                        ))}

                        <ListItem>
                            <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                            <Typography variant="h6" sx={{ ml: 2, fontSize: 18, fontWeight: 700 }} >Total: ${totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Typography>
                        </ListItem>
                    </List>

                </Grid>

                <Grid sm={6} item>
                    {form.delivery === 'store-pickup' ?
                        <>
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
                                <Typography variant="h6" sx={{ ml: 2, fontSize: 18 }} >Región: Metropolitana </Typography>
                            </ListItem>
                            <ListItem>
                                <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                                <Typography variant="h6" sx={{ ml: 2, fontSize: 18 }} >Comuna: San Miguel </Typography>
                            </ListItem>
                            <ListItem>
                                <ArrowForwardIosIcon sx={{ fontSize: 10 }} />
                                <Typography variant="h6" sx={{ ml: 2, fontSize: 18 }} >Contacto: +56952360764  </Typography>
                            </ListItem>

                        </>
                        :
                        <>
                            <ListItem variant="h5" component={Typography} sx={{ mt: 1, fontWeight: 700 }}>
                                <Typography variant="h5" sx={{ mt: 1, fontWeight: 700 }}>Datos de Entrega</Typography>
                                <DeliveryDiningOutlinedIcon sx={{ ml: 2, fontSize: 40 }} />
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

                        </>

                    }

                </Grid>
            </Grid>
        </Box>
    );
};

export default FormCheck;