const mongoose = require("mongoose");

const cartschema = mongoose.Schema({
  sessionID: String,
  items: [
    {
      TitleProduct: { type: String, required: true },
      Size: String,
      Quantity: { type: Number, default: 1 },
      price: { type: Number, required: true },
    },
  ],
  total: { type: Number, default: 0, required: true },
});

module.exports = mongoose.model("guestShoppingCart", cartschema);