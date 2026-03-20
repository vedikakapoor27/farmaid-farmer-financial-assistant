const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['income', 'expense'],
    required: true
  },
  category: {
    type: String,
    enum: [
      'Seeds', 'Fertilizer', 'Irrigation',
      'Labor', 'Equipment', 'Crop Sale',
      'Government Aid', 'Other'
    ],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  cropName: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);