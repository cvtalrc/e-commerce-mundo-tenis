import { createContext, useEffect, useState } from "react";
import { helpHttp } from "../helpers/helpHttp";
import { useNavigate } from 'react-router-dom';
import { Toast } from '../components/Alerts/Toast'
import jwtDecode from 'jwt-decode';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState(null); //usuarios
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    let api = helpHttp();
    let url = "http://localhost:3000/api/user/";

    useEffect(() => {
        //setLoading(true);
        api
            .get(url)
            .then((res) => {
                //console.log(res);
                if (!res.err) {
                    console.log(res)
                    setUsers(res);
                    setError(null);
                } else {
                    setUsers(null);
                    setError(res);
                }
                //setLoading(false);
            });
    }, [url]);

    useEffect(() => {
        console.log(user)
    }, [user]);

    const logIn = (form) => {
        let api = helpHttp();
        let url = 'http://localhost:3000/api/sign-in';
        
        let options = {
            body: form,
            headers: { "content-type": "application/json" },
        };

        api
            .post(url, options)
            .then((res) => {
                if (!res.err) {
                    localStorage.setItem('user', res.accessToken);
                    let decodedUser = jwtDecode(res.accessToken);
                    console.log("usuario decodificado ", decodedUser);
                    setUser(decodedUser);
                    
                    Toast(
                        'bottom-end',
                        'success',
                        'Se ha iniciado sesión'
                      )
                    navigate('/');
                } else {
                    console.log(res.err)
                } 
            })
            .catch(e => {
                prompt(e);
            })  
    }

    const logOut = () => {
        let url = 'http://localhost:3000/api/sign-out';
    }

    // const createCart = (email) => {

    // }

    const data = {
        users,
        user,
        logIn,
        logOut,
        error,
        loading
    };

    return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

export { UserProvider };
export default UserContext;