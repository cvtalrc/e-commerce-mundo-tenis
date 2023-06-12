import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import ProductsContext from '../../context/ProductsContext';
import { Typography, Container, Box, Grid } from "@mui/material";
import PaginationCard from "../../components/Product/PaginationCard";

export default function Search() {
    const {productsSearch, search} = useContext(ProductsContext)

  return (
    <>
      <Container sx={{ pt: 5, pb: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 5 }} >Resultados de la búsqueda "{search}" </Typography>
        <Grid container>
          <Grid md={3} sm={3} sx={{ p: 1 }} item>
            <Typography> Opciones para filtrar</Typography>
          </Grid>
          <Grid md={9} sm={9} xs={12} sx={{ p: 1 }} item>
            <PaginationCard key={`sale`} products={productsSearch} type={`categories`} />
          </Grid>
        </Grid>
      </Container>
    </>
  )
}