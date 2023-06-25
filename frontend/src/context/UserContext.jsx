import { createContext, useEffect, useState } from "react";
import { helpHttp } from "../helpers/helpHttp";
import { useNavigate } from 'react-router-dom';
import { Toast } from '../components/Alerts/Toast';
import { Modal }from '../components/Alerts/Modal';
import jwtDecode from 'jwt-decode';

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('user'))
    const api = helpHttp();

    useEffect(() => {
        if(localStorage.getItem('user')){
            setToken(localStorage.getItem('user'))
            let decodedUser = jwtDecode(token);
            setUser(decodedUser)
            console.log(decodedUser)
            console.log("con token",token)
        } else {
            console.log("sin token",token)
        }
    }, [token]);

    const navigate = useNavigate();

    const logIn = (form) => {
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
                    setToken(res.accessToken);
                    let decodedUser = jwtDecode(res.accessToken);
                    setUser(decodedUser);
                    if (decodedUser.type === 'admin'){
                        Toast(
                            'bottom-end',
                            'success',
                            'Se ha iniciado sesión'
                          )
                        navigate('/admin');
                    } else {
                        Toast(
                            'bottom-end',
                            'success',
                            'Se ha iniciado sesión'
                          )
                        navigate('/');
                    }
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
        let options = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('user')}`,
                'content-type': 'application/json'
            }
        };

        api
            .post(url, options)
            .then( async (res) => {
                if(res.err){
                    console.error(res.err)
                } else {
                    const modalResult = await Modal (
                        'Cierre de sesión',
                        'Se cerrará tu sesión actual.',
                        'warning',
                        '¡Hasta la próxima!'
                    )
                    if(modalResult.confirmed){
                        setToken(null);
                        setUser(null);
                        localStorage.removeItem('user');
                    }
                }
            })
    }

    const register = () => {
        
    }

    const data = {
        user,
        logIn,
        logOut,
        token,
        error,
        loading
    };

    return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

export { UserProvider };
export default UserContext;