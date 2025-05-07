require('dotenv').config(); // per leggere il file .env
const mongoose = require('mongoose');
const UtenteRegistrato = require('./models/UtenteRegistrato');

// Connessione a MongoDB Atlas
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connesso a MongoDB'))
  .catch(err => console.error('Errore di connessione:', err));

// Creo e salvo un nuovo utente
async function creaUtente() {
  const nuovoUtente = new UtenteRegistrato({
    username: 'marioRossi',
    email: 'mario@example.com',
    telefono: '3331234567'
  });

  await nuovoUtente.save();
  console.log('Utente salvato!');
}

const Segnalazione = require('./models/Segnalazione');

async function creaSegnalazione() {
  const nuovaSegnalazione = new Segnalazione({
    posizione: {
      latitudeGradi: 45,
      latitudeMinuti: 46,
      latitudeSecondi: 23,
      longitudeGradi: 11,
      longitudeMinuti: 7,
      longitudeSecondi: 50
    },
    corpoSegnalazione: "Cassonetto troppo pieno",
    media: "https://esempio.com/foto.jpg"
  });

  await nuovaSegnalazione.save();
  console.log('Segnalazione salvata!');
  mongoose.connection.close();
}

creaUtente();
creaSegnalazione();