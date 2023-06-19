import { Box, List, ListSubheader, ListItemButton, ListItemText, Button } from "@mui/material";
import ListCategoriesSport from "./ListCategoriesSport";
import { NavLink } from "react-router-dom";
import { useState } from "react";


export default function NavListDrawer(SetOpenMenu) {
    const [sports, setSports] = useState(["Tenis", "Padel"])
    return (
        <Box sx={{ width: 250, height: '100vh' }}>
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

                {sports.map((sport) => (
                        <ListCategoriesSport key={sport} sport={sport} SetOpenMenu={SetOpenMenu} />
                    
                ))}

                <ListItemButton
                    onClick={() => SetOpenMenu(false)}
                    component={NavLink}
                    to="/sobre-nosotros">
                    <ListItemText
                        primary="Sobre Nosotros"
                    />
                </ListItemButton>

            </List>

            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', position: 'absolute', bottom: 0, width: '100%', paddingBottom: 5 }}>
                <Button
                    color="inherit"
                    component={NavLink}
                    to="/"
                    onClick={() => SetOpenMenu(false)}
                >
                    {/* <HomeIcon sx={{marginRight: 0.5}} /> */}
                    inicio

                </Button>
                <Button
                    color="inherit"
                    component={NavLink}
                    to="/login"
                    onClick={() => SetOpenMenu(false)}
                >
                    {/* <AccountCircleIcon sx={{marginRight: 0.5}}/> */}
                    iniciar sesión
                </Button>
            </Box>


        </Box>
    )
}