const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
  },
  comuna: {
    type: String,
    required: true,
  },
  cellNumber: {
    type: String,
    required: true,
  },
  type: {
    type: String, 
    required: true,
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
