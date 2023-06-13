import { createContext, useEffect, useState } from "react";
import { helpHttp } from "../helpers/helpHttp";
import { useNavigate } from 'react-router-dom';

const CartContext = createContext();

const CartProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [addToCartTrigger, setAddToCartTrigger] = useState(false);
    const [delFromCartTrigger, setDelFromCartTrigger] = useState(false);
    
    const initialForm = {
        User: "",
        TitleProduct: "",
        Size: "",
        Quantity: ""
    };
    
    const [form, setForm] = useState(initialForm);

    const email = localStorage.getItem('userEmail');

    const handleReset = (e) => {
        setForm(initialForm);
    };

    let api = helpHttp();
    let url = `http://localhost:3000/api/cart/${email}`;

    const addToCart = (_id, title, size, quantity) => {
        url = `http://localhost:3000/API/cart/add`
        form.User = email
        form.TitleProduct = title
        form.Size = size
        form.Quantity = quantity

        console.log({ ...form })

        let options = {
        body: form,
        headers: { "content-type": "application/json" },
        };

        api
        .post(url, options)
        .then((res) => {
            if (!res.err) {
            console.log(res);
            setAddToCartTrigger(true); // Actualiza el estado para disparar el efecto
            }
        })
        .catch((e) => {
            console.error(e);
        });

        handleReset()
    };

//     const delFromCart = (title, size, quantity) => { //eliminando de a uno
//         url = "http://localhost:3000/API/cart/remove"
//         form.User = email
//         form.TitleProduct = title
//         form.Size = size
//         form.Quantity = quantity

//         console.log({... form})

//         let options = {
//             body: form,
//             headers: { "content-type": "application/json" },
//         };

//         api
//         .post(url, options)
//         .then((res) => {
//             if (!res.err) {
//             console.log(res);
//             setDelFromCartTrigger(true); // Actualiza el estado para disparar el efecto
//             }
//         })
//         .catch((e) => {
//             console.error(e);
//         });

//         handleReset()
//     //     const clearCart = () => {
//     //  dispatch({ type: TYPES.CLEAR_CART });
//    };
    
    useEffect(() => {
        //setLoading(true);
        api
            .get(url)
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
                //setLoading(false);
            });
    }, [url]);

    useEffect(() => {
        if (addToCartTrigger) {
            setAddToCartTrigger(false); // Reinicia el estado para futuras llamadas
        } else if (delFromCartTrigger) {
            setDelFromCartTrigger(false);
        }
    }, [addToCartTrigger, delFromCartTrigger]);


    const data = {
        cartProducts,
        totalPrice,
        addToCart,
        form, 
        setForm,
        //delFromCart,
        error,
        loading
    };

    return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
};

export { CartProvider };
export default CartContext;