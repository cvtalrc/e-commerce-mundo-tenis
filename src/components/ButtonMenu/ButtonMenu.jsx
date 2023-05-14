import { MenuItem, Button } from "@mui/material";
import { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import StyledMenu from "./StyledMenu";
import { NavLink } from "react-router-dom";
import Divider from '@mui/material/Divider';


export default function ButtonMenu({ sport }) {
    //sport define la consulta al back, por el momento se declaran ambos deportes 
    let categories = [];
    if (sport == 'Tenis') {
        categories = [
            "Raquetas", "Cuerdas", "Pelotas", "Bolsos", "Zapatillas", "Textiles", "Accesorios"
        ]
    } else if (sport == 'Padel')
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
                key={sport}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {categories.map(category => ( 
                        <MenuItem
                            key={category}
                            onClick={handleClose}
                            component={NavLink}
                            to={`/sport/${sport}/${category}`}
                            disableRipple>

                            {category}
                        </MenuItem>

                ))}
                <Divider />
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