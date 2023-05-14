import { Typography } from "@mui/material";
import { useParams } from 'react-router-dom';

export default function Categories() {
    const { category } = useParams();
    return (
        <>
           <Typography variant="h3">{category}</Typography>
        </>
    )
}