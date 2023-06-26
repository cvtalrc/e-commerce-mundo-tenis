import { createContext, useContext, useEffect, useState } from "react";
import { helpHttp } from "../helpers/helpHttp";
import { useNavigate } from 'react-router-dom';
import { Toast } from '../components/Alerts/Toast';
import { Modal } from '../components/Alerts/Modal';
import jwtDecode from 'jwt-decode';
import Swal from 'sweetalert2'
import CartContext from "./CartContext";

const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('user'));
    const api = helpHttp();
    const localStorageData = { ...localStorage };

    useEffect(() => {
        if (localStorageData != undefined) { //evita el error n
            if (localStorage.getItem('user')) {
                setToken(localStorage.getItem('user'))
                let decodedUser = jwtDecode(localStorage.getItem('user'));
                setUser(decodedUser._doc)
            }
        }
    }, [localStorage.getItem('user')]);

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
                    if (decodedUser.type === 'admin') {
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
                    Modal(
                        'Error al iniciar sesión',
                        'Los datos ingresados son incorrectos',
                        'error',
                        ''
                    )
                }
            })
            .catch(e => {
                console.error(e)
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
            .then(async (res) => {
                if (res.err) {
                    console.error(res.err)
                } else {
                    const modalResult = await Modal(
                        'Cierre de sesión',
                        '¿Deseas cerrar tu sesión?',
                        'question',
                        '¡Hasta la próxima!'
                    )
                    if (modalResult.confirmed) {
                        setToken(null);
                        setUser(null);
                        localStorage.removeItem('user');
                    }
                }
            })
    }

    const updateUserData = async (form) => {
        let url = `http://localhost:3000/api/user/update/${user._id}`;
        let options = {
            body: form,
            headers: {
                Authorization: `Bearer ${token}`,
                'content-type': 'application/json'
            }
        }

        api
            .put(url, options)
            .then((res) => {
                if (!res.err) {
                    localStorage.removeItem('user');

                    const localStorageAux = { ...localStorage }
                    console.log(localStorageAux)

                    localStorage.setItem('user', res.newToken);
                    setToken(res.newToken);
                    let decodedUser = jwtDecode(res.newToken);
                    console.log('usuario nuevo', decodedUser._doc)
                    setUser(decodedUser._doc);
                    
                }
            })
            .catch((err) => {
                console.error("error del catch", err)
            })
            return  user;
    }

    const data = {
        user,
        setUser,
        logIn,
        logOut,
        updateUserData,
        token,
        error,
        loading
    };

    return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};

export { UserProvider };
export default UserContext;