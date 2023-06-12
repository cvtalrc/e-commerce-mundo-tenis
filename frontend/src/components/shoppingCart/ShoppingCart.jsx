import { useEffect, useState } from "react";
import { Box, List, ListSubheader, Grid, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { helpHttp } from "../../helpers/helpHttp";
import axios from 'axios'
import CartItem from "../CartItem/CartItem";

const ShoppingCart = (SetOpenShoppingCart) => {
  const [cart, setCart] = useState(null)
  
  let api = helpHttp();
  let user = `felipegutierrez@gmail.com`;
  let url = `http://localhost:3000/api/cart/${user}` //para ver contenido del carro

  useEffect(() => {
    api
      .get(url)
      .then((res) => {
        //console.log(res);
        if (!res.err) {
          setCart(res.data.items);
        } else {
          console.error(res);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  // const delFromCart = (id, all = false) => {
  //   console.log(id, all);
  //   if (all) {
  //     //dispatch({ type: TYPES.REMOVE_ALL_FROM_CART, payload: id });
  //   } else {
  //     //dispatch({ type: TYPES.REMOVE_ONE_FROM_CART, payload: id });
  //   }
  // };

  // const clearCart = () => {
  //   //dispatch({ type: TYPES.CLEAR_CART });
  // };

  // return (
  //   <div>
  //     <h2>Carrito de Compras</h2>
  //     <h3>Productos</h3>
  //     <article className="box grid-responsive">
  //       {products.map((product) => (
  //         <ProductItem key={product.id} data={product} addToCart={addToCart} />
  //       ))}
  //     </article>
  //     <h3>Carrito</h3>
  //     <article className="box">
  //       <button onClick={clearCart}>Limpiar Carrito</button>
  //       {cart.map((item, index) => (
  //         <CartItem key={index} data={item} delFromCart={delFromCart} />
  //       ))}
  //     </article>
  //   </div>
  // );

  return (<>
  { cart && 
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
              <Grid >
              {
                // console.log("carrito", cart) 
                cart.map((item, index) => (
                <CartItem key={index} data={item}  />
              ))
              }
              {/* <button onClick={clearCart}>Limpiar Carrito</button> */}
            </Grid>
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
    
  }
  </>
  )
};

export default ShoppingCart;