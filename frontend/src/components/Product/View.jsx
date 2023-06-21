import { Button, Container, Grid, List, Typography, Box, ButtonGroup, Badge, MenuItem, Select, TextField } from "@mui/material";
import { useContext, useEffect, useReducer, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { helpHttp } from "../../helpers/helpHttp";
import CartContext from "../../context/CartContext"; 

export default function View({ product }) {
  const {addToCart, form, setForm } = useContext(CartContext)
  const [itemCount, setItemCount] = useState(1);

  const priceSale = parseFloat((product.price - (product.price * (product.percentageSale / 100))).toFixed(0));
  let formattedPriceSale = priceSale.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  let formattedPrice = product.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // const handleReset = (e) => {
  //   setForm(initialForm);
  // };

  // const email = localStorage.getItem("userEmail");
  // const api = helpHttp();
  // const url = "Http://localhost:3000/API/cart/add";

  // const addToCart = (_id, title, size, quantity) => {
  //   form.User = email
  //   form.TitleProduct = title
  //   form.Size = size
  //   form.Quantity = quantity

  //   console.log({ ...form })

  //   let options = {
  //     body: form,
  //     headers: { "content-type": "application/json" },
  //   };

  //   api
  //     .post(url, options)
  //     .then((res) => {
  //       if (!res.err) {
  //         console.log(res);
  //         setAddToCartTrigger(true); // Actualiza el estado para disparar el efecto
  //       }
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     });

  //   handleReset()
  // };

  // useEffect(() => {
  //   if (addToCartTrigger) {
  //     setAddToCartTrigger(false); // Reinicia el estado para futuras llamadas
  //   }
  // }, [addToCartTrigger]);

  // const handleChange = (e) => {
  //   form.Size = e.target.value
  //   console.log(form.Size)
  // };

  return (
    <Container sx={{ p: 4, mt: 4, mb: 4}}>
      <Grid container >
        <Grid item md={6}>
          <img src={product.imgUrl}></img>
        </Grid>
        <Grid item md={6}>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>{product.title}</Typography>
          <Typography variant="h6" sx={{ mb: 1 }} >{product.brand}</Typography>
          <Typography sx={{ mb: 2, textAlign: 'justify', color: 'gray' }}>{product.description}</Typography>
          {product.stock[0].size.length > 0 ? (<TextField
            id="outlined-select-currency"
            select
            color="secondary"
            label="Talla"
            helperText="Por favor seleccione una talla."
            onChange={(e) => setForm({ ...form, Size: e.target.value })}
            value={form.Size || ''}
            sx={{ mb: 3, mt: 2}}
          >
            {product.stock.map((option) => (
              <MenuItem key={option.size} value={option.size}>
                {option.size}
              </MenuItem>
            ))}
          </TextField>): ''}

          {product.sale ?
          (<Box sx={{ display: 'flex', justifyContent: 'left' }}>
            <Typography color="red"  variant="h5" sx={{ fontWeight: '700', whiteSpace: 'nowrap' }} >$ {formattedPriceSale}</Typography>
            <Typography color="secondary"  variant="h5" sx={{ fontWeight: '700', textDecoration: 'line-through', ml: 1 }}>$ {formattedPrice} </Typography>
          </Box>)
          :
          (<Typography color="secondary" variant="h5" sx={{ fontWeight: '700' }} > $ {formattedPrice}</Typography>)
        }

          <Box sx={{ display: 'flex', flexDirection: 'column', mt: 5 }}>
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
              addToCart(product._id, product.title, form.Size, itemCount);
            }}
              color="secondary" variant="outlined" sx={{ width: { sm: '40%', xs: '100%' }, mt: 4 }}>
              <ShoppingCartIcon fontSize="small" sx={{ mr: 2 }} />
              Agregar al carro
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}