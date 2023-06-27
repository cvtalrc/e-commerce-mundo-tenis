import { createContext, useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";
import { helpHttp } from "../helpers/helpHttp";

const OrderContext = createContext();

const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState(null)
    const { user, token } = useContext(UserContext);
    const [userOrders, setUserOrders] = useState([]);
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    //consulta a la api x todas las ordenes de compra

    let api = helpHttp();
    let url = "http://localhost:3000/api/order";

    useEffect(() => {

        let options = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        api
            .get(url, options)
            .then((res) => {
                //console.log(res);
                if (!res.err) {
                    setOrders(res.orders);
                    console.log(res.orders)
                    setError(null);
              
                } else {
                    setOrders(null);
                    setError(res);
                }
                //setLoading(false);
            });
    }, [url]);

    // function orderByUser(userId){
        
    //     const userOrders = orders.filter((el) => {
    //         el.User._id === userId
    //     })

    //     console.log('pedidos del usuario ' + userId + ':' + userOrders)
    // }

    const data = {
        orders
    };
    
    return <OrderContext.Provider value={data}>{children}</OrderContext.Provider>;
};

export { OrderProvider };
export default OrderContext;