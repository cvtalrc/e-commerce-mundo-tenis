import { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductsContext from '../../context/ProductsContext';
import { Typography, Container, Box, Grid } from "@mui/material";
import PaginationCard from "../../components/Product/PaginationCard";
import Filter from '../../components/Product/Filter';

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
          <Container sx={{ mt: 2, mb: 2, p:0 }}>
            <Typography variant="h4" sx={{ fontWeight: 700, p:0}} >{sport}</Typography>
          </Container>
          <Container sx={{ pt: 1, border: '1px solid #bebebe', mt: 2, mb: 2 }}>
            <Grid container>
              <Filter products={productsSport} brands={brands} dataFilter={dataFilter} setDataFilter={setDataFilter} />
              {dataFilter.length === 0 ?
                <Grid md={9} sm={9} xs={12} sx={{ pt: 1, pl: 1 }} item>
                  <PaginationCard key={`sale`} products={productsSport} type={`categories`} />
                </Grid> :
                (<Grid md={9} sm={9} xs={12} sx={{ pt: 1, pl: 1 }} item>
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