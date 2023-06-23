import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { helpHttp } from "../../helpers/helpHttp";
import { useContext, useEffect, useState } from "react";
import ProductsContext from "../../context/ProductsContext";
import CartContext from "../../context/CartContext";
import ClearIcon from '@mui/icons-material/Clear';
import RemoveCircleOutlineRoundedIcon from '@mui/icons-material/RemoveCircleOutlineRounded';

const CartItem = ({ data, id }) => {
  let { _id, TitleProduct, price, Quantity, Size } = data;
  const { products } = useContext(ProductsContext);
  const { delFromCart, isClicked } = useContext(CartContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (products != null) {
      setProduct(products.filter((productF) => (productF.title === TitleProduct)))
    }
  }, [products])


  return (
    <>
      {products != null && product != null &&
        <div style={{ borderBottom: "thin solid gray", margin: '20px', pt: 2}}>
          <Container sx={{ pt: 3, pb: 5, display: 'flex', justifyContent: 'centr', flexDirection: 'row' }}>

            {
              id ? //shoppingCart
                (
                  <Grid spacing={1} container>
                    <Grid item md={4}>
                      <img src={product[0].imgUrl} />
                    </Grid>
                    <Grid item md={6} sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, fontSize: 17, pl: 'auto', pt: 'auto' }}>{TitleProduct}</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 500, mb: 2, fontSize: 14, pl: 'auto', pt: 'auto' }}>${product[0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} x {Quantity} = ${(product[0].price * Quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Typography>
                      {Size && (
                        <Typography variant="h5" sx={{ fontWeight: 500, mb: 1, fontSize: 14, pl: 'auto', pt: 'auto' }}>Talla: {Size}</Typography>
                      )}
                    </Grid>
                    <Grid item md={2} >
                      <Button size="small" sx={{p: 4}} onClick={() => delFromCart(TitleProduct, Size, Quantity)} >
                        <RemoveCircleOutlineRoundedIcon fontSize="medium" sx={{ display:'flex', justifyContent: 'center', alignItems: 'center', alignContent:'center'}}/>
                      </Button>
                    </Grid>
                  </Grid>
                )

                : //order

                (<Grid spacing={6} container>
                  <Grid item md={3} sm={2} xs={4}>
                    <img src={product[0].imgUrl} />
                  </Grid>
                  <Grid item md={7} sm={4} xs={5} sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', flexDirection: 'column' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, pl: 7, pt: 'auto' }}>{TitleProduct}</Typography>
                    <Typography variant="h5" sx={{ fontWeight: 500, mb: 2, fontSize: 15, pl: 7, pt: 'auto' }}>${product[0].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} x {Quantity} = ${(product[0].price * Quantity).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</Typography>
                    {Size && (
                      <Typography variant="h5" sx={{ fontWeight: 500, mb: 1, fontSize: 15, pl: 7, pt: 'auto' }}>Talla: {Size}</Typography>
                    )}
                  </Grid>
                  <Grid item md={2} sm={6} xs={3}>
                    <Button onClick={() => delFromCart(TitleProduct, Size, Quantity)} sx={{ pt: '5rem', pl: 2 }}>
                      <RemoveCircleOutlineRoundedIcon color="error.main" fontSize="large"/>
                    </Button>
                  </Grid>
                </Grid>)

            }

          </Container>
        </div>
      }
    </>
  );
};

export default CartItem;
