const mongoose = require('mongoose');

const posizioneSchema = new mongoose.Schema({
  latitudeGradi: { type: Number, required: true },
  latitudeMinuti: { type: Number, required: true },
  latitudeSecondi: { type: Number, required: true },
  longitudeGradi: { type: Number, required: true },
  longitudeMinuti: { type: Number, required: true },
  longitudeSecondi: { type: Number, required: true }
}, { _id: false });
// _id: false purchè mongoose non crei un id anche per la subdocument posizione

const segnalazioneSchema = new mongoose.Schema({
  idSegnalazione: { type: mongoose.Schema.Types.ObjectId, ref: 'Segnalazione', required: true },
  idUtente: { type: mongoose.Schema.Types.ObjectId, ref: 'UtenteRegistrato', required: true },
  data: { type: Date, default: Date.now }, // di default prende il momento attuale
  posizione: { type: posizioneSchema, required: true }, // posizione annidata
  corpoSegnalazione: { type: String, required: true },
  stato: { type: String, required: true },
  media: { type: String } // opzionale
});

const Segnalazione = mongoose.model('Segnalazione', segnalazioneSchema, 'segnalazioni');

module.exports = Segnalazione;