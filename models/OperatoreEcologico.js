const mongoose = require('mongoose');

const OperatoreEcologicoSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  telefono: { type: String },
  id_lavorativo: { type: String, required: true, unique: true },
  zona: { type: String, required: true }
});

module.exports = mongoose.model('OperatoreEcologico', OperatoreEcologicoSchema);