require('dotenv').config(); // Carica le variabili d'ambiente dal file .env
const mongoose = require('mongoose');
const UtenteAmministratore = require('./models/UtenteAmministratore');

// Connessione a MongoDB Atlas
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connesso a MongoDB Atlas'))
  .catch(err => console.error('Errore di connessione:', err));

// Funzione per creare un nuovo amministratore
async function creaAdmin() {
  const nuovoAdmin = new UtenteAmministratore({
    username: 'superadmin',
    password: 'superpassword' // In produzione, usa una password hashata!
  });

  await nuovoAdmin.save();
  console.log('Amministratore salvato!');
  mongoose.connection.close();
}

creaAdmin();