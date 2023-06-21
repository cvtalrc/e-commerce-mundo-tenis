import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductsContext from '../../context/ProductsContext';
import { Typography, Container, Box, Grid } from "@mui/material";
import PaginationCard from "../../components/Product/PaginationCard";
import Filter from '../../components/Product/Filter';

export default function Search() {
  const { productsSearch, search } = useContext(ProductsContext)
  const [dataFilter, setDataFilter] = useState([])
  const searchItem = search
  const brands = productsSearch != null ? [...new Set(productsSearch.map(objeto => objeto.brand))] : null

  return (
    <>
      {
        productsSearch != null && brands != null &&
        <>
          <Container maxWidth="xl" sx={{ mt: 2, mb: 2, p: 0 }} >
            <Typography variant="h4" sx={{ fontWeight: 700, mb: 5 }} >Resultados de la búsqueda "{searchItem}" </Typography>
            <Grid container>
              <Filter products={productsSearch} brands={brands} dataFilter={dataFilter} setDataFilter={setDataFilter} />

              <Grid md={9} sm={9} xs={12} sx={{ p: 1 }} item>
                <PaginationCard key={`sale`} products={productsSearch} type={`categories`} />
              </Grid>
            </Grid>
          </Container>
        </>
      }
    </>
  )
}