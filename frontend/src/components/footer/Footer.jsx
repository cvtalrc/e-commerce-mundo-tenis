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
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[300]
                : theme.palette.grey[900],
            p: 6,
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={5}>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                  Sobre nosotros
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Mundo Tenis CGA es una empresa dedicada a ofrecer productos deportivos de gran calidad. Si estás interesado 
                  en artículos de tenis o pádel, este es tu sitio.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                  Contáctanos
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  DIRECCION DE CONTACTO
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Correo: EMAIL@EMAIL.CL
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Teléfono: +569888888
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                  Síguenos
                </Typography>
                <Link href="https://www.facebook.com/" color="inherit">
                  <Facebook />
                </Link>
                <Link
                  href="https://www.instagram.com/encordados_cga/"
                  color="inherit"
                  sx={{ pl: 1, pr: 1 }}
                >
                  <Instagram />
                </Link>
                <Link href="https://www.twitter.com/" color="inherit">
                  <Twitter />
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Typography variant="body2" color="text.secondary" align="center">
                {"Copyright © "}
                <Link color="inherit" href="/">
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