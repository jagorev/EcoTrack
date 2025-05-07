const mongoose = require('mongoose');

// Schema per una prenotazione
const prenotazioneSchema = new mongoose.Schema({
  data: { type: Date, required: true }, // Quando è stata fatta la prenotazione
  indirizzo: { type: String, required: true }, // Dove avverrà il ritiro
  tipoRifiuto: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'TipoRifiuto', // Collegamento al tipo di rifiuto
    required: true 
  }
});

// Creo il modello e specifico la collezione 'prenotazioni'
const Prenotazione = mongoose.model('Prenotazione', prenotazioneSchema, 'prenotazioni');

module.exports = Prenotazione;