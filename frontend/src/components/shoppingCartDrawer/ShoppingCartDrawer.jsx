import { Box, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Collapse, Button, Grid } from "@mui/material";
import { ExpandLess, ExpandMore, ShoppingCart } from "@mui/icons-material"
import { useState, useReducer, useEffect } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink } from "react-router-dom";
import ProductItem from "../Product/ProductItem";
import { shoppingInitialState, shoppingReducer } from "../../reducers/shoppingReducer";
import { TYPES } from "../../actions/shoppingActions";
import CartItem from "../CartItem/CartItem";

const ShoppingCartDrawer = (SetOpenShoppingCart) => {
    const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState)
    const {products, cart} = state

    useEffect(() => {
        fetchProducts()
        .then(products => {
            dispatch({ type: TYPES.FETCH_PRODUCTS_SUCCESS, payload: products })
        })
        .catch(e => {
            dispatch({ type: TYPES.FETCH_PRODUCTS_FAILURE })
        })
    }, [])

    const delFromCart = (id, all = false) => {
            //console.log(id, all);
        if (all) {
        dispatch({ type: TYPES.REMOVE_ALL_FROM_CART, payload: id });
        } else {
        dispatch({ type: TYPES.REMOVE_ONE_FROM_CART, payload: id });
        }
    };
        
    const clearCart = () => {
        dispatch({ type: TYPES.CLEAR_CART });
    };

    // return (
    //     <Box sx={{ width: 450 }}>
    //         <List
    //             sx={{ width: '100%', maxWidth: 450, bgcolor: 'background.paper' }}
    //             component="nav"
    //             aria-labelledby="nested-list-subheader"
    //             subheader={
    //                 <ListSubheader component="div" id="nested-list-subheader">
    //                     ARTÍCULOS DEPORTIVOS
    //                 </ListSubheader>
    //             }
    //         >  
    //             <ul>
    //                 <Grid>
    //                     {products.map((product) => <ProductItem key={product._id} data={product} addToCart={addToCart}/>)}
    //                 </Grid>
    //             </ul>
    //                 {
    //                     cart.map(item => <CartItem key={item._id} data={item} addToCart={addToCart} delFromCart={delFromCart}/>)
    //                 }
                
    //         </List>

    //         <Box sx={{position: 'absolute', bottom: 0, width: '100%', paddingBottom: 1 }}>
    //             <Button
    //                 color="secondary"
    //                 variant="contained"
    //                 component={NavLink}
    //                 to="/order"
    //                 sx={{ display: "flex", alignItems: "center", margin: 1.5 }}
    //                 onClick={() => SetOpenShoppingCart(false)}
    //             >
    //                 Comprar
    //             </Button>
    //         </Box>


    //     </Box>

    // )
}

export default ShoppingCartDrawer