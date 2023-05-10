import { MenuItem, Button } from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import StyledMenu from "./StyledMenu";
import { NavLink } from "react-router-dom";

export default function ButtonMenu({ sport }) {
    //sport define la consulta al back, por el momento se declaran ambos deportes 
    let categories = [];
    console.log(sport);
    if (sport == 'tenis') {
        categories = [
            "Raquetas", "Cuerdas", "Pelotas", "Bolsos", "Zapatillas", "Textiles", "Accesorios"
        ]
    } else if (sport == 'padel')
        categories = [
            "Palas", "Bolsos", "Pelotas", "Textiles", "Zapatillas", "Accesorios"
        ]

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    console.log(categories)

    return (
        <div>
            <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="fixed"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
            >
                {sport}
            </Button>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {categories.map(category => ( //agregar iconos y links
                    <MenuItem
                        key={category}
                        onClick={handleClose}
                        component={NavLink}
                        to={`/sport/${sport}/${category}`}
                        disableRipple>

                        {category}
                    </MenuItem>
                ))}

                <MenuItem
                    onClick={handleClose}
                    component={NavLink}
                    to={`/sport/${sport}`}
                    disableRipple>
                    Ver todo {sport}

                </MenuItem>

            </StyledMenu>
        </div>
    );

}