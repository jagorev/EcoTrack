const mongoose = require('mongoose');

// Schema per le coordinate geografiche (gradi, primi, secondi)
const posizioneSchema = new mongoose.Schema({
  latititudineGradi: {      // NB: nel requisito c'è una doppia “ti”
    type: Number,
    required: true
  },
  latitudinePrimi: {
    type: Number,
    required: true
  },
  latitudineSecondi: {
    type: Number,
    required: true
  },
  longitudineGradi: {
    type: Number,
    required: true
  },
  longitudinePrimi: {
    type: Number,
    required: true
  },
  longitudineSecondi: {
    type: Number,
    required: true
  }
});

// Compilo lo schema in un Model e fisso la collezione a “posizioni”
const Posizione = mongoose.model(
  'Posizione',     // nome del Model
  posizioneSchema, // schema appena definito
  'posizioni'      // nome esatto della collezione su MongoDB
);

module.exports = Posizione;
