import { Box, Typography, Container } from '@mui/material';
import { useParams } from 'react-router-dom';

export default function Sports() {
    const { id } = useParams();
    console.log(id);
    return (

        <Container sx={{width: 1300}}>
            <Typography variant="h3"> {id} </Typography>
        </Container>



    )
}