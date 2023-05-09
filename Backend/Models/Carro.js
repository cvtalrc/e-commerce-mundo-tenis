const mongoose = require("mongoose");
const cartschema = mongoose.Schema({
    items:[{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' },
        cantidad: { type: Number, default: 1 },
        precio: { type: Number, required: true },
    }],
    total:{type:Number,required:true},  
});

module.exports = mongoose.model("Carro",cartschema);