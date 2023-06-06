import { Typography, Container, Box, Grid, Pagination } from "@mui/material";
import Card from "../../components/Product/Card";
import { useEffect, useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import { helpHttp } from "../../helpers/helpHttp";
import PaginationCard from "../../components/Product/PaginationCard";

export default function Home() {

    const [products, setProducts] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    let [page, setPage] = useState(1);

    let api = helpHttp();
    let url = "http://localhost:3000/api/product"

    useEffect(() => {
        setLoading(true);
        api
            .get(url)
            .then((res) => {
                console.log(res);
                if (!res.err) {
                    setProducts(res);
                    setError(null);
                } else {
                    setProducts(null);
                    setError(res);
                }
                setLoading(false);
            });
    }, [url]);

    // const products = [
    //     {
    //         id: '0',
    //         title: 'Tarro PRINCE PADEL X3',
    //         brand: 'Prince',
    //         price: 4990,
    //         description: 'La pelota PRINCE PADEL tiene excelente calidad y consistencia. Su color amarillo óptico la hace ideal para el entrenamiento.',
    //         sport: 'Padel',
    //         category: 'Pelotas',
    //         imgUrl: 'https://locosporeltenis.cl/12168-thickbox_default/tarro-prince-padel-x3.jpg'

    //     },
    //     {
    //         id: '1',
    //         title: 'Polera Yonex 16623 Manga Larga Negra',
    //         brand: 'Yonex',
    //         price: 39990,
    //         description: 'Polera Yonex manga larga con excelente protección ultravioleta, de tejido elástico innovador que permite el movimiento libre que apoya su juego activo, y con fibras de carbono incorporadas que evitan las molestias de la electricidad estática.',
    //         sport: 'Tenis',
    //         category: 'Textiles',
    //         imgUrl: 'https://locosporeltenis.cl/13341-large_default/polera-yonex-16623-manga-larga-negra.jpg'

    //     },
    //     {
    //         id: '3',
    //         title: 'CASCADE DRIVE Rojo',
    //         brand: 'Yonex',
    //         price: 109990,
    //         description: 'La pelota PRINCE PADEL tiene excelente calidad y consistencia. Su color amarillo óptico la hace ideal para el entrenamiento.',
    //         sport: 'Tenis',
    //         category: 'Zapatillas',
    //         imgUrl: 'https://locosporeltenis.cl/10106-large_default/cascade-drive-rojo.jpg'

    //     },
    //     {
    //         id: '4',
    //         title: 'Buzo Completo ZERO',
    //         brand: 'Drop Shot',
    //         price: 119990,
    //         description: 'El nuevo Buzo  Drop Shot Zero 2021 ha sido confeccionado para dotar de comodidad y seguridad a los jugadores fuera de la pista.',
    //         sport: 'Padel',
    //         category: 'Textiles',
    //         imgUrl: 'https://locosporeltenis.cl/8818-thickbox_default/buzo-completo-zero-negro.jpg'

    //     },
    //     {
    //         id: '5',
    //         title: 'Pala TIGER 2.0 Junior',
    //         brand: 'Tiger',
    //         price: 79990,
    //         description: 'Evolución y comodidad para comenzar.',
    //         sport: 'Padel',
    //         category: 'Palas',
    //         imgUrl: 'https://locosporeltenis.cl/10710-thickbox_default/pala-tiger-20-junior.jpg'

    //     },
    //     {
    //         id: '6',
    //         title: 'VCORE 95 310g G3 Scarlet',
    //         brand: 'Yonex',
    //         price: 229990,
    //         description: 'La séptima generación de la VCORE es una obra maestra de tecnología y artesanía.La evolución de esta icónica raqueta combina un giro innegablemente preciso y un control notable, creando una verdadera obra de arte.',
    //         sport: 'Tenis',
    //         category: 'Raquetas',
    //         imgUrl: 'https://locosporeltenis.cl/12730-large_default/vcore-95-310g-g3-scarlet-2023.jpg'

    //     },
    //     {
    //         id: '7',
    //         title: 'Calcetines YONEX 19198 Quarter Surtidos',
    //         brand: 'Yonex',
    //         price: 14990,
    //         description: ' Los calcetines Quarter de Yonex vienen en un paquete de 3 pares con diferentes detalles estéticos. Tienen de tejido acolchado en las áreas que necesitan más acolchado y capas delgadas en las áreas que no lo necesitan. El material ayuda a expulsar el sudor para mantener los pies secos.',
    //         sport: 'Tenis',
    //         category: 'Textiles',
    //         imgUrl: 'https://locosporeltenis.cl/13339-large_default/calcetines-yonex-19198-quarter-surtidos.jpg'

    //     },
    //     {
    //         id: '8',
    //         title: 'POLY TOUR REV 1.30 / 16',
    //         brand: 'Yonex',
    //         price: 179990,
    //         description: ' Cuerda pensada para jugadores de fondo con velocidades de swing medias a rápidas que buscan una cuerda con forma que agarre la pelota para la mejor experiencia de spin. Mordida intensa y control de la tecnología SIF.  ',
    //         sport: 'Tenis',
    //         category: 'Cuerdas',
    //         imgUrl: 'https://locosporeltenis.cl/11979-large_default/poly-tour-rev-130-16-purpura-rollo.jpg'

    //     },
    // ]

    const productsSale = [
        {
            _id: '0',
            title: 'Tarro PRINCE PADEL X3',
            brand: 'Prince',
            price: 4990,
            description: 'La pelota PRINCE PADEL tiene excelente calidad y consistencia. Su color amarillo óptico la hace ideal para el entrenamiento.',
            stock: [
                {
                    size: '',
                    amount: '15'
                }
            ],
            sport: 'Padel',
            category: 'Pelotas',
            imgUrl: 'https://locosporeltenis.cl/12168-thickbox_default/tarro-prince-padel-x3.jpg',
            sale: 1,
            percentageSale: 30

        },
        {
            _id: '1',
            title: 'Polera Yonex 16623 Manga Larga Negra',
            brand: 'Yonex',
            price: 39990,
            description: 'Polera Yonex manga larga con excelente protección ultravioleta, de tejido elástico innovador que permite el movimiento libre que apoya su juego activo, y con fibras de carbono incorporadas que evitan las molestias de la electricidad estática.',
            sport: 'Tenis',
            stock: [
                {
                    size: 'S',
                    amount: '15'
                },
                {
                    size: 'M',
                    amount: '32'
                }
            ],
            category: 'Textiles',
            sale: 1,
            percentageSale: 20,
            imgUrl: 'https://locosporeltenis.cl/13341-large_default/polera-yonex-16623-manga-larga-negra.jpg'

        },
        {
            _id: '3',
            title: 'CASCADE DRIVE Rojo',
            brand: 'Yonex',
            price: 109990,
            description: 'La pelota PRINCE PADEL tiene excelente calidad y consistencia. Su color amarillo óptico la hace ideal para el entrenamiento.',
            sport: 'Tenis',
            stock: [
                {
                    size: '',
                    amount: '43'
                }
            ],
            sale: 0,
            percentageSale: '',
            category: 'Zapatillas',
            imgUrl: 'https://locosporeltenis.cl/10106-large_default/cascade-drive-rojo.jpg'

        },
        {
            _id: '4',
            title: 'Buzo Completo ZERO',
            brand: 'Drop Shot',
            price: 119990,
            description: 'El nuevo Buzo  Drop Shot Zero 2021 ha sido confeccionado para dotar de comodidad y seguridad a los jugadores fuera de la pista.',
            sport: 'Padel',
            stock: [
                {
                    size: 'S',
                    amount: '21'
                },
                {
                    size: 'M',
                    amount: '50'
                }
            ],
            sale: 0,
            percentageSale: '',
            category: 'Textiles',
            imgUrl: 'https://locosporeltenis.cl/8818-thickbox_default/buzo-completo-zero-negro.jpg'

        },
        {
            _id: '5',
            title: 'Pala TIGER 2.0 Junior',
            brand: 'Tiger',
            price: 79990,
            description: 'Evolución y comodidad para comenzar.',
            sport: 'Padel',
            stock: [
                {
                    size: '',
                    amount: '23'
                }
            ],
            category: 'Palas',
            sale: 1,
            percentageSale: 50,
            imgUrl: 'https://locosporeltenis.cl/10710-thickbox_default/pala-tiger-20-junior.jpg'

        },
        {
            _id: '6',
            title: 'VCORE 95 310g G3 Scarlet',
            brand: 'Yonex',
            price: 229990,
            description: 'La séptima generación de la VCORE es una obra maestra de tecnología y artesanía.La evolución de esta icónica raqueta combina un giro innegablemente preciso y un control notable, creando una verdadera obra de arte.',
            sport: 'Tenis',
            stock: [
                {
                    size: '',
                    amount: '10'
                }
            ],
            category: 'Raquetas',
            sale: 1,
            percentageSale: 10,
            imgUrl: 'https://locosporeltenis.cl/12730-large_default/vcore-95-310g-g3-scarlet-2023.jpg'

        },
        {
            _id: '7',
            title: 'Calcetines YONEX 19198 Quarter Surtidos',
            brand: 'Yonex',
            price: 14990,
            description: ' Los calcetines Quarter de Yonex vienen en un paquete de 3 pares con diferentes detalles estéticos. Tienen de tejido acolchado en las áreas que necesitan más acolchado y capas delgadas en las áreas que no lo necesitan. El material ayuda a expulsar el sudor para mantener los pies secos.',
            sport: 'Tenis',
            stock: [
                {
                    size: 'S',
                    amount: '10'
                },
                {
                    size: 'M',
                    amount: '12'
                },

                {
                    size: 'L',
                    amount: '20'
                }
            ],
            category: 'Textiles',
            sale: 1,
            percentageSale: 40,
            imgUrl: 'https://locosporeltenis.cl/13339-large_default/calcetines-yonex-19198-quarter-surtidos.jpg'

        },
        {
            _id: '8',
            title: 'POLY TOUR REV 1.30 / 16',
            brand: 'Yonex',
            price: 179990,
            description: ' Cuerda pensada para jugadores de fondo con velocidades de swing medias a rápidas que buscan una cuerda con forma que agarre la pelota para la mejor experiencia de spin. Mordida intensa y control de la tecnología SIF.  ',
            sport: 'Tenis',
            stock: [
                {
                    size: '',
                    amount: '28'
                }
            ],
            category: 'Cuerdas',
            sale: 0,
            percentageSale: '',
            imgUrl: 'https://locosporeltenis.cl/11979-large_default/poly-tour-rev-130-16-purpura-rollo.jpg'

        },
    ]


    return (

        <Container>
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
                    <Box sx={{backgroundColor: "#ebebed", borderRadius: 1}}>
                    <Typography variant="body1" sx={{fontWeight: 700, mt:2, mb: 2, p: 1}}>OFERTAS</Typography>
                    </Box>
                    <PaginationCard key={`sale`} products={productsSale} type={`sale`}/>
                    <Box sx={{backgroundColor: "#ebebed", borderRadius: 1}}>
                    <Typography variant="body1" sx={{fontWeight: 700, mb: 2, p: 1}}>ARTÍCULOS DEPORTIVOS</Typography>
                    </Box>
                    <PaginationCard key={`normal`} products={products} type={`normal`}/>
                    
                </Box>
            }
        </Container>
    )

}