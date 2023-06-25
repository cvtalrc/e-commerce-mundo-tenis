import { Grid, List, Box, ListItem, Container, Divider } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function OrderItem({ order, id }) {

  return (
    <List key={id} component={NavLink} sx={{ textDecoration: 'none', color: 'black' }}>
      <Box sx={{ padding: 3, textAlign: 'left', border: '1px solid #bebebe', borderRadius: 1 }}>
        <ListItem variant="body1" noWrap={true} sx={{ fontWeight: '700', mb: 1 }}>ID: 12334412</ListItem>
        <ListItem sx={{ mb: 1 }}>Nombre: Catalina Lorca</ListItem>
        <ListItem sx={{ mb: 1 }}>Tipo de Entrega: Retiro en Tienda</ListItem>
        <ListItem sx={{ mb: 1 }}>Producto/s:  </ListItem>
        <ListItem sx={{ mb: 1 }}>Estado: En curso</ListItem>
      </Box>


    </List>

  )
}