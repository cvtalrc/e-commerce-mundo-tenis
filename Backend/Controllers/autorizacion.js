const Admin = require("../Models/Admin");

function register(req,res){
    const {user, pass} =req.body;
    if(!user) res.status(400).send({msj:"El usuario es obligatorio"});
    if(!pass) res.status(400).send({msj:"La contraseña es obligatoria"});

    const usuario = new Admin({
        user,
        pass
    });

    usuario.save((error,userStorage)=>{
        if(error){
            return res.status(400).send({msj:"Error al crear el usuario, intentar nuevamente"});
        }else{
            res.status(200).send(userStorage);
        }
    });

}

module.exports = {
    register,
};