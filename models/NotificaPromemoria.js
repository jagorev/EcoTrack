const mongoose = require('mongoose');

// Schema per una Notifica di tipo Promemoria
const notificaPromemoriaSchema = new mongoose.Schema({
  corpoNotifica: { 
    type: String, 
    required: true 
  },
  destinatario: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'UtenteRegistrato', 
    required: true 
  },
  dataEvento: { 
    type: Date, 
    required: true 
  } // Quando avverrà l'evento da ricordare
});

// Creo il modello e specifico la collezione 'notifichePromemoria'
const NotificaPromemoria = mongoose.model('NotificaPromemoria', notificaPromemoriaSchema, 'notifichePromemoria');

module.exports = NotificaPromemoria;