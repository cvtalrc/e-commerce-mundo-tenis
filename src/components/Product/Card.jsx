import { Divider, Grid, List, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";

export default function Card(props) {
    return (

        <List to={`/sport/${props.sport}/${props.category}/${props.id}}`} component={NavLink} sx={{ textDecoration: 'none', color: 'black' }}>
            <li className="sports-card-info">
                <img src={props.imgUrl} alt=""></img>
                <p className="sports-card-title">{props.title}</p>
                <p style={{textAlign: 'center'}}>{props.brand}</p>
                <p className="sports-card-price"> $ {props.price}</p>
            </li>
        </List>

    )
}