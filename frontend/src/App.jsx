import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/navbar/Navbar";
import Home from "./views/home/Home";
import Categories from "./views/categories/Categories";
import Sports from "./views/sports/Sports";
import Product from "./views/product/Product";
import Order from "./views/order/Order";
import Footer from "./components/footer/Footer";
import React from 'react';
import Login from './views/login/Login';
import NewAccount from './views/register/Register';
import Ticket from './views/ticket/Ticket';
import { ProductsProvider } from './context/ProductsContext';
import Search from './views/search/Search';
import { UserProvider } from './context/UserContext';
import { CartProvider } from './context/CartContext';
import { CrudProvider } from './context/CrudContext';
import Payment from './components/payment/Payment';
import { OrderProvider } from './context/OrderContext';
import User from './views/user/User';
import AboutUs from './views/aboutUs/AboutUs';
import ResetPassword from './views/resetPass/ResetPassword';
import ResetPass from './views/resetPass/ResetPass';
import EmailConfirm from './views/emailConfirm/EmailConfirm';
import EmailValidation from './components/emailValidation/emailValidation';
import Admin from './views/admin/Admin';
import NotFound from './views/notFound/NotFound';
import TicketError from './views/ticket/TicketError';

function App() {

    return (
        <React.Fragment>
            <UserProvider>
                <CartProvider>
                    <ProductsProvider>
                        <CrudProvider>
                            <OrderProvider>
                                <Navbar  />
                                <Routes>
                                    <Route path="/" element={<Home />} /> {/*pagina de inicio (vista principal) */}
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/register" element={<NewAccount />} />
                                    <Route path="/:sport" element={<Sports />} /> {/*pagina por deporte (tenis, padel) */}
                                    <Route path="/:sport/:category" element={<Categories />} /> {/*pagina por deporte y categorías (zap, cuerdas, etc) */}
                                    <Route path="/:sport/:category/:id" element={<Product />} /> {/*pagina por producto en específico */}
                                    <Route path="/order" element={<Order />} /> 
                                    <Route path="/admin" element={<Admin/>} /> 
                                    <Route path="/search" element={<Search />} />
                                    <Route path="/user/:user" element={<User/>} />
                                    <Route path="/payment" element={<Payment />} />
                                    <Route path="/ticket" element={<Ticket />} />
                                    <Route path="/ticket-error" element={<TicketError />} />
                                    <Route path="/about-us" element={<AboutUs />} />
                                    <Route path='/reset-password' element={<ResetPassword />} />
                                    <Route path="/reset-pass" element={<ResetPass />} />
                                    <Route path="/email-confirm" element={<EmailConfirm />} />
                                    <Route path="/email-validate" element={<EmailValidation />} />
                                    <Route path="*" element={<NotFound />} />
                                </Routes>
                                <Footer />
                            </OrderProvider>
                        </CrudProvider>
                    </ProductsProvider>
                </CartProvider>
            </UserProvider>
        </React.Fragment>
    );
};

export default App;