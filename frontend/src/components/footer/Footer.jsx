import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";

export default function Footer() {
    return (
        <Box
          component="footer"
          sx={{
            backgroundColor: '#454546',
            p: 6,
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={4}>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" sx={{fontWeight: 700, color:'white' }} gutterBottom>
                  Sobre nosotros
                </Typography>
                <Typography variant="body2" sx={{color:'white'}}>
                  Mundo Tenis CGA es una empresa dedicada a ofrecer productos deportivos de gran calidad. Si estás interesado 
                  en artículos de tenis o pádel, este es tu sitio.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" sx={{fontWeight: 700, color:'white'}} gutterBottom>
                  Contáctanos
                </Typography>
                <Typography variant="body2" sx={{color:'white'}}>
                  Correo: mundoteniscga@gmail.com
                </Typography>
                <Typography variant="body2" sx={{color:'white'}}>
                  Teléfono: +56952360764
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" sx={{fontWeight: 700 ,color:'white'}} color="text.primary" gutterBottom>
                  Síguenos
                </Typography>
                <Link href="https://www.facebook.com/encordadoscga/" 
                      color="inherit"
                      sx={{ pl: 1, pr: 1, color: 'white'}}
                >
                  <Facebook />
                </Link>
                <Link
                  href="https://www.instagram.com/encordados_cga/"
                  color="inherit"
                  sx={{ pl: 1, pr: 1, color: 'white' }}
                >
                  <Instagram />
                </Link>
              </Grid>
            </Grid>
            <Box mt={8}>
              <Typography variant="body2" align="center" sx={{color: 'white' }}>
                {"Copyright © "}
                <Link color="inherit" sx={{color: 'white' }} href="/">
                  Mundo Tenis CGA
                </Link>{" "}
                {new Date().getFullYear()}
                {"."}
              </Typography>
            </Box>
          </Container>
        </Box>
      );
}