const mongoose = require("mongoose");
const userschema = mongoose.Schema({
    name: String,
    pass: String,
    rut: String,
    type: String,
});

module.exports = mongoose.model("User",userschema);