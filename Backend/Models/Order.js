const mongoose = require("mongoose");
const orderschema = mongoose.Schema({
  User: {
    type: Object,
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
    // region
    // comuna
    // cellNumber
    // email
    // instructions                               
    type: Object,
    required: true,
  },
  Status: { //pendientPayment, Paid, Entregado
    type: String,
    required: true,
  },  
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Order", orderschema);
