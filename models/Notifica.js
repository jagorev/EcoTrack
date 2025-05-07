const mongoose = require('mongoose');

// Schema per una notifica inviata a un utente
const notificaSchema = new mongoose.Schema({
  corpoNotifica: { 
    type: String, 
    required: true 
  }, // Testo del messaggio
  destinatario: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'UtenteRegistrato', // L'utente che riceve la notifica
    required: true 
  }
});

// Creo il modello e specifico la collezione 'notifiche'
const Notifica = mongoose.model('Notifica', notificaSchema, 'notifiche');

module.exports = Notifica;