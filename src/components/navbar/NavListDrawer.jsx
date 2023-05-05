import { Box, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Collapse } from "@mui/material";
import { ExpandLess, ExpandMore} from "@mui/icons-material"
import { useState } from "react";
// import LoginIcon from '@mui/icons-material/Login';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';


export default function NavListDrawer() {
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ width: 250 }}>
            <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        MUNDO TENIS CGA
                    </ListSubheader>
                }
            >
                {/* <ListItemButton>
                    <ListItemIcon>

                    </ListItemIcon>
                    <ListItemText primary="Sent mail" />
                </ListItemButton>
                <ListItemButton>
                    <ListItemIcon>

                    </ListItemIcon>
                    <ListItemText primary="Drafts" />
                </ListItemButton> */}

                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                    <SportsTennisIcon />
                    </ListItemIcon>
                    <ListItemText primary="Tenis" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton sx={{ pl: 4 }}>
                            <ListItemText primary="Zapatillas" />
                        </ListItemButton>
                    </List>
                </Collapse>
                <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                    <SportsTennisIcon />
                    </ListItemIcon>
                    <ListItemText primary="Padel" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
            </List>


        </Box>
    )
}