const mongoose = require('mongoose');

// Schema per una prenotazione
const prenotazioneSchema = new mongoose.Schema({
  idUtente: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'UtenteRegistrato', // Collegamento all'utente registrato
    required: true 
  },
  idEcocentro: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Ecocentro', // riferimento all'ecocentro
    required: true 
  },
  data: { type: Date, required: true }, // Quando è stata fatta la prenotazione
  tipiRifiuto: [{ //array di rifiuti
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'TipoRifiuto' // Collegamento ai tipi di rifiuto
  }]
});

// Validazione: almeno un tipo di rifiuto è richiesto
prenotazioneSchema.path('tipiRifiuto').validate(function(value) {
  return value && value.length > 0;
}, 'La prenotazione deve contenere almeno un tipo di rifiuto');

// Creo il modello e specifico la collezione 'prenotazioni'
const Prenotazione = mongoose.model('Prenotazione', prenotazioneSchema, 'prenotazioni');

module.exports = Prenotazione;