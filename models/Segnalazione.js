const mongoose = require('mongoose');
const Posizione = require('./Posizione');

const segnalazioneSchema = new mongoose.Schema({
  idSegnalazione: { type: mongoose.Schema.Types.ObjectId, ref: 'Segnalazione', required: true },
  idUtente: { type: mongoose.Schema.Types.ObjectId, ref: 'UtenteRegistrato', required: true },
  data: { type: Date, default: Date.now }, // di default prende il momento attuale
  posizione: { type: Posizione, required: true }, // posizione annidata
  corpoSegnalazione: { type: String, required: true },
  stato: { type: String, required: true },
  media: { type: String } // opzionale
});

const Segnalazione = mongoose.model('Segnalazione', segnalazioneSchema, 'segnalazioni');

module.exports = Segnalazione;