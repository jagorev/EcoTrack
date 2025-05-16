const mongoose = require('mongoose');

// Schema per rappresentare un ecocentro
const ecocentroSchema = new mongoose.Schema({
  nome: { type: String, required: true }, // Nome dell'ecocentro
  indirizzo: { type: String, required: true }, // Indirizzo dell'ecocentro
  orariApertura: { type: String, required: true }, // Orari di apertura
  telefono: { type: String, required: true } // Numero di telefono
});
// Creo il modello e specifico la collezione 'ecocentri'
const Ecocentro = mongoose.model('Ecocentro', ecocentroSchema, 'ecocentri');
module.exports = Ecocentro;
