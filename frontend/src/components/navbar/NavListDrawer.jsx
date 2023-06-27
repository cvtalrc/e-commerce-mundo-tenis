import { Box, List, ListSubheader, ListItemButton, ListItemText, Button, IconButton } from "@mui/material";
import ListCategoriesSport from "./ListCategoriesSport";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export default function NavListDrawer({SetOpenMenu, user, logOut}) {
    const [sports, setSports] = useState(["Tenis", "Padel"])

    const logOutDrawer = () => {
        logOut()
        SetOpenMenu(false)
    }

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
           
            <IconButton component={NavLink}  onClick={() => SetOpenMenu(false)} sx={{mr:2}} to="/" aria-label="Example">
                   <HomeIcon/> 
                   </IconButton>
                  
            
            {user != null ? (
                   <>
                      {/* <Button
                        color="inherit"
                        size="small"
                        sx={{
                          "&:hover": {
                            cursor: "auto",
                          },
                          ml:4, mr:2
                        }}
                        onClick={() => SetOpenMenu(false)}
                        component={NavLink}
                        to={`/user/${user._id}`}
                      > */}
                        <IconButton aria-label="Example" sx={{mr:2}} onClick={() => SetOpenMenu(false)}
                        component={NavLink}
                        to={`/user/${user._id}`}>
                            <AccountCircleIcon/>

                        </IconButton>
                        {/* ¡Hola, {user.name}! */}
                      {/* </Button> */}

                      <IconButton onClick={logOutDrawer} aria-label="Example">
                            <LogoutIcon/>
                        </IconButton>

                      {/* <Button  onClick={logOutDrawer} color="inherit" sx={{mr:4}} size="small">
                        Cerrar sesión
                      </Button> */}
                    </>
                  ) : (
                    <Button color="inherit"  onClick={() => SetOpenMenu(false)} component={NavLink} to="/login">
                      Iniciar sesión
                    </Button>
                  )}
            </Box>


        </Box>
    )
}