const mongoose = require('mongoose');

const cropSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cropName: {
    type: String,
    required: true
  },
  season: {
    type: String,
    enum: ['Kharif', 'Rabi', 'Zaid'],
    required: true
  },
  areaHectares: {
    type: Number,
    required: true
  },
  soilType: {
    type: String,
    enum: ['Clay', 'Sandy', 'Loamy', 'Black'],
    required: true
  },
  sowingDate: {
    type: Date,
    required: true
  },
  expectedHarvestDate: {
    type: Date
  },
  actualYield: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Growing', 'Harvested', 'Failed'],
    default: 'Growing'
  }
}, { timestamps: true });

module.exports = mongoose.model('Crop', cropSchema);