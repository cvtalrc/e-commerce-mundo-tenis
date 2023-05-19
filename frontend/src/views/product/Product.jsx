import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import View from "../../components/Product/View";
import './Product.css'

//realizar búsqueda a db del producto en específico 
export default function Product() {
    const { sport, category, id } = useParams();
    console.log(sport)
    console.log(category)
    console.log(id)

    return (
        <>
            {/* <Typography variant="h4">Deporte: {sport}</Typography>
            <Typography variant="h4">Categoría: {category}</Typography>
            <Typography variant="h4">id: {id}</Typography> */}
            <View id={id} ></View>
        </>
    )
}