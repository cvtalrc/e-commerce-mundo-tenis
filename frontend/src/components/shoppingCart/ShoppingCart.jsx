import { useContext} from "react";
import { Box, List, ListSubheader, Grid, Button, Typography} from "@mui/material";
import { NavLink } from "react-router-dom";
import CartItem from "../CartItem/CartItem";
import CartContext from "../../context/CartContext";
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import LoginIcon from '@mui/icons-material/Login';

const ShoppingCart = (SetOpenShoppingCart) => {
  const { cartProducts, totalPrice } = useContext(CartContext); //items dentro del carro
  console.log("hola", cartProducts)

  return (<>
    {cartProducts != null ?
      <Box sx={{ width: { sm: 450, xs: 320 }, height: '87%', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
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
              <Box sx={{ display: 'flex', justifyContent: "center", flexDirection: 'column', alignItems: "center", alignContent: "center", height: { sm: "800px", xs: "550px" } }}>
                <AddShoppingCartOutlinedIcon color="secondary" sx={{ mt: 2, fontSize: 100, strokeWidth: 0.5 }} />
                <Typography variant="h6" color="secondary" sx={{ fontWeight: 500, mt: 2 }}>Agrega productos a tu carrito</Typography>
              </Box>

            }

          </Grid>
        </List>
        <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: 'auto', ml: 3, mr: 3, mb:1.5 }}>
          {totalPrice != null && cartProducts.length > 0 ? (
            <>
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center' , borderTop: "thin solid gray", borderBottom: "thin solid gray",mb: 2, mt: 2 }}>
                <Typography sx={{ fontWeight: 600, mt: .5, mb: .5, fontSize: {xs: '14px', md: '16px'}}}>Total: </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, mt: .5, mb: .5,  fontSize: {xs: '14px', md: '16px'}}}> ${totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} </Typography>

              </Box>
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

    : <Box sx={{ width: { sm: 450, xs: 320 }, height: '87%', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
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
          <Box sx={{ display: 'flex', justifyContent: "center", flexDirection: 'column', alignItems: "center", alignContent: "center", height: { sm: "800px", xs: "550px" } }}>
            <LoginIcon color="secondary" sx={{ mt: 2, fontSize: 100, strokeWidth: 0.5 }} />
            <Typography variant="h6" color="secondary" sx={{ fontWeight: 500, mt: 2, pl:5, pr:5, textAlign:'center' }}>Inicia sesión o regístrate para añadir productos al carrito</Typography>
          </Box>
      </Grid>
    </List>
    
  </Box>}
  </>
  )
};
export default ShoppingCart;