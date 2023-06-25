import { createContext, useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";
import { helpHttp } from "../helpers/helpHttp";

const OrderContext = createContext();

const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)

    //consulta a la api x todas las ordenes de compra

    let api = helpHttp();
    let url = "http://localhost:3000/api/order";

    useEffect(() => {
        //setLoading(true);
        api
            .get(url)
            .then((res) => {
                //console.log(res);
                if (!res.err) {
                    setOrders(res);
                    const userID = res.User 
                    url = "http://localhost:3000/api/order"

                    setError(null);
                } else {
                    setOrders(null);
                    setError(res);
                }
                //setLoading(false);
            });
    }, [url]);

    const data = {
        orders
    };

    return <OrderContext.Provider value={data}>{children}</OrderContext.Provider>;
};

export { OrderProvider };
export default OrderContext;