import { Box, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Collapse, Button } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material"
import { useState } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink } from "react-router-dom";
import ProductItem from "../Product/ProductItem";


export default function ShoppingCartDrawer(SetOpenShoppingCart) {
    return (
        <Box sx={{ width: 450 }}>
            <List
                sx={{ width: '100%', maxWidth: 450, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        ARTÍCULOS DEPORTIVOS
                    </ListSubheader>
                }
            >
                <ListItemButton>
                    {products.map((product) => <ProductItem key={product.id} data={product} addToCart={addToCart}/>)}
                </ListItemButton>
            </List>

            <Box sx={{position: 'absolute', bottom: 0, width: '100%', paddingBottom: 1 }}>
                <Button
                    color="secondary"
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