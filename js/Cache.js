const mongoose = require('mongoose');

const cacheSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600 // Expira após 1 hora
  }
});

const Cache = mongoose.model('Cache', cacheSchema);

module.exports = Cache;