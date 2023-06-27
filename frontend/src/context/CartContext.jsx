import { createContext, useEffect, useState, useContext } from "react";
import { helpHttp } from "../helpers/helpHttp";
import UserContext from "./UserContext";
import { Toast } from "../components/Alerts/Toast";

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { user, token } = useContext(UserContext);
    let totalCartPrice = 0

    const initialForm = {
        userID: "",
        idProduct: "",
        Size: "",
        Quantity: ""
    };

    const [form, setForm] = useState(initialForm);

    const idUser = user != null ? user._id : ''

    useEffect(() => {
        if (user === null) {
            setCartProducts(null)
        }
    }, [user]);

    let api = helpHttp();
    let url = `http://localhost:3000/api/cart/${idUser}`;

    //console.log('email: ', email)

    useEffect(() => {
        let options = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if (idUser != '') {
            api
                .get(url, options)
                .then((res) => {
                    console.log(res);
                    if (!res.err) {
                        //console.log("productos en el carro", email + '' + res.data.items)
                        setCartProducts(res.cart.items);
                        setTotalPrice(res.cart.total);
                        setError(null);
                    } else {
                        setCartProducts(null);
                        setError(res);
                    }
                });
        }

    }, [url]);

    const addToCart = (_id, size, quantity) => {
        const urlAdd = `http://localhost:3000/API/cart/add`
        form.userID = idUser
        form.idProduct = _id
        form.Size = size
        form.Quantity = quantity
        console.log(form)
        console.log("token carro", token)

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
                    setCartProducts(res.cart.items);
                    setTotalPrice(res.cart.total);
                }
            })
            .catch((e) => {
                console.error(e);
            });

        setForm(initialForm);
    };

    const delFromCart = (_id, size, quantity) => { //eliminando de a uno
        const urlDel = "http://localhost:3000/API/cart/remove"
        form.userID = idUser
        form.idProduct = _id
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
            .del(urlDel, options)
            .then((res) => {
                if (!res.err) {
                    console.log(res.cart);
                    let newData = cartProducts.filter((el) => el.idProduct !== _id);
                    setCartProducts(newData);
                    console.log("newData", newData)
                    Toast (
                        'bottom-right',
                        'success',
                        'Se eliminó el producto'
                    )
                    setTotalPrice(newData.forEach(el => {
                        totalCartPrice += el.price;
                    }));
                    setTotalPrice(totalCartPrice)
                }
            })
            .catch((e) => {
                console.error(e);
            });
    };


    const data = {
        cartProducts,
        setCartProducts,
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