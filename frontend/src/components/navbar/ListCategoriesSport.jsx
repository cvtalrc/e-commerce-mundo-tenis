import { NavLink } from "react-router-dom";
import Divider from '@mui/material/Divider';
import { ListItemButton, ListItemText, Collapse, List } from "@mui/material";
import { useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material"

export default function ListCategoriesSport({ sport, SetOpenMenu }) {
    //sport define la consulta al back, por el momento se declaran ambos deportes 

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    let categories = [];
    console.log(sport);
    if (sport == 'Tenis') {
        categories = [
            "Raquetas", "Cuerdas", "Pelotas", "Bolsos", "Zapatillas", "Textiles", "Accesorios"
        ]
    } else if (sport == 'Padel')
        categories = [
            "Palas", "Bolsos", "Pelotas", "Textiles", "Zapatillas", "Accesorios"
        ]

    console.log(categories)

    return (
        <div>
            <ListItemButton onClick={handleClick}>
                <ListItemText primary={sport} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>

                    {categories.map(category => ( //agregar iconos y links
                        <>

                            <ListItemButton sx={{ pl: 4 }}
                                component={NavLink}
                                to={`/sport/${sport}/${category}`}
                                onClick={() => SetOpenMenu(false)}>

                                <ListItemText
                                    primary={category}

                                />

                            </ListItemButton>

                        </>

                    ))}
                    <ListItemButton sx={{ pl: 4 }}
                        component={NavLink}
                        to={`/sport/${sport}`}
                        onClick={() => SetOpenMenu(false)}>
                        <ListItemText
                            primary={`Ver todo ${sport}`}

                        />
                    </ListItemButton>
                </List>
            </Collapse >


        </div >
    );

}