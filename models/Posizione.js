const mongoose = require('mongoose');

/**
 * Schema per rappresentare coordinate geografiche in formato gradi, primi, secondi
 */
const posizioneSchema = new mongoose.Schema({
  latitudineGradi: { type: Number, required: true },
  latitudinePrimi: { type: Number, required: true },
  latitudineSecondi: { type: Number, required: true },
  longitudineGradi: { type: Number, required: true },
  longitudinePrimi: { type: Number, required: true },
  longitudineSecondi: { type: Number, required: true },
  nome: { type: String }, // Nome della posizione
}, { _id: false }); // Non aggiungere _id a questo sotto-documento

// Registra lo schema come tipo utilizzabile
mongoose.model('Posizione', posizioneSchema);

module.exports = mongoose.model('Posizione').schema;
