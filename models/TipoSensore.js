const mongoose = require('mongoose');

// Schema per i tipi di sensori disponibili
const tipoSensoreSchema = new mongoose.Schema({
  tipo: {
    type: String,
    required: true
  } // Es: "Tliv" per livello, "Tpress" per pressione
});

// Creo il modello e specifico la collezione 'sensori'
const TipoSensore = mongoose.model('TipoSensore', tipoSensoreSchema, 'TipoSensore');

module.exports = TipoSensore;