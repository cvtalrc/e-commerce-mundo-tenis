import { useContext, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import ProductsContext from '../../context/ProductsContext';
import { Typography, Container, Box, Grid, Stack, Breadcrumbs } from "@mui/material";
import PaginationCard from "../../components/Product/PaginationCard";
import Filter from '../../components/Product/Filter';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function Sports() {
  const { sport } = useParams();
  console.log(sport)
  const { products } = useContext(ProductsContext)
  console.log(products)
  const [dataFilter, setDataFilter] = useState([])

  const productsSport = products != null ? products.filter((productF) => productF.sport === sport) : null

  const brands = productsSport != null ? [...new Set(productsSport.map(objeto => objeto.brand))] : null

  return (
    <>
      {products != null &&
        <>
          <Container maxWidth="xl" sx={{ pt: 1, mt: 2, mb: 2, p:5 }}>
            <Stack spacing={2}>
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
              >
                <Typography key="1" color="inherit" to="/" component={NavLink} sx={{ fontSize: 18 }}>
                  Inicio
                </Typography>,
                <Typography key="3" sx={{ fontSize: 18 }} color="black">
                  {sport}
                </Typography>,
              </Breadcrumbs>
            </Stack>
            <Grid sx={{mt:5}}container>
              <Filter products={productsSport} brands={brands} dataFilter={dataFilter} setDataFilter={setDataFilter} />
              {dataFilter.length === 0 ?
                <Grid md={10} sm={10} xs={12} sx={{ pt: 1, pl: 1 }} item>
                  <PaginationCard key={`sale`} products={productsSport} type={`categories`} />
                </Grid> :
                (<Grid md={10} sm={10} xs={12} sx={{ pt: 1, pl: 1 }} item>
                  <PaginationCard key={`sale`} products={dataFilter} type={`categories`} />
                </Grid>)
              }
            </Grid>
          </Container>
        </>
      }
    </>
  )
}