const mongoose = require('mongoose');

// Schema per un utente registrato
const utenteRegistratoSchema = new mongoose.Schema({
  username: { type: String, required: true }, // Nome utente
  email: { type: String, required: true },     // Email di contatto
  telefono: { type: String, required: true },  // Numero di telefono
});

// Creo il modello e specifico la collezione 'utentiRegistrati'
const UtenteRegistrato = mongoose.model('UtenteRegistrato', utenteRegistratoSchema, 'utentiRegistrati');

module.exports = UtenteRegistrato;