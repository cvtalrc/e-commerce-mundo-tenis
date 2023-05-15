const mongoose = require("mongoose");
const Productschema = mongoose.Schema({
    title: String,
    brand: String,
    price: Number,
    description: String,
    sport: String,
    category: String,
    imgUrl: String
    
});

module.exports = mongoose.model("Product",Productschema);