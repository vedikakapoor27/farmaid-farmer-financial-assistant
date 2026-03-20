const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  landArea: {
    type: Number,
    default: 0
  },
  cropType: {
    type: String,
    default: 'Rice'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);