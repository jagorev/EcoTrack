require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');


const app = express();
app.use(express.json()); // Importante per leggere body JSON

const routeUtenteRegistrato = require('./routes/routeUtenteRegistrato');
app.use(routeUtenteRegistrato);

// Connessione a MongoDB Atlas
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connesso a MongoDB Atlas'))
.catch(err => console.error('❌ Errore connessione:', err));

// Avvio del server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server avviato sulla porta ${PORT}`);
});