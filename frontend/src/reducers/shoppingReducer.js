import axios from 'axios'

const rute = "http://localhost:3000/api"

axios.post(`${rute}/sign-in`, {
    email: data.get('email'),
    pass: data.get('password'),
}) 
//Realiza las acciones necesarias con la respuesta del backend
.then((response) => {
    console.log('Respuesta del backend:', response.data);
    if(response.data.message == "Ingreso de usuario exitoso"){
        const userName = response.data.name
        handleLogin(userName)
        console.log(response.data.name)
        Toast(
            'bottom-end',
            'success',
            'Se ha iniciado sesión'
        )
        navigate('/')
    }
})
// Maneja el error de la solicitud
.catch((error) => {
    console.error('Error en la solicitud:', error);
});

export const shoppingInitialState = {

}