import { createContext, useContext, useEffect, useState } from "react";
import { helpHttp } from "../helpers/helpHttp";
import { useNavigate } from 'react-router-dom';
import { Toast } from '../components/Alerts/Toast';
import { Modal } from '../components/Alerts/Modal';
import jwtDecode from 'jwt-decode';
import { BASE_API_URL } from "../../config";
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
                let decodedUser = jwtDecode(token);
                setUser(decodedUser)
            }
        }
    }, [token]);

    const navigate = useNavigate();

    const logIn = (form) => {
        let url = `${BASE_API_URL}/sign-in`;

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
                            `Bienvenido, ${decodedUser.name}`
                        )
                        navigate('/admin');
                    } else {
                        Toast(
                            'bottom-end',
                            'success',
                            `Bienvenid@, ${decodedUser.name}`
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
        let url = `${BASE_API_URL}/sign-out`;
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
                    const result = await Modal('Cierre de sesión', '¿Deseas cerrar tu sesión?', 'question');
                    if (result.isConfirmed) {
                        setToken(null);
                        setUser(null);
                        localStorage.removeItem('user');
                        await Modal('Cierre de sesión exitoso', '¡Hasta la próxima!', 'success');
                        navigate('/');
                    }
                }
            })
    }

    const updateUserData = async (form) => {
        let url = `${BASE_API_URL}/user/update/${user._id}`;
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

                    let url = `${BASE_API_URL}/sign-out`;
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
                                    setToken(null);
                                    setUser(null);
                                    localStorage.removeItem('user');
                                    navigate('/');
                            }
                        })
                    

                    // // localStorage.setItem('user', res.newToken);
                    // // setToken(res.newToken);
                    // // let decodedUser = jwtDecode(res.newToken);
                    // // console.log('usuario nuevo', decodedUser._doc)
                    // // setUser(decodedUser._doc); eso se supone que es la actualizacion del usuario pal contexto
                    // no me acuerdo

                }
            })
            .catch((err) => {
                console.error("error del catch", err)
            })
        return user;
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