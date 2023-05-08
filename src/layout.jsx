import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/navbar/Navbar";
import Home from "./views/home/Home";
import Categories from "./views/categories/Categories";
import Sports from "./views/sports/Sports";
import Product from "./views/product/Product";
import Order from "./views/order/Order";
import Footer from "./components/footer/Footer";
import injectContext from "./store/appContext";
import React from 'react';
import Login from './views/login/Login';

{/*********** FALTA LOGIN Y SIGNIN **********/ }

const navArrayLinks = [
    {
        title: "Home",
        path: "/"
    },
    {
        title: "Login",
        path: "/login"
    },
    {
        title: "Sport",
        path: "/:sport"
    },
    {
        title: "Categories",
        path: "/:sport/:category"
    },
    {
        title: "Product",
        path: "/:sport/:category/:id"
    },
    {
        title: "Oder",
        path: "/order"
    },

]

const Layout = () => {
    return (
        <React.Fragment>
            <Navbar navArrayLinks={navArrayLinks}/>
            <Routes>
                <Route path="/" element={<Home />} /> {/*pagina de inicio (vista principal) */}
                <Route path="/login" element={<Login />} />
                <Route path="/sport/:id" element={<Sports />} /> {/*pagina por deporte (tenis, padel) */}
                <Route path="/sport/:id/:category" element={<Categories />} /> {/*pagina por deporte y categorías (zap, cuerdas, etc) */}
                <Route path="/:sport/:category/:id" element={<Product />} /> {/*pagina por producto en específico */}
                <Route path="/order" element={<Order />} /> {/*pedido (carrito de compras) */}
            </Routes>
            <Footer />
        </React.Fragment>
    );
};

export default injectContext(Layout);