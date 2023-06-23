import { useContext, useEffect, useState } from "react";
import { Box, List, ListSubheader, Grid, Button, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { helpHttp } from "../../helpers/helpHttp";
import axios from 'axios'
import CartItem from "../CartItem/CartItem";
import CartContext from "../../context/CartContext";
import ProductsContext from "../../context/ProductsContext";

const ShoppingCart = (SetOpenShoppingCart) => {
  const { cartProducts, totalPrice } = useContext(CartContext); //items dentro del carro
  console.log("hola", cartProducts)
  const formattedPrice = totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return (<>
    {cartProducts != null &&
      <Box sx={{ width: 450, height: '87%' }}>
        <List
          sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper', overflow: 'auto', maxHeight: '100%' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              ARTÍCULOS DEPORTIVOS
            </ListSubheader>
          }
        >
          <Grid >
            {
              cartProducts.map((item, index) => (
                <CartItem key={index} data={item} id={true} />
              ))
            }
          </Grid>
        </List>
        <Box sx={{ position: 'absolute', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', bottom: 0, width: '100%', paddingBottom: 1, pt: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, pl: 40, fontSize: 15, flexGrow: 1 }}>Total: ${formattedPrice}</Typography>
          <Button
            color="secondary"
            variant="contained"
            component={NavLink}
            to="/order"
            sx={{ display: "flex",alignItems: "center", margin: 1.5, justifyContent: "center", width: '95%' }}
            onClick={() => SetOpenShoppingCart(false)}
          >
            Comprar
          </Button>
        </Box>
      </Box>

    }
  </>
  )
};

export default ShoppingCart;