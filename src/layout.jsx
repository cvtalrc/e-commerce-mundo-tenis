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

{/*********** FALTA LOGIN Y SIGNIN **********/ }
const Layout = () => {
    return (
        <React.Fragment>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} /> {/*pagina de inicio (vista principal) */}
                <Route path="/:sport" element={<Sports />} /> {/*pagina por deporte (tenis, padel) */}
                <Route path="/:sport/:category" element={<Categories />} /> {/*pagina por deporte y categorías (zap, cuerdas, etc) */}
                <Route path="/:sport/:category/:id" element={<Product />} /> {/*pagina por producto en específico */}
                <Route path="/order" element={<Order />} /> {/*pedido (carrito de compras) */}
            </Routes>
            <Footer />
        </React.Fragment>
    );
};

export default injectContext(Layout);