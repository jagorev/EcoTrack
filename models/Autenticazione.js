const mongoose = require('mongoose');

// Schema separato per la gestione delle credenziali di accesso
const autenticazioneSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true 
  },
  password: { 
    type: String, 
    required: true 
  }, // La password sarà salvata hashata
  autenticato: { 
    type: Boolean, 
    default: false 
  } // Stato di autenticazione
});

// Creo il modello e specifico la collezione 'autenticazioni'
const Autenticazione = mongoose.model('Autenticazione', autenticazioneSchema, 'autenticazioni');

module.exports = Autenticazione;