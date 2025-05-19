const mongoose = require('mongoose');

// Schema per i tipi di raccolta rifiuti
const tipoRaccoltaSchema = new mongoose.Schema({
  tipo: {
    type: String,
    required: true
  } // Es: "Carta", "Vetro", "Plastica"
});

// Creo il modello e specifico la collezione 'TipoRaccolta'
const TipoRaccolta = mongoose.model('TipoRaccolta', tipoRaccoltaSchema, 'TipoRaccolta');

module.exports = TipoRaccolta;