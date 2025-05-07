const mongoose = require('mongoose');

// Schema per un utente anonimo
const utenteAnonimoSchema = new mongoose.Schema({
  segnalazioni: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Segnalazione' // Lista di segnalazioni fatte dall'utente
  }]
});

// Creo il modello e specifico la collezione 'utentiAnonimi'
const UtenteAnonimo = mongoose.model('UtenteAnonimo', utenteAnonimoSchema, 'utentiAnonimi');

module.exports = UtenteAnonimo;