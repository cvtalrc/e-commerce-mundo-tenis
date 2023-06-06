import { Grid, List, Box, Typography, Container, Divider } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function Card({ product }) {

  const priceSale = product.price - (product.price * (product.percentageSale / 100))

  return (
    <List key={product._id} to={`/${product.sport}/${product.category}/${product._id}`} component={NavLink} sx={{ textDecoration: 'none', color: 'black' }}>
      <Box sx={{ padding: 3, textAlign: 'center', border: '1px solid #bebebe', borderRadius: 1 }}>
        <img src={product.imgUrl} alt=""></img>
        <Typography variant="body1" noWrap={true} sx={{ fontWeight: '700', mb: 1 }}>{product.title}</Typography>
        <Typography sx={{ mb: 1 }}>{product.brand}</Typography>
        {product.sale ?
          (<Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography color="red" sx={{ fontWeight: '700', whiteSpace: 'nowrap' }} >$ {priceSale}</Typography>
            <Typography color="secondary" sx={{ fontWeight: '700', textDecoration: 'line-through', ml: 1 }}>$ {product.price} </Typography>
          </Box>)
          :
          (<Typography color="secondary" sx={{ fontWeight: '700' }} > $ {product.price}</Typography>)
        }

      </Box>


    </List>

  )
}