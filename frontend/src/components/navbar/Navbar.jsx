import {
  AppBar,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Badge,
  Box,
  Container,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useState, useContext } from "react";
import NavListDrawer from "./NavListDrawer";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Search from "../search/Search";
import SearchIconWrapper from "../search/SearchIconWrapper";
import StyledInputBase from "../search/StyledInputBase";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import ButtonMenu from "../ButtonMenu/ButtonMenu";
import ShoppingCart from "../shoppingCart/ShoppingCart";
import ProductsContext from "../../context/ProductsContext";
import UserContext from "../../context/UserContext";
import CartContext from "../../context/CartContext";

export default function Navbar() {
  const { user, logOut } = useContext(UserContext);
  const { handleChangeSearch, handleSubmitSearch } =
    useContext(ProductsContext);
  const [openMenu, SetOpenMenu] = useState(false);
  const [openShoppingCart, SetOpenShoppingCart] = useState(false);
  const { cartProducts } = useContext(CartContext); //items dentro del carro
  const sports = ["Tenis", "Padel"];

  return (
    <>
        <AppBar position="sticky" sx={{ paddingBottom: 0, paddingTop: 0 }}>
          <Toolbar>
            <Container
              maxWidth="xl"
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", m: 0, pt: "10px" }}
              >
                <img
                  src={logo}
                  width={120}
                  height={90}
                  sx={{ marginTop: "10px" }}
                />
              </Box>
              <Box
                maxWidth="lg"
                sx={{
                  display: { xs: "none", sm: "flex" },
                  alignItems: "center",
                  m: 0,
                  pt: "10px",
                }}
              >
                <Search>
                  <form>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <StyledInputBase
                        placeholder="Buscar..."
                        inputProps={{ "aria-label": "buscar" }}
                        onChange={handleChangeSearch}
                      />
                      <Button
                        color="inherit"
                        size="small"
                        onClick={handleSubmitSearch}
                      >
                        {" "}
                        <SearchIconWrapper>
                          <SearchIcon />
                        </SearchIconWrapper>
                      </Button>
                    </Box>
                  </form>
                </Search>
              </Box>
              <Box
                maxWidth="lg"
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Box sx={{ display: { xs: "none", sm: "flex" } }}>
                  <Button color="inherit" component={NavLink} to="/">
                    {/* <HomeIcon sx={{marginRight: 0.5}} /> */}
                    inicio
                  </Button>
                  {user != null ? (
                    <>
                      <Button
                        color="inherit"
                        sx={{
                          "&:hover": {
                            cursor: "auto",
                          },
                          pointerEvents: "none",
                        }}
                      >
                        ¡Hola, {user.name}!
                      </Button>

                      <Button color="inherit" onClick={logOut}>
                        Cerrar sesión
                      </Button>
                    </>
                  ) : (
                    <Button color="inherit" component={NavLink} to="/login">
                      Iniciar sesión
                    </Button>
                  )}
                </Box>
                <Button
                  onClick={() => SetOpenShoppingCart(true)}
                  color="inherit"
                >
                    
                  <Badge
                    badgeContent={cartProducts != null ? cartProducts.length : 0}
                    color="error"
                    showZero
                  >
                    <ShoppingCartIcon
                      color="inherit"
                      size="large"
                    ></ShoppingCartIcon>
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
              </Box>
            </Container>
          </Toolbar>
          <Drawer
            open={openMenu}
            anchor="right"
            position="static"
            onClose={() => SetOpenMenu(false)}
          >
            <NavListDrawer SetOpenMenu={SetOpenMenu} />
          </Drawer>
          <Drawer
            open={openShoppingCart}
            anchor="right"
            onClose={() => SetOpenShoppingCart(false)}
          >
            <ShoppingCart SetOpenShoppingCart={SetOpenShoppingCart} />
          </Drawer>
          <Box
            position="static"
            sx={{
              display: { xs: "none", sm: "flex" },
              justifyContent: "center",
              paddingLeft: 5,
              backgroundColor: "#454546",
              color: "white",
            }}
          >
            {sports.map((sport) => (
              <ButtonMenu key={sport} sport={sport}></ButtonMenu>
            ))}

            <Button color="inherit" component={NavLink} to="/sobre-nosotros">
              Sobre Nosotros
            </Button>
          </Box>
        </AppBar>
    </>
  );
}
