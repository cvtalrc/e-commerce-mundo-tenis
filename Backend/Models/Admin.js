const mongoose = require("mongoose");
const userschema = mongoose.Schema({
    user: String,
    pass: String
        
});

module.exports = mongoose.model("User",userschema);