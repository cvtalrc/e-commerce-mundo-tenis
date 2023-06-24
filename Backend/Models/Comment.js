const mongoose = require('mongoose');
const commentschema = mongoose.Schema({
  Author: {
    type: String,
    required: true
  },
  Star: {
    type: Number,
    required: true
  },
  Content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }  
});

module.exports = mongoose.model('Comment', commentschema);