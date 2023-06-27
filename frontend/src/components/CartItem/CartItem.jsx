import { Button, Container, Grid, Typography, Box, IconButton } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import ProductsContext from "../../context/ProductsContext";
import CartContext from "../../context/CartContext";
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';

const CartItem = ({ data, id }) => {
  let { idProduct, TitleProduct, price, Quantity, Size } = data;
  const { products } = useContext(ProductsContext);
  const { delFromCart, totalPrice } = useContext(CartContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (products != null) {
      setProduct(products.filter((productF) => (productF.title === TitleProduct)))
    }
  }, [products])

  return (
    <>
      {products != null && product != null &&
        <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', mt:2 }}>
          {
            id ? // vista shoppingCart
              (
                <Box sx={{ borderBottom: "thin solid gray", mb: 1 }}>
                  <Grid spacing={2} container>
                    <Grid item md={4}>
                      <img src={product[0].imgUrl} />
                    </Grid>
                    <Grid item md={6} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, fontSize: 17, pl: 'auto', pt: 'auto' }}>{TitleProduct}</Typography>
                      {product[0].sale ?
                        <Typography variant="h5" sx={{ fontWeight: 500, mb: 2, fontSize: 14, pl: 'auto', pt: 'auto' }}>${parseFloat((product[0].price - (product[0].price * (product[0].percentageSale / 100))).toFixed(0)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} x {Quantity} = ${parseFloat((product[0].price - (product[0].price * (product[0].percentageSale / 100))) * Quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Typography>
                        :
                        <Typography variant="h5" sx={{ fontWeight: 500, mb: 2, fontSize: 14, pl: 'auto', pt: 'auto' }}>${product[0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} x {Quantity} = ${(product[0].price * Quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Typography>

                      }

                      {Size && (
                        <Typography variant="h5" sx={{ fontWeight: 500, mb: 1, fontSize: 14, pl: 'auto', pt: 'auto' }}>Talla: {Size}</Typography>
                      )}
                    </Grid>
                    <Grid item md={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                      <IconButton sx={{ mr: 1.5 }} onClick={() => delFromCart(idProduct, Size, Quantity)} >
                        <RemoveCircleOutlineRoundedIcon fontSize="medium" />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              )

              : //vista order

              (
               
                  <Grid sx={{mb:5, borderBottom: "thin solid gray"}} justifyContent={"space-around"} alignItems={"center"} justifyItems={"center"} container>  
                    <Grid item md={4} sm={2} xs={4}>
                      <img style={{width: '50%'}} src={product[0].imgUrl} />
                    </Grid>
                    <Grid item md={4} sm={4} xs={5}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, pl: 7, pt: 'auto' }}>{TitleProduct}</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 500, mb: 2, fontSize: 15, pl: 7, pt: 'auto' }}>${product[0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} x {Quantity} = ${(product[0].price * Quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Typography>
                      {Size && (
                        <Typography variant="h5" sx={{ fontWeight: 500, mb: 1, fontSize: 15, pl: 7, pt: 'auto' }}>Talla: {Size}</Typography>
                      )}
                    </Grid>
                    <Grid item md={4} sm={6} xs={3} sx={{ display:'flex', justifyContent:'center'}} >
                    <IconButton onClick={() => delFromCart(idProduct, Size, Quantity)} >
                        <RemoveCircleOutlineRoundedIcon fontSize="large" />
                      </IconButton>
                    </Grid>
                  </Grid>
                
                
              )
          }

        </Container>

      }
    </>
  );
};

export default CartItem;
