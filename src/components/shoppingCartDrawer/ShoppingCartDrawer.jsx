import { Box, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Collapse, Button } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material"
import { useState } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink } from "react-router-dom";


export default function ShoppingCartDrawer(SetOpenShoppingCart) {
    return (
        <Box sx={{ width: 250 }}>
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        MI CARRITO
                    </ListSubheader>
                }
            >
                <ListItemButton>
                    <ListItemText primary="Producto 1" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemText primary="Producto 2" />
                </ListItemButton>

            </List>

            <Box sx={{position: 'absolute', bottom: 0, width: '100%', paddingBottom: 1 }}>
                <Button
                    color="primary"
                    variant="contained"
                    component={NavLink}
                    to="/order"
                    sx={{ display: "flex", alignItems: "center", margin: 1.5 }}
                    onClick={() => SetOpenShoppingCart(false)}
                >
                    Comprar
                </Button>
            </Box>


        </Box>

    )
}