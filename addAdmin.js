const mongoose = require('mongoose');
const UtenteAmministratore = require('./models/UtenteAmministratore');

mongoose.connect(process.env.DB_URL || 'mongodb://localhost/EcoTrack', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  const admin = new UtenteAmministratore({
    username: 'admin',
    password: 'password123' // In produzione, usa una password hashata!
  });
  await admin.save();
  console.log('✅ Amministratore aggiunto!');
  mongoose.disconnect();
}).catch(err => {
  console.error('❌ Errore:', err);
});