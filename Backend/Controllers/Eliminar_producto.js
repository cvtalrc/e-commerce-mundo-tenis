const Producto = require("../Models/Producto");

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
module.exports = {
    remove,
};