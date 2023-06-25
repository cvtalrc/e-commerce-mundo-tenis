import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from "./components/navbar/Navbar";
import Home from "./views/home/Home";
import Categories from "./views/categories/Categories";
import Sports from "./views/sports/Sports";
import Product from "./views/product/Product";
import Order from "./views/order/Order";
import Footer from "./components/footer/Footer";
import React, { useContext, useEffect } from 'react';
import Login from './views/login/Login';
import Admin from './views/admin/Admin';
import NewAccount from './views/register/Register';
import { useState } from 'react'
import { Modal } from './components/Alerts/Modal';
import { ProductsProvider } from './context/ProductsContext';
import Search from './views/search/Search';
import { UserProvider } from './context/UserContext';
import { CartProvider } from './context/CartContext';
import { CrudProvider } from './context/CrudContext';
import  Payment from './views/payment/Payment';
import { OrderProvider } from './context/OrderContext';

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
        title: "Register",
        path: "/register"
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

function App() {

    return (
        <React.Fragment>
            <UserProvider>
                <ProductsProvider>
                    <CartProvider>
                        <CrudProvider>
                            <OrderProvider>
                            <Navbar navArrayLinks={navArrayLinks} />
                            <Routes>
                                <Route path="/" element={<Home />} /> {/*pagina de inicio (vista principal) */}
                                <Route path="/login" element={<Login />} />
                                <Route path="/register" element={<NewAccount />} />
                                <Route path="/:sport" element={<Sports />} /> {/*pagina por deporte (tenis, padel) */}
                                <Route path="/:sport/:category" element={<Categories />} /> {/*pagina por deporte y categorías (zap, cuerdas, etc) */}
                                <Route path="/:sport/:category/:id" element={<Product />} /> {/*pagina por producto en específico */}
                                <Route path="/order" element={<Order />} /> {/*pedido (carrito de compras) */}
                                <Route path="/admin" element={<Admin />} /> {/*pedido (carrito de compras) */}
                                <Route path="/search" element={<Search />} />
                                {/* <Route path="/payment" element={<Payment />} /> */}
                            </Routes>
                            <Footer />
                            </OrderProvider>
                        </CrudProvider>
                    </CartProvider>
                </ProductsProvider>
            </UserProvider>
        </React.Fragment>
    );
};

export default App;