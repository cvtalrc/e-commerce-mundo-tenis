const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  User: {
    type: Object,
    required: true,
  },
  Details: {
    type: Object,
    required: true,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
