const Producto = require("../Models/Producto");

function add(req, res){
    const {nombre,marca,detalles,precio, foto}=req.body;
    
    const producto = new Producto({
        nombre,
        marca,
        detalles,
        precio,
        foto
    });
    producto.save((error,prodStorage)=>{
        if(error){
            return res.status(400).send({msj:"Error al crear el usuario, intentar nuevamente"});
        }else{
            res.status(200).send(prodStorage);
        }
    });
}
module.exports = {
    add,
};
