import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { helpHttp } from "../../helpers/helpHttp";
import { useContext, useEffect, useState } from "react";
import ProductsContext from "../../context/ProductsContext";
import CartContext from "../../context/CartContext";

const CartItem = ({ data }) => {
  let { _id, TitleProduct, price, Quantity, Size, imgUrl } = data;
  const { products } = useContext(ProductsContext);
  //const { delFromCart } = useContext(CartContext);
  let productImgUrl = ""
  const foundedProduct = products != null ? products.filter((productF) => (productF.title === TitleProduct)) : 0;
  console.log("producto", foundedProduct);
  let formattedPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  let totalPrice = price * Quantity
  let formattedTotalPrice = totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  foundedProduct.forEach((product) => {
    if ('imgUrl' in product) {
      productImgUrl = product.imgUrl;
      console.log("imgUrl", productImgUrl);
    }
  });

  return (
    <>
      {products != null &&
        <div style={{ borderBottom: "thin solid gray" }}>
          <Container sx={{ pt: 4, pb: 4 }}>
            <Grid container>
              <Grid item md={3}>
                <img src={productImgUrl} />
              </Grid>
              <Grid item md={6}>
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 1, fontSize: 15, pl: 2 }}>{TitleProduct}</Typography>
                <Typography variant="h5" sx={{ fontWeight: 500, mb: 1, fontSize: 12, pl: 2 }}>${formattedPrice} x {Quantity} = ${formattedTotalPrice}</Typography>
                {Size && (
                  <Typography variant="h5" sx={{ fontWeight: 500, mb: 1, fontSize: 12, pl: 2 }}>Talla: {Size}</Typography>
                )}
              </Grid>
              {/* <Grid item md={3}>
          <Button onClick={delFromCart(TitleProduct, Size, Quantity)}>
            
            Eliminar
          </Button>
        </Grid> */}
            </Grid>
          </Container>


          {/* <button onClick={() => delFromCart(_id)}>Eliminar Uno</button>
      <br />
      <button onClick={() => delFromCart(_id, true)}>Eliminar Todos</button>
      <br />
      <br /> */}
        </div>
      }
    </>
  );
};

export default CartItem;
