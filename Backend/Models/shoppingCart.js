const mongoose = require("mongoose");

const cartschema = mongoose.Schema({
  User: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [
    {
      idProduct : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      TitleProduct: {
        type: String, 
        required: true 
      },
      Size: {
        type: String
      },
      Quantity: { 
        type: Number, 
        required: true
      },
      price: {
        type: Number, 
        required: true 
      },
    },
  ],
  total: { 
    type: Number, 
    default: 0, 
    required: true 
  },
});

module.exports = mongoose.model("shoppingCart", cartschema);
