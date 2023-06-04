import { Button, Container, Grid, List, Typography, Box, ButtonGroup, Badge } from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function View({ product }) {
  const [itemCount, setItemCount] = useState(1);

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
          <Typography variant="h5" bgcolor="secondary" sx={{ mb: 4 }} >$ {product.price}</Typography>
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
              console.log("no hace nada")
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