import { createContext, useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";

const OrderContext = createContext();

const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState(null)

    //consulta a la api x todas las ordenes de compra

    const data = {
        orders
    };

    return <OrderContext.Provider value={data}>{children}</OrderContext.Provider>;
};

export { OrderProvider };
export default OrderContext;