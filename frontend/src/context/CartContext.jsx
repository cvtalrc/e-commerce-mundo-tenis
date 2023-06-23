import { createContext, useEffect, useState, useContext } from "react";
import { helpHttp } from "../helpers/helpHttp";
import { useNavigate } from 'react-router-dom';
import UserContext from "./UserContext";

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { user, token } = useContext(UserContext);

    const initialForm = {
        User: "",
        TitleProduct: "",
        Size: "",
        Quantity: ""
    };

    const [form, setForm] = useState(initialForm);

    const email = user != null ? user.email : '';
    if (user != null) {
        console.log("usuario dentro del contexto del carro ", user.email)
    }

    let api = helpHttp();
    let url = `http://localhost:3000/api/cart/${email}`;

    useEffect(() => {
        //setLoading(true);
        let options = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if (email != '') {
            api
                .get(url, options)
                .then((res) => {
                    console.log(res);
                    if (!res.err) {
                        setCartProducts(res.data.items);
                        setTotalPrice(res.data.total);
                        setError(null);
                    } else {
                        setCartProducts(null);
                        setError(res);
                    }
                });
        }

    }, [url]);

    useEffect(() => {


    }, [cartProducts])

    const addToCart = (_id, title, size, quantity) => {
        const urlAdd = `http://localhost:3000/API/cart/add`
        form.User = email
        form.TitleProduct = title
        form.Size = size
        form.Quantity = quantity

        console.log({ ...form })
        console.log("token ls", localStorage.getItem('user'))

        let options = {
            body: form,
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${token}`
            },

        };

        api
            .post(urlAdd, options)
            .then((res) => {
                if (!res.err) {
                    console.log(res);
                    setCartProducts(res.items);
                }
            })
            .catch((e) => {
                console.error(e);
            });

        setForm(initialForm);
    };

    const delFromCart = (title, size, quantity) => { //eliminando de a uno
        const urlDel = "http://localhost:3000/API/cart/remove"
        form.User = email
        form.TitleProduct = title
        form.Size = size
        form.Quantity = quantity

        let options = {
            body: form,
            headers: {
                Authorization: `Bearer ${token}`,
                "content-type": "application/json"
            },
        };

        api
            .post(urlDel, options)
            .then((res) => {
                if (!res.err) {
                    console.log(res);
                    let newData = cartProducts.filter((el) => el.TitleProduct !== title);
                    setCartProducts(newData);
                }
            })
            .catch((e) => {
                console.error(e);
            });
    };


    const data = {
        cartProducts,
        totalPrice,
        addToCart,
        form,
        setForm,
        delFromCart,
        error,
        loading
    };

    return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

export { CartProvider };
export default CartContext;