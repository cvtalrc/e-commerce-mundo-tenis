import { AppBar, Button, Drawer, IconButton, Toolbar, Typography, Badge, Box } from "@mui/material";
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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import logo from '../../assets/logo.svg';
import ButtonMenu from "../ButtonMenu/ButtonMenu";
import { styled, alpha } from '@mui/material/styles';

export default function Navbar(navArrayLinks) {

    const [openMenu, SetOpenMenu] = useState(false);
    const [openShoppingCart, SetOpenShoppingCart] = useState(false);
    const sports = ["tenis", "padel"]

    return (
        <>
            <AppBar position="static" sx={{ paddingBottom: 0, paddingTop: 0 }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        size="large"
                        onClick={() => SetOpenMenu(true)}
                        sx={{ display: { xs: "flex", sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <img src={logo} />

                    <Box sx={{ flexGrow: 1 }} />
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Buscar..."
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>

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
                    <Button color="inherit">
                        <Badge badgeContent={0} color="error" showZero>
                            <ShoppingCartIcon
                                color="inherit"
                                size="large"
                                onClick={() => SetOpenShoppingCart(true)}>
                            </ShoppingCartIcon>
                        </Badge>
                    </Button>


                </Toolbar>
            </AppBar>

            <Drawer
                open={openMenu}
                anchor="left"
                onClose={() => SetOpenMenu(false)}>
                <NavListDrawer />
            </Drawer>
            <Drawer
                open={openShoppingCart}
                anchor="right"
                onClose={() => SetOpenShoppingCart(false)}>
                <ShoppingCartDrawer SetOpenShoppingCart={SetOpenShoppingCart} />
            </Drawer>
            <Box position="static" sx={{ display: "flex", justifyContent: "center", paddingLeft: 5, backgroundColor: "#1565cd", color: "white" }}>
                {sports.map((sport) => (
                    <ButtonMenu key={sport} sport={sport}></ButtonMenu>
                ))}

                <Button
                    color="inherit"
                    component={NavLink}
                    to="/"
                >Sobre Nosotros</Button>
            </Box>
        </>
    )
}