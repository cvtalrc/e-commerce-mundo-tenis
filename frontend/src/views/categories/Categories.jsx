import { Typography, Container, Grid, Stack, Breadcrumbs } from "@mui/material";
import { NavLink, useParams } from 'react-router-dom';
import PaginationCard from "../../components/Product/PaginationCard";
import ProductsContext from "../../context/ProductsContext";
import { useContext, useState, } from "react";
import Filter from "../../components/Product/Filter";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

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
                    <Container maxWidth="xl" sx={{ pt: 1, mt: 2, mb: 2, p: 4 }}>
                        <Stack spacing={2}>
                            <Breadcrumbs
                                separator={<NavigateNextIcon fontSize="small" />}
                                aria-label="breadcrumb"
                            >
                                <Typography key="1" color="inherit" to="/" component={NavLink} sx={{ fontSize: 18 }}>
                                    Inicio
                                </Typography>,
                                <Typography
                                    component={NavLink}
                                    sx={{ fontSize: 18 }}
                                    underline="hover"
                                    key="2"
                                    color="inherit"
                                    to={`/${sport}`}
                                >
                                    {sport}
                                </Typography>,
                                <Typography key="3" sx={{ fontSize: 18 }} color="black">
                                    {category}
                                </Typography>,
                            </Breadcrumbs>
                        </Stack>

                        <Grid sx={{ mt: 5 }} container>
                            <Filter products={productsCategory} brands={brands} category={category} sport={sport} dataFilter={dataFilter} setDataFilter={setDataFilter} />
                            {dataFilter.length === 0 ?
                                (<Grid md={10} sm={10} xs={12} sx={{ pt: 1, pl: 1 }} item>
                                    <PaginationCard key={`sale`} products={productsCategory} type={`categories`} />
                                </Grid>) :
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