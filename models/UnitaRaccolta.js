const mongoose = require('mongoose');

// Schema per una unità di raccolta dei rifiuti
const unitaRaccoltaSchema = new mongoose.Schema({
  tipoRaccolta: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'TipoRaccolta', // Collegamento al tipo di raccolta (es: carta, vetro)
    required: true 
  },
  sensore: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'TipoSensore', // Collegamento al tipo di sensore (es: Tsen, Tliv)
    required: true 
  },
  livelloSaturazione: { 
    type: Number, 
    required: true 
  }, // Percentuale di saturazione del contenitore
  capienza: { 
    type: Number, 
    required: true 
  } // Capacità massima in litri o kg
});

// Creo il modello e specifico la collezione 'unitaRaccolta'
const UnitaRaccolta = mongoose.model('UnitaRaccolta', unitaRaccoltaSchema, 'unitaRaccolta');

module.exports = UnitaRaccolta;