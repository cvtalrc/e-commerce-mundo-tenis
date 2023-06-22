import { Typography, Container, Box, Grid, Pagination } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { helpHttp } from "../../helpers/helpHttp";
import PaginationCard from "../../components/Product/PaginationCard";
import ProductsContext from "../../context/ProductsContext";
import ImageSlider from "../../components/imageSlider/ImageSlider";
import yonex from "../../img/yonex.jpeg"
import dropShot from "../../img/drop-shot.jpeg"
import comfortPolyfibre from "../../img/comfort-polyfibre.jpeg"
import spinPolyfibre from "../../img/spin-polyfibre.jpeg"
import vcore from "../../img/vcore.webp"
import vcore7 from "../../img/vcore7.webp"

export default function Home() {
    const { products, productsSale, error, loading } = useContext(ProductsContext)

    const slides = [
        { url: vcore, title: "vcore" },
        { url: vcore7, title: "vcore7" },
        { url: yonex, title: "yonex" },
        { url: dropShot, title: "dropShot" },
        { url: comfortPolyfibre, title: "comfortPolyfibre" },
        { url: spinPolyfibre, title: "spinPolyfibre" }
    ];

    const containerStyles = {
        width: "100%",
        height: "420px",
        marginBottom: "48px",
        marginTop: "18px"
    };

    return (
        <>
            {/* mejorar loading y error */}
            {loading && <Box sx={{ display: 'flex', margin: 100 }}>
                <CircularProgress />
            </Box>}
            {error && (
                <Typography variant="h4">Error</Typography>
            )}
            {
                products &&
                <Box sx={{ mb: 1 }}>
                    <Container maxWidth="xl" sx={{ bgcolor: 'white', mt: 2,borderRadius: 1 }}>
                        <Box sx={containerStyles} >
                            <ImageSlider slides={slides} />
                        </Box>
                        <Box sx={{ backgroundColor: "secondary.main", color:'white', borderRadius: 1, justifyContent: 'center', display: 'flex', mb: 2 }}>
                            <Typography variant="body1" sx={{ fontWeight: 700, mt: 1, mb: 1 }}>OFERTAS</Typography>
                        </Box>

                        <PaginationCard key={`sale`} products={productsSale} type={`sale`} />

                        <Box sx={{ backgroundColor: "secondary.main", color:'white', borderRadius: 1, justifyContent: 'center', display: 'flex', mb: 2 }}>
                            <Typography variant="body1" sx={{ fontWeight: 700, mt: 1, mb: 1 }}>ARTÍCULOS DEPORTIVOS</Typography>
                        </Box>

                        <PaginationCard key={`normal`} products={products} type={`normal`} />
                    </Container>

                </Box>
            }
        </>
    )

}