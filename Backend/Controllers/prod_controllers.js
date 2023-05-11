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


function remove(req,res){
    const {id} =req.body;
    Producto.deleteOne({_id:id},(error)=>{
        if(error){
            return res.status(400).send({msj:"Error al eliminar el producto"});
        }else{
            res.status(200).send({msj:"Producto eliminado exitosamente"});
        }
    });
}

function get(req,res){
    Producto.find({},(error,productos)=>{
        if(error){
            return res.status(400).send({msj:"No se pudo encontrar los productos"});
        }else{
            res.status(200).send(productos);
        }
    });

}


module.exports = {
    add,
    remove,
    get,
};
