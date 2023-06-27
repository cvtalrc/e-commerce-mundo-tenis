import { useContext, useEffect, useState } from "react";
import { Box, List, ListSubheader, Grid, Button, Typography, Container, Icon } from "@mui/material";
import { NavLink } from "react-router-dom";
import { helpHttp } from "../../helpers/helpHttp";
import axios from 'axios'
import CartItem from "../CartItem/CartItem";
import CartContext from "../../context/CartContext";
import ProductsContext from "../../context/ProductsContext";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';

const ShoppingCart = (SetOpenShoppingCart) => {
  const { cartProducts, totalPrice } = useContext(CartContext); //items dentro del carro
  console.log("hola", cartProducts)

  return (<>
    {cartProducts != null &&
      <Box sx={{ width: 450, height: '87%', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
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
            {cartProducts.length > 0 ?
              cartProducts.map((item, index) => (
                <CartItem key={index} data={item} id={true} />
              ))
              :
              <Box sx={{display: 'flex', justifyContent:"center", flexDirection:'column', alignItems:"center", alignContent:"center", height: "800px"}}>
                <AddShoppingCartOutlinedIcon color="secondary" sx={{mt: 2, fontSize: 100, strokeWidth: 0.5}}/>

                <Typography variant="h6" color="secondary" sx={{fontWeight: 500, mt:2}}>Agrega productos a tu carrito</Typography>
              </Box>
              
            }

          </Grid>
        </List>
        <Box sx={{ mt: 'auto', ml: 2.5, mr: 2.5, mb: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'right' }}>
          {totalPrice != null && cartProducts.length > 0 ? (
            <>
                <Typography variant="body1" sx={{ mb: 2, mt:2, fontWeight: 700 }}>Total: ${totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Typography>
             
              <Button
                fullWidth
                color="secondary"
                variant="contained"
                component={NavLink}
                to="/order"
                sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                onClick={() => SetOpenShoppingCart(false)}
              >
                Comprar
              </Button>
            </>
          ) : ''
          }
        </Box>
      </Box>

    }
  </>
  )
};
export default ShoppingCart;