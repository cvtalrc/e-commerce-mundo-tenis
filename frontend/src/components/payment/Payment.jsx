import React, { useState, useCallback, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { helpHttp } from '../../helpers/helpHttp'
import { Typography, Grid, Container, Box, CircularProgress } from '@mui/material'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { BASE_API_URL } from '../../../config';

export default function Payment() {
    const param = useLocation()
    const navigate = useNavigate();
    const [response, setResponse] = useState({});

    const url = `${BASE_API_URL}/verify-payment${param.search}`;
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
                    //window.location.href = '/ticket';
                    navigate("/ticket")
                } else {
                    console.error("Error en la respuesta de la petición");
                    navigate("/ticket-error")
                    //window.location.href = "/ticket-error"; 
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