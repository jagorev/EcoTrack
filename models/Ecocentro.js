const mongoose = require('mongoose');

const rifiutoPercentualeSchema = new mongoose.Schema({
  tipoRifiuto: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'TipoRifiuto' // Collegamento ai tipi di rifiuto
  },
  percentuale: { type: Number, required: true }
});

// Schema per rappresentare un ecocentro
const ecocentroSchema = new mongoose.Schema({
  nome: { type: String, required: true }, // Nome dell'ecocentro
  indirizzo: { type: String, required: true }, // Indirizzo dell'ecocentro
  orariApertura: { type: String, required: true }, // Orari di apertura
  telefono: { type: String, required: true }, // Numero di telefono
  situazioneRifiuti: [rifiutoPercentualeSchema], // Array di percentuali di rifiuto
  posizione: { type: mongoose.Schema.Types.ObjectId, ref: 'Posizione', required: true } // Posizione geografica
});

const Ecocentro = mongoose.model('Ecocentro', ecocentroSchema, 'ecocentri');
module.exports = Ecocentro;
