const mongoose = require("mongoose");
const Productschema = mongoose.Schema({
  title: String,
  brand: String,
  price: Number,
  description: String,
  stock: Array, // stock[size][quantity]
  sport: String,
  category: String,
  imgUrl: String,
  sale: Boolean,
  percentageSale: Number,
});

module.exports = mongoose.model("Product", Productschema);
