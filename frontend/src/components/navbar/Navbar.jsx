import { AppBar, Button, Drawer, IconButton, Toolbar, Badge, Box, Container } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState } from "react";
import NavListDrawer from './NavListDrawer'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Search from "../search/Search";
import SearchIconWrapper from "../search/SearchIconWrapper";
import StyledInputBase from "../search/StyledInputBase";
import { NavLink } from "react-router-dom";
import ShoppingCartDrawer from "../shoppingCartDrawer/ShoppingCartDrawer";
import logo from '../../assets/logo.svg';
import ButtonMenu from "../ButtonMenu/ButtonMenu";

export default function Navbar(navArrayLinks) {

    const [openMenu, SetOpenMenu] = useState(false);
    const [openShoppingCart, SetOpenShoppingCart] = useState(false);
    const sports = ["Tenis", "Padel"]

    return (
        <>
            <AppBar position="sticky" sx={{ paddingBottom: 0, paddingTop: 0 }}
            >
                <Toolbar>
                    <Container maxWidth="xl" sx={{display: 'flex', flexDirection:'row', justifyContent: 'right'}}>
                        {/* <img src={logo} /> */}
                        {/* <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Buscar..."
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search> */}
                        {/* <Box sx={{ flexGrow: 1 }}></Box> */}
                        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                            <Button
                                color="inherit"
                                component={NavLink}
                                to="/"
                            >
                                {/* <HomeIcon sx={{marginRight: 0.5}} /> */}
                                inicio

                            </Button>
                            <Button
                                color="inherit"
                                component={NavLink}
                                to="/login"
                            >
                                {/* <AccountCircleIcon sx={{marginRight: 0.5}}/> */}
                                iniciar sesión
                            </Button>
                            
                        </Box>

                        <Button color="inherit">
                            <Badge badgeContent={0} color="error" showZero>
                                <ShoppingCartIcon
                                    color="inherit"
                                    size="large"
                                    onClick={() => SetOpenShoppingCart(true)}>
                                </ShoppingCartIcon>
                            </Badge>
                        </Button>
                        

                        <IconButton
                            color="inherit"
                            size="large"
                            onClick={() => SetOpenMenu(true)}
                            sx={{ display: { xs: "flex", sm: "none" } }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Container>
                </Toolbar>
            </AppBar>

            <Drawer
                open={openMenu}
                anchor="right"
                position="static"
                onClose={() => SetOpenMenu(false)}>
                <NavListDrawer SetOpenMenu={SetOpenMenu} />
            </Drawer>
            <Drawer
                open={openShoppingCart}
                anchor="right"
                onClose={() => SetOpenShoppingCart(false)}>
                <ShoppingCartDrawer SetOpenShoppingCart={SetOpenShoppingCart} />
            </Drawer>
            <Box position="static" sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: "center", paddingLeft: 5, backgroundColor: "#1565cd", color: "white" }}>
                {sports.map((sport) => (
                    <ButtonMenu key={sport} sport={sport}></ButtonMenu>
                ))}

                <Button
                    color="inherit"
                    component={NavLink}
                    to="/sobre-nosotros"
                >Sobre Nosotros</Button>
            </Box>
        </>
    )
}