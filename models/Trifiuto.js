const mongoose = require('mongoose');

// Schema per rappresentare un tipo di rifiuto (es: plastica, vetro, carta)
const tipoRifiutoSchema = new mongoose.Schema({
  nome: { type: String, required: true } // Es: "Plastica", "Vetro"
});

// Creo il modello e specifico la collezione 'rifiuti'
const TipoRifiuto = mongoose.model('TipoRifiuto', tipoRifiutoSchema, 'Trifiuti');

module.exports = TipoRifiuto;