import { Typography, Container, Box, Grid, Pagination, List, Rating } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { helpHttp } from "../../helpers/helpHttp";
import PaginationCard from "../../components/Product/PaginationCard";
import ProductsContext from "../../context/ProductsContext";
import ImageSlider from "../../components/imageSlider/ImageSlider";
import vcore from "../../img/vcore.webp"
import vcore7 from "../../img/vcore7.webp"
import vcoreYonex from "../../img/vcore-yonex.png"
import ezone from "../../img/ezone.png"
import ezone2 from "../../img/ezone2.jpeg"
import tienda from "../../img/tienda.png"
import wilson from "../../img/wilson.png"
import vcorePro from "../../img/vcore-pro.png"
import vcorePro2 from "../../img/vcore-pro2.jpeg"
import polyfibre from "../../img/polyfibre.png"
import palas from "../../img/palas.png"
import palas2 from "../../img/palas2.png"
import palas3 from "../../img/palas3.png"
import palas4 from "../../img/palas4.jpeg"
import { BASE_API_URL } from "../../../config";


export default function Home() {
    const { products, productsSale, error, loading } = useContext(ProductsContext)
    const [comments, setComments] = useState(null)

    console.log(comments)

    let api = helpHttp()
    let url = `${BASE_API_URL}/comment/`

    useEffect(() => {
        api
            .get(url)
            .then((res) => {
                if (!res.err) {
                    setComments(res.comments)
                    console.log(res)
                }
            })
            .catch(e => {
                console.error(e)
            })
    }, [])

    const slides = [
        { url: tienda, title: "tienda" },
        { url: vcore, title: "vcore" },
        // { url: vcore7, title: "vcore7" },
        { url: ezone, title: "ezone" },
        { url: wilson, title: "wilson" },
        { url: vcorePro2, title: "vcorePro2" },
        { url: palas, title: "palas" },
        { url: palas2, title: "palas2" },
        { url: palas3, title: "palas3" },
        { url: palas4, title: "palas4" }
    ];

    const containerStyles = {
        width: "100%",
        marginBottom: "48px",
        marginTop: "18px",
        height: {xs: "250px", sm: "500px"}, // Altura por defecto para dispositivos grandes
      };


    function convertToChileanTimeInWinter(dateString) {
        // Parsear la fecha en formato UTC
        const date = new Date(dateString);

        // Obtener la hora y el minuto en horario local
        const localHour = date.getHours();
        const localMinute = date.getMinutes();

        // Ajustar la hora según el horario chileno en invierno
        const chileanHour = localHour - 3; // Restar 3 horas

        // Construir la nueva fecha con la hora ajustada
        const chileanDate = new Date(date);
        chileanDate.setHours(chileanHour);
        chileanDate.setMinutes(localMinute);

        // Formatear la fecha en el formato deseado (por ejemplo, 'DD-MM-YYYY HH:mm:ss')
        const formattedDate1 = `${chileanDate.getDate().toString().padStart(2, '0')}-${(chileanDate.getMonth() + 1).toString().padStart(2, '0')}-${chileanDate.getFullYear()} ${chileanDate.getHours().toString().padStart(2, '0')}:${chileanDate.getMinutes().toString().padStart(2, '0')}:${chileanDate.getSeconds().toString().padStart(2, '0')}`;

        return formattedDate1;
    }

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
                products != null && comments != null &&
                (<Box sx={{ mb: 1 }}>
                    <Container maxWidth="xl" sx={{ bgcolor: 'white', mt: 2, borderRadius: 1 }}>
                        <Box sx={containerStyles}>
                            <ImageSlider slides={slides} />
                        </Box>
                        <Box sx={{ backgroundColor: "secondary.main", color: 'white', borderRadius: 1, justifyContent: 'center', display: 'flex', mb: 2 }}>
                            <Typography variant="body1" sx={{ fontWeight: 700, mt: 1, mb: 1 }}>OFERTAS</Typography>
                        </Box>

                        <PaginationCard key={`sale`} products={productsSale} type={`sale`} />

                        <Box sx={{ backgroundColor: "secondary.main", color: 'white', borderRadius: 1, justifyContent: 'center', display: 'flex', mb: 2 }}>
                            <Typography variant="body1" sx={{ fontWeight: 700, mt: 1, mb: 1 }}>ARTÍCULOS DEPORTIVOS</Typography>
                        </Box>

                        <PaginationCard key={`normal`} products={products} type={`normal`} />

                        <Box sx={{ backgroundColor: "secondary.main", color: 'white', borderRadius: 1, justifyContent: 'center', display: 'flex', mb: 2 }}>
                            <Typography variant="body1" sx={{ fontWeight: 700, mt: 1, mb: 1 }}>COMENTARIOS</Typography>
                        </Box>

                        
                            <Grid spacing={4} sx={{ display:'flex', flexDirection:'row', width: 'auto',  overflowX: 'auto' }} container>
                                {comments.map((comment) => (
                                    <Grid key={comment._id} item sm={2} xs={12} md={4}>
                                        <Box sx={{ display: 'flex', flexDirection: 'row', border: '1px solid #bebebe', borderRadius: 1, mb: 2 }}>
                                            <Box sx={{ display: 'flex', flexDirection: 'column', p: 2 }}>
                                                <Rating name="size-small" value={comment.Stars} readOnly sx={{ mb: 1 }} size="small" />
                                                <Typography variant="p" > {convertToChileanTimeInWinter(comment.createdAt)} </Typography>

                                                <Typography sx={{ mt: 1 }}> {comment.Author}:</Typography>
                                                <Typography > {comment.Content}</Typography>
                                            </Box>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                   


                    </Container>

                </Box>)
            }
        </>
    )

}