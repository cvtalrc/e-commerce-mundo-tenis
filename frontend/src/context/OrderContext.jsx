import { createContext, useContext, useEffect, useState } from "react";
import UserContext from "./UserContext";

const OrderContext = createContext();

const OrderProvider = ({ children }) => {
    const { user } = useContext(UserContext)
    const [form, setForm] = useState(null)

    useEffect(() => {
        if (user != null) {
            const initialForm = { //datos de envío
                type: "", //delivery, retiro
                name: user.name,
                lastname: user.lastname,
                address: user.address,
                addressNumber: "",
                region: "",
                comuna: "",
                cellNumber: user.cellnumber,
                instructions: ""
            };
            setForm(initialForm)
        }

    }, [user]);
    // let api = helpHttp();
    // let url = `http://localhost:3000/api/cart/${email}`;



    const data = {
        form,
        setForm
    };

    return <OrderContext.Provider value={data}>{children}</OrderContext.Provider>;
};

export { OrderProvider };
export default OrderContext;