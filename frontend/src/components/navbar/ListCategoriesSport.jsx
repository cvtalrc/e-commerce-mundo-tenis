import { NavLink } from "react-router-dom";
import Divider from '@mui/material/Divider';
import { ListItemButton, ListItemText, Collapse, List } from "@mui/material";
import { useContext, useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material"
import ProductsContext from "../../context/ProductsContext";

export default function ListCategoriesSport({ sport, SetOpenMenu }) {

    const { categoriesTenis, categoriesPadel } = useContext(ProductsContext)
    let categories = []
    if(sport === 'Tenis'){
        categories = categoriesTenis
    }else {
        categories = categoriesPadel
    }

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    //console.log(categories)

    return (
        <div>
            <ListItemButton onClick={handleClick}>
                <ListItemText key={sport} primary={sport} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List key={sport} component="div" disablePadding>

                    {categories.map(category => ( //agregar iconos y links
                            <ListItemButton
                                key={category}
                                sx={{ pl: 4 }}
                                component={NavLink}
                                to={`/${sport}/${category}`}
                                onClick={() => SetOpenMenu(false)}>

                                <ListItemText
                                    primary={category}

                                />

                            </ListItemButton>
                    ))}
                    <ListItemButton sx={{ pl: 4 }}
                        key={sport}
                        component={NavLink}
                        to={`/${sport}`}
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