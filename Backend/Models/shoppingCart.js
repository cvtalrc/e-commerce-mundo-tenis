const mongoose = require("mongoose");

const cartschema = mongoose.Schema({
  user: String,
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    amount: { type: Number, default: 1 },
    price: { type: Number, required: true },
    total_product: {type: Number, required: true}
  }],
  total: { type: Number, default:1, required: true },
});

module.exports = mongoose.model("shoppingCart", cartschema);