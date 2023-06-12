import { Typography, Container, Box, Grid } from "@mui/material";
import { useParams } from 'react-router-dom';
import PaginationCard from "../../components/Product/PaginationCard";
import ProductsContext from "../../context/ProductsContext";
import { useContext } from "react";

export default function Categories() {
    const { sport, category } = useParams();
    const { products } = useContext(ProductsContext)
    const productsCategory = products.filter((productF) => (productF.category === category) && (productF.sport === sport));
    
    return (
        <>
            <Container sx={{ pt: 5, pb: 5 }}>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 5 }} >{category}</Typography>
                <Grid container>
                    <Grid md={3} sm={3} sx={{p: 1}} item>
                        <Typography> Opciones para filtrar</Typography>
                    </Grid>
                    <Grid md={9} sm={9} xs={12} sx={{p: 1}} item>
                        <PaginationCard key={`sale`} products={productsCategory} type={`categories`} />
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}