import { Grid, List, Box, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

export default function Card(props) {
  return (

    <List to={`/${props.sport}/${props.category}/${props._id}`} component={NavLink} sx={{ textDecoration: 'none', color: 'black' }}>
      <Box sx={{padding: 3, textAlign:'center'}}>
        <img src={props.imgUrl} alt=""></img>
        <Typography variant="body1" noWrap={true} sx={{fontWeight: '700'}}>{props.title}</Typography>
        <Typography>{props.brand}</Typography>
        <Typography color="secondary" sx={{fontWeight: '700'}}> $ {props.price}</Typography>
      </Box>

    </List>

  )
}