import { Typography, Container, Box, Grid } from "@mui/material";
import mundotenis from '../../img/mundotenis.jpeg'

export default function AboutUs() {
    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 7, mb: 10, display: 'flex', justifyContent: 'center', flexDirection: 'column', alignContent: 'center', alignItems: 'center', border: '1px solid #bebebe', borderRadius: 1 }}>
                <Box component="img" alt="Imagen" src={mundotenis} sx={{ width:{sm : '55%', xs: '100%'}  , height: {sm : '350px', xs: '280px'}, mt: 5 }} />
                <Container maxWidth="lg" sx={{mb:15}}>
                    <Typography variant="h3" sx={{ fontWeight: 600, textAlign: 'center'}} >¡Bienvenido a Mundo Tenis CGA!</Typography>
                    <Typography variant="h6" sx={{ textAlign: 'justify', mt: 5 }}>Nos emociona poder ofrecerte una experiencia única en la compra de artículos deportivos de tenis y pádel. Nos apasiona ayudarte a alcanzar tu máximo potencial en la cancha, brindándote productos de alta calidad y un servicio excepcional.</Typography>
                    <Typography variant="h6" sx={{ textAlign: 'justify', mt: 2 }}>En primer lugar, ofrecemos una cuidadosa selección de marcas reconocidas en la industria. Hemos establecido alianzas estratégicas con los líderes de la industria, lo que nos permite ofrecerte productos de la más alta calidad y las últimas innovaciones. Desde raquetas y calzado hasta accesorios y ropa, encontrarás todo lo que necesitas para equiparte de la mejor manera posible.</Typography>
                    <Typography variant="h6" sx={{ textAlign: 'justify', mt: 2 }}>Pero eso no es todo. En Mundo Tenis CGA, también ofrecemos un servicio especializado de encordado de raquetas. Sabemos que la tensión adecuada y el cuidado de las cuerdas son fundamentales para el rendimiento de tu raqueta. Nuestro equipo de encordado altamente capacitado se encargará de asegurarse de que tus raquetas estén en las mejores condiciones para que puedas sacar el máximo provecho de cada golpe.</Typography>
                    <Typography variant="h6" sx={{ textAlign: 'justify', mt: 2 }}>No importa si eres un jugador principiante o un competidor experimentado, en Mundo Tenis CGA encontrarás una experiencia de compra excepcional. Nuestra pasión por el tenis y el pádel se refleja en cada detalle, desde la selección de productos hasta el servicio al cliente.</Typography>
                    <Typography variant="h6" sx={{ textAlign: 'justify', mt: 2 }}>Únete a nuestra comunidad de entusiastas del tenis y el pádel y descubre por qué somos la opción preferida de jugadores apasionados como tú. Estamos aquí para apoyarte en tu viaje hacia el éxito en la cancha.</Typography>
                </Container>
            </Container>

        </>
    )
}