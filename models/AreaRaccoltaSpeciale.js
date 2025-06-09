const mongoose = require('mongoose');

const areaRaccoltaSpecialeSchema = new mongoose.Schema({
    nome: { type: String, required: true }, // Nome dell'area
    indirizzo: { type: String, required: true }, // Indirizzo
    orariApertura: { type: String }, // Orari di apertura
    telefono: { type: String }, // Numero di telefono
    tipologieRifiuti: [{ type: String }], // Esempio: ["batterie", "farmaci", ...]
    posizione: { type: mongoose.Schema.Types.ObjectId, ref: 'Posizione', required: true }, // Collegamento alla posizione
    note: { type: String } // Eventuali note aggiuntive
});

const AreaRaccoltaSpeciale = mongoose.model('AreaRaccoltaSpeciale', areaRaccoltaSpecialeSchema, 'areeraccoltaspeciale');
module.exports = AreaRaccoltaSpeciale;