const express = require('express'); // Importo express
const app = express();              // Creo l'app server
const PORT = 3000;                  // Definisco su che porta voglio ascoltare

// Creo una semplice rotta API
app.get('/', (req, res) => {
  res.send('Ciao, sono un server Express!');
});

// Avvio il server
app.listen(PORT, () => {
  console.log(`✅ Server Express in ascolto sulla porta ${PORT}`);
});