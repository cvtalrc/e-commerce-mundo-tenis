import { Button, Container, Grid, List, Typography, Box, ButtonGroup, Badge } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { shoppingInitialState, shoppingReducer } from "../../reducers/shoppingReducer";
import { TYPES } from "../../actions/shoppingActions";

export default function View({ product }) {
  const [itemCount, setItemCount] = useState(1);
  const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState)
  const {products, cart} = state

  // useEffect(() => {
  //   fetchProducts()
  //     .then(products => {
  //       dispatch({ type: TYPES.FETCH_PRODUCTS_SUCCESS, payload: products })
  //     })
  //     .catch(e => {
  //       dispatch({ type: TYPES.FETCH_PRODUCTS_FAILURE })
  //       console.log("error: ", e)
  //     })
  // }, [])

  // const addToCart = (_id) => {
  //   dispatch({ type: TYPES.ADD_TO_CART, payload: _id });
  //   console.log(_id)
  // };
  console.log(product)
  const priceSale = product.price - (product.price * (product.percentageSale / 100))

  return (
    <Container sx={{ pt: 10, pb: 10 }}>
      <Grid container >
        <Grid item md={6}>
          <img src={product.imgUrl}></img>
        </Grid>
        <Grid item md={6}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>{product.title}</Typography>
          <Typography variant="h6" sx={{ mb: 1 }} >{product.brand}</Typography>
          <Typography sx={{ mb: 2, textAlign: 'justify', color: 'gray' }}>{product.description}</Typography>
          {product.sale ? 
          (<Box sx={{ display: 'flex', justifyContent: 'left', mb: 4, mt: 3  }}>
          <Typography variant="h5" color="red" sx={{ fontWeight: '700', whiteSpace: 'nowrap' }} >$ {priceSale}</Typography>
          <Typography variant="h5" color="secondary" sx={{ fontWeight: '700', textDecoration: 'line-through', ml: 1 }}>$ {product.price} </Typography>
        </Box>)
          :
          (<Typography variant="h5" color="secondary" sx={{ mb: 4, mt: 3, fontWeight: 700 }} >$ {product.price}</Typography>)}
          
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
           
            <ButtonGroup>
              <Button
                onClick={() => {
                  setItemCount(Math.max(itemCount - 1, 0));
                }}
              >
                {" "}
                <RemoveIcon fontSize="small" />
              </Button>
              <Button size="large">{itemCount}</Button>
              <Button
                onClick={() => {
                  setItemCount(itemCount + 1);
                }}
              >
                {" "}
                <AddIcon fontSize="small" />
              </Button>
            </ButtonGroup>
            <Button onClick={() => {
              addToCart(product._id);
            }} 
            color="secondary" variant="outlined" sx={{width: { sm: '40%', xs: '100%'}, mt:4}}>
            <ShoppingCartIcon fontSize="small" sx={{mr: 2}} />
            Agregar al carro
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}