import { Typography, Container, Box, Grid, Pagination } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { helpHttp } from "../../helpers/helpHttp";
import PaginationCard from "../../components/Product/PaginationCard";
import ProductsContext from "../../context/ProductsContext";

export default function Home() {
    const { products, productsSale, error, loading } = useContext(ProductsContext)

    return (
            <Container sx={{ border: '1px solid #bebebe', mb:2, mt:2}}>
                {/* mejorar loading y error */}
                {loading && <Box sx={{ display: 'flex', margin: 100 }}>
                    <CircularProgress />
                </Box>}
                {error && (
                    <Typography variant="h4">Error</Typography>
                )}
                {
                    products &&
                    <Box sx={{ mb: 4 }}>
                        {/* <Box sx={{ bgcolor: "#f6f5f2", height: '30vh', width: '100wh', marginBottom: ".5rem", display: 'flex', justifyContent: 'center' }}>
                        <Typography
                            color='inherit'
                            variant="h4"
                            sx={{ padding: 15 }}
                        ></Typography>
                    </Box> */}
                        <Box sx={{ backgroundColor: "#ebebed", borderRadius: 1 }}>
                            <Typography variant="body1" sx={{ fontWeight: 700, mt: 2, mb: 2, p: 1 }}>OFERTAS</Typography>
                        </Box>
                        <PaginationCard key={`sale`} products={productsSale} type={`sale`} />
                        <Box sx={{ backgroundColor: "#ebebed", borderRadius: 1 }}>
                            <Typography variant="body1" sx={{ fontWeight: 700, mb: 2, p: 1 }}>ARTÍCULOS DEPORTIVOS</Typography>
                        </Box>
                        <PaginationCard key={`normal`} products={products} type={`normal`} />

                    </Box>
                }
            </Container>
    )

}