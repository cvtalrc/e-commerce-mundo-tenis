import { createContext, useEffect, useState } from "react";
import { helpHttp } from "../helpers/helpHttp";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState(null); //usuarios
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    let api = helpHttp();
    let url = "http://localhost:3000/api/user/";

    useEffect(() => {
        //setLoading(true);
        api
            .get(url)
            .then((res) => {
                console.log(res);
                if (!res.err) {
                    setUsers(res);
                    setError(null);
                } else {
                    setUsers(null);
                    setError(res);
                }
                //setLoading(false);
            });
    }, [url]);

    const getUser = (email) => {
        const foundUser = users.find((user) => user.email === email);
    }

    const data = {
        users,
        getUser,
        error,
        loading
    };

    return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

export { UserProvider };
export default UserContext;