const mongoose = require('mongoose');

const utenteAmministratoreSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: { // La password dovrebbe essere salvata hashata in produzione
    type: String,
    required: true
  }
});

const UtenteAmministratore = mongoose.model('UtenteAmministratore', utenteAmministratoreSchema, 'utentiAmministratori');

module.exports = UtenteAmministratore;