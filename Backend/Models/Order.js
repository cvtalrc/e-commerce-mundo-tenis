const mongoose = require("mongoose");
const orderschema = mongoose.Schema({
  User: {
    type: Object,
    ref: "Order",
    required: true,
  },
  Cart: {
    type: Array,
    required: true,
  },
  Delivery: { 
    // name
    // lastName
    // address
    // addressNumber
    // region
    // comuna
    // cellNumber
    // email
    // instructions                               
    type: Object,
    required: true,
  },
  Status: { //pendiente, en curso, entregado
    type: String,
    required: true,
  },  
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Order", orderschema);
