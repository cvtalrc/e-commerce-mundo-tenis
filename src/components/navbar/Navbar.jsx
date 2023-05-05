import { AppBar, Button, Drawer, IconButton, Toolbar, Typography, Badge, Box } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useState } from "react";
import NavListDrawer from './NavListDrawer'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Search from "../search/Search";
import SearchIconWrapper from "../search/SearchIconWrapper";
import StyledInputBase from "../search/StyledInputBase";

export default function Navbar() {

    const [open, SetOpen] = useState(false);

    return (
        <>
            <AppBar position="static">
                <Toolbar sx={{ padding: 2}}>
                    <IconButton
                        color="inherit"
                        size="large"
                        onClick={() => SetOpen(true)}
                        sx={{display: {xs: "flex", sm:"none" }}}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{display: {xs: "none", sm:"flex"}}}>MUNDO TENIS CGA</Typography>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Buscar..."
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box sx={{ flexGrow: 1}} />
                    <Box sx={{ display: {xs: "none", sm:"flex"} }}>
                    <Button color="inherit">Iniciar Sesión</Button>
                    <Button color="inherit">
                        <Badge badgeContent={0} color="secondary" showZero>
                            <ShoppingCartIcon color="inherit">
                            </ShoppingCartIcon>
                        </Badge>
                    </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer
                open={open}
                anchor="left"
                onClose={() => SetOpen(false)}>
                <NavListDrawer />
            </Drawer>
        </>
    )
}