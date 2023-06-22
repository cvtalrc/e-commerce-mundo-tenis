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
    const [addToCartTrigger, setAddToCartTrigger] = useState(false);
    const [delFromCartTrigger, setDelFromCartTrigger] = useState(false);
    const { user } = useContext(UserContext);
    
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
    let options = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem(user)}`
    }

    useEffect(() => {
        //setLoading(true);
        
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
                //setLoading(false);
            });
    }, [url]);

    const addToCart = (_id, title, size, quantity) => {
        url = `http://localhost:3000/API/cart/add`
        form.User = email
        form.TitleProduct = title
        form.Size = size
        form.Quantity = quantity

        console.log({ ...form })
        console.log("token ls", localStorage.getItem(user))

        let options = {
        body: form,
        headers: { "content-type": "application/json", 
                    Authorization: `Bearer ${localStorage.getItem('user')}`
        },

        };

        api
        .post(url, options)
        .then((res) => {
            if (!res.err) {
            console.log(res);
            setCartProducts([...cartProducts, res]);
            //setAddToCartTrigger(true); // Actualiza el estado para disparar el efecto
            }
        })
        .catch((e) => {
            console.error(e);
        });

        setForm(initialForm);
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

    // useEffect(() => {
    //     if (addToCartTrigger) {
    //         setAddToCartTrigger(false); // Reinicia el estado para futuras llamadas
    //     } else if (delFromCartTrigger) {
    //         setDelFromCartTrigger(false);
    //     }
    // }, [addToCartTrigger, delFromCartTrigger]);


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