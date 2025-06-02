const mongoose = require('mongoose');

// Schema per una notifica inviata a un utente (ora senza destinatario)
const notificaSchema = new mongoose.Schema({
  corpoNotifica: { 
    type: String, 
    required: true 
  } // Testo del messaggio
});

// Creo il modello e specifico la collezione 'notifiche'
const Notifica = mongoose.model('Notifica', notificaSchema, 'notifiche');

module.exports = Notifica;