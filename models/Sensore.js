const mongoose = require('mongoose');

// Schema per rappresentare un sensore fisico installato
const sensoreSchema = new mongoose.Schema({
  tipoSensore: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'TipoSensore', // Tipo del sensore (es: Tsen, Tliv)
    required: true 
  },
  unitaRaccolta: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'UnitaRaccolta', // A quale contenitore è collegato
    required: true 
  },
  stato: { 
    type: String, 
    enum: ['attivo', 'disattivo', 'guasto'], // Stato del sensore
    default: 'attivo'
  }
});

// Creo il modello e specifico la collezione 'sensoriInstallati'
const Sensore = mongoose.model('Sensore', sensoreSchema, 'sensoriInstallati');

module.exports = Sensore;