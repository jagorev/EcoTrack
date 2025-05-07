// models/UtenteRegistrato.js
const mongoose = require('mongoose');

const utenteRegistratoSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  telefono: { type: String, required: true },
  gestorePrenotazioni: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Prenotazione' }]
});

// Creo il Model
const UtenteRegistrato = mongoose.model('UtenteRegistrato', utenteRegistratoSchema, 'utentiRegistrati');

module.exports = UtenteRegistrato;