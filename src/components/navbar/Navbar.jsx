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

export default function Navbar(navArrayLinks) {

    const [openMenu, SetOpenMenu] = useState(false);
    const [openShoppingCart, SetOpenShoppingCart] = useState(false);

    return (
        <>
            <AppBar position="static">
                <Toolbar sx={{ padding: 2 }}>
                    <IconButton
                        color="inherit"
                        size="large"
                        onClick={() => SetOpenMenu(true)}
                        sx={{ display: { xs: "flex", sm: "none" } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    
                    <Button
                        color="inherit"
                        component={NavLink}
                        to="/"
                        sx={{ display: { xs: "none", sm: "flex" } }}
                    >
                        
                        <Typography
                            variant="h7"
                            noWrap
                            sx={{
                              mr: 0,
                              display: { xs: 'none', md: 'flex' },
                              fontFamily: 'unset',
                              fontWeight: 700,
                              letterSpacing: '.2rem',
                              color: 'inherit',
                              textDecoration: 'none',
                            }}>
                            Mundo Tenis CGA
                        </Typography>
                    </Button>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Buscar..."
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                   
                        <Button
                            color="inherit"
                            component={NavLink}
                            to="/"
                        >
                            <HomeIcon />
                        </Button>
                        <Button
                            color="inherit"
                            component={NavLink}
                            to="/login"
                        >
                            <AccountCircleIcon />
                        </Button>
                        <Button color="inherit">
                            <Badge badgeContent={0} color="secondary" showZero>
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
                <ShoppingCartDrawer SetOpenShoppingCart={SetOpenShoppingCart}/>
            </Drawer>
            <Box position="static" sx={{display: "flex", justifyContent: "center", backgroundColor: "#1565c0", color: "white"}}>                        
            <Button 
            color="inherit"
            component={NavLink}
            to="/sport/tenis"
            >Tenis</Button>
            <Button 
            color="inherit"
            component={NavLink}
            to="/sport/padel"
            >Padel</Button>
            <Button 
            color="inherit"
            component={NavLink}
            to="/"
            >Sobre Nosotros</Button>
            </Box>   
        </>
    )
}