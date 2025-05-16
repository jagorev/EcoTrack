require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json()); // Importante per leggere body JSON

//Routes API
const routeUtenteRegistrato = require('./routes/routeUtenteRegistrato');
app.use(routeUtenteRegistrato);
const routeEcocentro = require('./routes/routeEcocentro');
app.use(routeEcocentro);

// Configurazione Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'EcoTrack API',
      version: '1.0.0',
      description: 'API per il sistema EcoTrack'
    },
    servers: [
      {
        url: 'http://localhost:3000'
      }
    ]
  },
  apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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