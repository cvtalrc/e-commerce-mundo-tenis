const mongoose = require("mongoose");
const productoschema = mongoose.Schema({
    nombre: String,
    marca: String,
    detalles: String,
    precio: Number,
    foto: String     
});

module.exports = mongoose.model("Producto",productoschema);