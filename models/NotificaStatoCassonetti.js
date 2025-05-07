const mongoose = require('mongoose');

// Schema per una Notifica di tipo Stato Cassonetti
const notificaStatoCassonettiSchema = new mongoose.Schema({
  corpoNotifica: { 
    type: String, 
    required: true 
  },
  destinatario: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'UtenteRegistrato', 
    required: true 
  },
  livelloSaturazione: { 
    type: Number, 
    required: true 
  }, // Percentuale riempimento
  tipoRaccolta: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'TipoRaccolta' 
  } // Tipo di raccolta interessata
});

// Creo il modello e specifico la collezione 'notificheStatoCassonetti'
const NotificaStatoCassonetti = mongoose.model('NotificaStatoCassonetti', notificaStatoCassonettiSchema, 'notificheStatoCassonetti');

module.exports = NotificaStatoCassonetti;