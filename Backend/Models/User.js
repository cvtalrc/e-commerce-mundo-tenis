const mongoose = require("mongoose");
const userschema = mongoose.Schema({
  name: String,
  lastname: String,
  email: String,
  pass: String,
  rut: String,
  address: String,
  type: String,
});

module.exports = mongoose.model("User", userschema);
