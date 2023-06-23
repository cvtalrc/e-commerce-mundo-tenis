const mongoose = require("mongoose");
const orderschema = mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  cart: {
    type: Array,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  deliveryType: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Order", orderschema);
