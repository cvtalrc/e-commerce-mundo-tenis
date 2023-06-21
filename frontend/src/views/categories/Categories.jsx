import { Typography, Container, Box, Grid } from "@mui/material";
import { useAsyncError, useParams } from 'react-router-dom';
import PaginationCard from "../../components/Product/PaginationCard";
import ProductsContext from "../../context/ProductsContext";
import { useContext, useState, useEffect } from "react";
import Filter from "../../components/Product/Filter";

export default function Categories() {
    const { sport, category } = useParams();
    const { products } = useContext(ProductsContext)
    const [dataFilter, setDataFilter] = useState([])

    const productsCategory = products != null ? products.filter((productF) => (productF.category === category) && (productF.sport === sport)) : null

    const brands = productsCategory != null ? [...new Set(productsCategory.map(objeto => objeto.brand))] : null

    return (
        <>
            {
                products != null && brands != null && productsCategory !== null &&
                <>
                    <Container sx={{ mt: 2, mb: 2, p: 0 }}>
                        <Typography variant="h4" sx={{ fontWeight: 700, p: 0 }} >{category}</Typography>
                    </Container>
                    <Container sx={{ pt: 1, border: '1px solid #bebebe', mt: 2, mb: 2 }}>
                        <Grid container>
                            <Filter products={productsCategory} brands={brands} category={category} sport={sport} dataFilter={dataFilter} setDataFilter={setDataFilter} />
                            {dataFilter.length === 0 ?
                                (<Grid md={9} sm={9} xs={12} sx={{ pt: 1, pl: 1 }} item>
                                    <PaginationCard key={`sale`} products={productsCategory} type={`categories`} />
                                </Grid>) :
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