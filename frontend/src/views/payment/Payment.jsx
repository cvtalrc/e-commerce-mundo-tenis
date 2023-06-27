import React, { useState, useCallback, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { helpHttp } from '../../helpers/helpHttp'
import { Typography, Grid, Container, Box } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function Payment() {
    const param = useLocation()
    console.log(param)
    console.log(param.search)
    // const { token_ws } = param
    // console.log(param.search);

    // const [response, setResponse] = useState({})
    // const api = helpHttp()
    // let url = `http://localhost:3000/api/verify-payment${param.search}`
    // console.log(url)

    // useEffect(() => {
    //     if (param.search) {
    //         api.get(url)
    //             .then(async (res) => {
    //                 console.log("respuesta de compra", res);
    //                 setResponse(res) //retorna 3
    //             })
    //             .catch((err) => {
    //                 console.err('Error Fatal: ', err)
    //             })
    //     }
    // }, [])

    const [response, setResponse] = useState({});
    const url = `http://localhost:3000/api/verify-payment${param.search}`;
    console.log(url);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(url);
                if (res.ok) {
                    const data = await res.json();
                    console.log("respuesta de compra", data);
                    setResponse(data);
                } else {
                    console.error("Error en la respuesta de la petición");
                }
            } catch (error) {
                console.error("Error fatal: ", error);
            }
        };

        if (param.search) {
            fetchData();
        }
    }, []);

    console.log("respuesta", response);

    if (!param.search) {
        return (
            <>
                <Container maxWidth='xl'>
                    <Typography variant="h4" sx={{
                        mb: 4,
                        fontWeight: 700,
                        marginTop: 6,
                    }}
                    >
                        {/* <svg data-testid="CheckCircleOutlineIcon" color='success'></svg> */}
                        Orden de compra {response.detailsPayment.Details.status}
                    </Typography>
                    <Grid spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} direction="column" justifyContent="center" alignItems="center" container>
                        <Grid item xs={2} sm={4} md={4}>
                            <Typography variant='h6' sx={{
                                margin: 2,
                                fontWeight: 500,
                                padding: 2
                            }}>
                                Número de orden: {response.detailsPayment.Details.buy_order}
                            </Typography>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4}>
                            <Typography variant='h6' sx={{
                                margin: 2,
                                fontWeight: 500,
                                padding: 2
                            }}>
                                Estado de la compra: {response.order.Status}
                            </Typography>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4}>
                            <Typography variant='h6' sx={{
                                margin: 2,
                                fontWeight: 500,
                                padding: 2
                            }}>
                                Tienda: Mundo Tenis CGA
                            </Typography>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4}>
                            <Typography variant='h6' sx={{
                                margin: 2,
                                fontWeight: 500,
                                padding: 2
                            }}>

                                Datos de tarjeta de pago: **** **** **** {response.detailsPayment.Details.card_detail.card_number}
                            </Typography>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4}>
                            <Typography variant='h6' sx={{
                                margin: 2,
                                fontWeight: 500,
                                padding: 2
                            }}>
                                Cantidad de artículos: {response.order.Cart[1].Products.length}
                            </Typography>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4}>
                            <Typography variant='h6' sx={{
                                margin: 2,
                                fontWeight: 500,
                                padding: 2
                            }}>
                                Total de la compra: {response.detailsPayment.Details.amount}
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
                {/* // <Container maxWidth='xl'>
            //     <Grid container>
            //         <Grid item sm={4} sx={{ border: 'line' }}>
            //             <Typography>
            //                 Lo sentimos, el token de compra no es valido o no se ha proporcionado
            //             </Typography>
            //         </Grid>
            //         <Grid item sm={4} sx={{ border: 'line' }}>
            //             <Typography>
            //                 Lo sentimos, el token de compra no es valido o no se ha proporcionado
            //             </Typography>
            //         </Grid>
            //         <Grid item sm={4} sx={{ border: 'line' }}>
            //             <Typography>
            //                 Lo sentimos, el token de compra no es valido o no se ha proporcionado
            //             </Typography>
            //         </Grid>

            //     </Grid>
            // </Container> */}
            </>
        )
    }
    
    return (
        <>
            {Object.keys(response).length > 0 && (
                <Container maxWidth='xl'>
                    <Box sx={{mt: 4, display:'flex', justifyContent:'center'}}>
                        <CheckCircleOutlineIcon color='success' sx={{fontSize: 100, strokeWidth: 0.5}}/>
                    </Box>

                    <Typography variant="h4" sx={{
                        mb: 4,
                        fontWeight: 700,
                        marginTop: 6,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    >
                        
                        Orden de compra {response.detailsPayment.Details.status === 'AUTHORIZED' ? 'autorizada' : ''}
                    </Typography>
                    <Grid spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} direction="column" justifyContent="center" alignItems="center" container>
                        <Grid item xs={2} sm={4} md={4}>
                            <Typography variant='h6' sx={{
                                margin: 2,
                                fontWeight: 500,
                                padding: 2
                            }}>
                                Número de orden: {response.detailsPayment.Details.buy_order}
                            </Typography>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4}>
                            <Typography variant='h6' sx={{
                                margin: 2,
                                fontWeight: 500,
                                padding: 2
                            }}>
                                Estado de la compra: {response.order.Status}
                            </Typography>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4}>
                            <Typography variant='h6' sx={{
                                margin: 2,
                                fontWeight: 500,
                                padding: 2
                            }}>
                                Tienda: Mundo Tenis CGA
                            </Typography>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4}>
                            <Typography variant='h6' sx={{
                                margin: 2,
                                fontWeight: 500,
                                padding: 2
                            }}>

                                Datos de tarjeta de pago: **** **** **** {response.detailsPayment.Details.card_detail.card_number}
                            </Typography>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4}>
                            <Typography variant='h6' sx={{
                                margin: 2,
                                fontWeight: 500,
                                padding: 2
                            }}>
                                Cantidad de artículos: {response.order.Cart[1].Products.length}
                            </Typography>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4}>
                            <Typography variant='h6' sx={{
                                margin: 2,
                                fontWeight: 500,
                                padding: 2
                            }}>
                                Total de la compra: {response.detailsPayment.Details.amount}
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            )}
        </>
    )
}