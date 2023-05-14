import React, {useState} from "react";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import ReactDOM from "react-dom";

import "./App.css";

export default function adminLogin() {
    //estados de react
    const [errorMessages, setErrorMessages] = useState({}); //almacena objeto con nombre del campo y msj de error
    const [isSubmitted, setIsSubmitted] = useState(false); //bool que indica envio del formulario

    //se definen los parámetros necesarios de validación, conectar bdd
    const data = [
        {
            username: "admin@administrador.cl",
            password: "administrador1"
        }
    ];

    const errors = {
        aemail: "correo de administrador inválido.",
        apassword: "contraseña incorrecta."
    };

    //Función para manejar envío del formulario
    const submitHandler = (event) => {
        //previene la recarga de la página
        event.preventDefault();

        var {aemail, apassword} = document.forms[0];

        //encontrar info del admin
        const adminData = data.find((user) => user.username === aemail.value);
        //console.log(aemail.value, ' ', adminData.username)
        //comparar info del admin
        if (adminData) {
            if (adminData.password !== apassword.value) {
                //contraseña incorrecta
                setErrorMessages({name: "password", message: errors.apassword});
            } else {
                setIsSubmitted(true);
            }
        } else {
            //correo de admin no encontrado
            setErrorMessages({name: "email", message: errors.aemail});
        }
    };
    
    //se genera un código JSX para mensaje de error
    const renderErrorMessage = (errorName) =>
    errorName === errorMessages.name && (
        <div className="error">{errorMessages.message}</div>
    );

    const renderForm = (
        <div className="form">
            <form onSubmit={submitHandler}>
                <div className="input-container">
                    <label>Correo electrónico</label>
                    <input type="email" name="aemail" id="admin-email" required/>
                    {renderErrorMessage("aemail")}
                </div>
                <div className="input-container">
                    <label>Contraseña</label>
                    <input type="password" name="apassword" id="admin-password" required/>
                    {renderErrorMessage("apassword")}
                </div>
                <div className="button-container">
                    <Button variant="contained" color="secondary" component={Link} to="/prueba">Ingresar</Button>
                </div>
            </form>
        </div>
    );

    return (
        <div className="app">
            <div className="login-form">
                <div className="title">Inicie sesión</div>
                {isSubmitted ? <div>El usuario ha ingresado correctamente</div> : renderForm}
            </div>
        </div>
    );    
}
