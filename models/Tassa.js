const mongoose = require('mongoose');

// Schema per le tasse applicate (es: tassa rifiuti)
const tassaSchema = new mongoose.Schema({
  descrizione: { 
    type: String, 
    required: true 
  },
  importo: { 
    type: Number, 
    required: true 
  } // Importo in Euro
});

// Creo il modello e specifico la collezione 'tasse'
const Tassa = mongoose.model('Tassa', tassaSchema, 'tasse');

module.exports = Tassa;