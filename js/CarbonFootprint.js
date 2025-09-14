const mongoose = require('mongoose');

const footprintSchema = new mongoose.Schema({
  total: {
    type: Number,
    required: true,
    min: 0
  },
  details: {
    transporte: Number,
    energia: Number,
    alimentacao: Number,
    residencia: Number,
    consumo: Number
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

footprintSchema.index({ user: 1, date: -1 });

const CarbonFootprint = mongoose.model('CarbonFootprint', footprintSchema);

module.exports = CarbonFootprint;