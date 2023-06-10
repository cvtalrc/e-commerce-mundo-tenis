// import {  Typography } from "@mui/material";


// export default function ShoppingCart(props) {
//   return (

//     <Typography> Resumen </Typography>

//   )
// }

import React, { useReducer } from 'react'
import { shoppingInitialState, shoppingReducer } from '../../reducers/shoppingReducer'

const ShoppingCart = () => {
  const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState)
  const {products, cart} = state

  const addToCart = () => {}
  const delFromCart = () => {}
  const clearCart = () => {}

  return (
    <div>
    <h2>Carrito de compras</h2>
    </div>
  )
}

export default ShoppingCart