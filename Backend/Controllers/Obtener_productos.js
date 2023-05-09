const Producto = require("../Models/Producto");

function get(req,res){
    Producto.find({},(error,productos)=>{
        if(error){
            return res.status(400).send({msj:"No se pudo encontrar los productos"});
        }else{
            res.status(200).send(productos);
        }
    });

}

module.exports ={
    get,
}