import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Typography, Box, CircularProgress } from '@mui/material'

export default function Payment() {
    const param = useLocation()
    const navigate = useNavigate();
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
                    const encodedData = encodeURIComponent(JSON.stringify(data));
                    localStorage.setItem('data', encodedData)
                    window.location.href = '/ticket';
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
    }, [param.search, navigate]);

    console.log("respuesta", response);

    if (!param.search) {
        return ('')
    }
    
    return (
        <Box sx={{ mt: 4, display: 'flex', flexDirection:'column',justifyContent: 'center', alignItems:'center', height: '400px' }}>
        <CircularProgress sx={{fontSize: 300}}color="secondary" />
        <Typography variant='h5' sx={{mt:5}}>Estamos procesando su pedido</Typography>
        </Box>
    )
}