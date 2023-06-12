import { AppBar, Button, Drawer, IconButton, Toolbar, Badge, Box, Container, Typography } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState, useEffect } from "react";
import NavListDrawer from './NavListDrawer'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Search from "../search/Search";
import SearchIconWrapper from "../search/SearchIconWrapper";
import StyledInputBase from "../search/StyledInputBase";
import { NavLink } from "react-router-dom";
import ShoppingCartDrawer from "../shoppingCartDrawer/ShoppingCartDrawer";
import logo from '../../assets/logo.svg';
import ButtonMenu from "../ButtonMenu/ButtonMenu"
import { CloudDownloadSharp } from "@mui/icons-material";
import { helpHttp } from "../../helpers/helpHttp";

export default function Navbar({ userName, handleLogout }) {

    const [openMenu, SetOpenMenu] = useState(false);
    const [openShoppingCart, SetOpenShoppingCart] = useState(false);
    // const [search, setSearch] = useState("");
    const sports = ["Tenis", "Padel"];
    // const [totalProducts, setTotalProducts] = useState(null)
    // const [productsSearch, setProductsSearch] = useState(null);
    // const [products, setProducts] = useState(null);

    // setTotalProducts(products)
    // setProductsSearch(products)

    // let api = helpHttp();
    // let url = "http://localhost:3000/api/product"

    // useEffect(() => {
    //     api
    //         .get(url)
    //         .then((res) => {
    //             console.log(res);
    //             if (!res.err) {
    //                 setProducts(res);
    //             } else {
    //                 setProducts(null);
    //             }
    //         });
    // }, [url]);

    // const handleChange = e => {
    //     setSearch(e.target.value);
    //     filterS(e.target.value)
    // }

    // const filterS = (x) => {
    //     console.log(totalProducts)
    //     let result = productsSearch.filter((element) => {
    //         console.log(element.title)
    //         if(element.title.toString().toLowerCase().includes(x.toLowerCase())){
    //             return element;
    //         }
    //     });

    //     setTotalProducts(result)
        
    // }

    return (
        <>
            <AppBar position="sticky" sx={{ paddingBottom: 0, paddingTop: 0 }}>
                <Toolbar>
                    <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                        {/* <img src={logo} /> */}
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Buscar..."
                                inputProps={{ 'aria-label': 'buscar' }}
                                
                            />
                        </Search>
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
                            {userName ? (
                                <>
                                    <Button
                                        color="inherit"
                                        sx={{
                                            '&:hover': {
                                                cursor: 'auto',
                                            },
                                            pointerEvents: 'none'
                                        }}
                                    >
                                        ¡Hola, {userName}!
                                    </Button>

                                    <Button
                                        color="inherit"
                                        onClick={handleLogout}
                                    >
                                        Cerrar sesión
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    color="inherit"
                                    component={NavLink}
                                    to="/login"
                                >
                                    Iniciar sesión
                                </Button>
                            )}
                        </Box>
                        <Button color="inherit">
                            <Badge badgeContent={0} color="error" onClick={() => SetOpenShoppingCart(true)} showZero >
                                <ShoppingCartIcon
                                    color="inherit"
                                    size="large"
                                >
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
            <Box position="static" sx={{ display: { xs: 'none', sm: 'flex' }, justifyContent: "center", paddingLeft: 5, backgroundColor: "secondary.main", color: "white" }}>
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