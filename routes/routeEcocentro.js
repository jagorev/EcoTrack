const express = require('express');
const router = express.Router();
const Ecocentro = require('../models/Ecocentro');

/**
 * @swagger
 * /api/ecocentro:
 *   get:
 *     summary: Recupera tutti gli ecocentri
 *     description: Ottiene la lista di tutti gli ecocentri disponibili
 *     responses:
 *       200:
 *         description: Lista di ecocentri ottenuta con successo
 *       500:
 *         description: Errore del server
 *     tags:
 *       - Ecocentro
 */
router.get('/api/ecocentro', async (req, res) => {
  try {
    const ecocentri = await Ecocentro.find().populate('situazioneRifiuti.tipoRifiuto');
    res.json(ecocentri);
  } catch (errore) {
    res.status(500).json({ messaggio: errore.message });
  }
});

/**
 * @swagger
 * /api/ecocentro/{id}:
 *   get:
 *     summary: Recupera un ecocentro specifico
 *     description: Ottiene i dettagli di un ecocentro tramite il suo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dell'ecocentro
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dettagli ecocentro recuperati con successo
 *       404:
 *         description: Ecocentro non trovato
 *       500:
 *         description: Errore del server
 *     tags:
 *       - Ecocentro
 */
router.get('/api/ecocentro/:id', async (req, res) => {
  try {
    const ecocentro = await Ecocentro.findById(req.params.id).populate('situazioneRifiuti.tipoRifiuto');
    if (!ecocentro) {
      return res.status(404).json({ messaggio: 'Ecocentro non trovato' });
    }
    res.json(ecocentro);
  } catch (errore) {
    res.status(500).json({ messaggio: errore.message });
  }
});

/**
 * @swagger
 * /api/ecocentro:
 *   post:
 *     summary: Crea un nuovo ecocentro
 *     description: Aggiunge un nuovo ecocentro al database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome dell'ecocentro
 *               indirizzo:
 *                 type: string
 *                 description: Indirizzo dell'ecocentro
 *               orariApertura:
 *                 type: string
 *                 description: Orari di apertura
 *               telefono:
 *                 type: string
 *                 description: Numero di telefono
 *               situazioneRifiuti:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     tipoRifiuto:
 *                       type: string
 *                       description: ID del tipo di rifiuto
 *                     percentuale:
 *                       type: number
 *                       description: Percentuale di riempimento
 *             required:
 *               - nome
 *               - indirizzo
 *               - orariApertura
 *               - telefono
 *     responses:
 *       201:
 *         description: Ecocentro creato con successo
 *       400:
 *         description: Dati non validi
 *     tags:
 *       - Ecocentro
 */
router.post('/api/ecocentro', async (req, res) => {
  try {
    const nuovoEcocentro = new Ecocentro(req.body);
    const ecocentroSalvato = await nuovoEcocentro.save();
    res.status(201).json(ecocentroSalvato);
  } catch (errore) {
    res.status(400).json({ messaggio: errore.message });
  }
});

/**
 * @swagger
 * /api/ecocentro/{id}:
 *   patch:
 *     summary: Aggiornamento parziale di un ecocentro
 *     description: Modifica solo i campi specificati di un ecocentro
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dell'ecocentro da modificare
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome dell'ecocentro
 *               indirizzo:
 *                 type: string
 *                 description: Indirizzo dell'ecocentro
 *               orariApertura:
 *                 type: string
 *                 description: Orari di apertura
 *               telefono:
 *                 type: string
 *                 description: Numero di telefono
 *               situazioneRifiuti:
 *                 type: array
 *                 description: Percentuali di riempimento per i vari tipi di rifiuto
 *                 items:
 *                   type: object
 *                   properties:
 *                     tipoRifiuto:
 *                       type: string
 *                       description: ID del tipo di rifiuto
 *                     percentuale:
 *                       type: number
 *                       description: Percentuale di riempimento (0-100)
 *     responses:
 *       200:
 *         description: Ecocentro modificato con successo
 *       404:
 *         description: Ecocentro non trovato
 *       400:
 *         description: Richiesta non valida
 *     tags:
 *       - Ecocentro
 */
router.patch('/api/ecocentro/:id', async (req, res) => {
  try {
    const ecocentroAggiornato = await Ecocentro.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!ecocentroAggiornato) {
      return res.status(404).json({ messaggio: 'Ecocentro non trovato' });
    }
    
    res.json(ecocentroAggiornato);
  } catch (errore) {
    res.status(400).json({ messaggio: errore.message });
  }
});

/**
 * @swagger
 * /api/ecocentro/{id}:
 *   delete:
 *     summary: Elimina un ecocentro
 *     description: Rimuove un ecocentro dal database tramite il suo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dell'ecocentro da eliminare
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ecocentro eliminato con successo
 *       404:
 *         description: Ecocentro non trovato
 *       500:
 *         description: Errore del server
 *     tags:
 *       - Ecocentro
 */
router.delete('/api/ecocentro/:id', async (req, res) => {
  try {
    const ecocentroEliminato = await Ecocentro.findByIdAndDelete(req.params.id);
    
    if (!ecocentroEliminato) {
      return res.status(404).json({ messaggio: 'Ecocentro non trovato' });
    }
    
    res.json({ messaggio: 'Ecocentro eliminato con successo' });
  } catch (errore) {
    res.status(500).json({ messaggio: errore.message });
  }
});

/**
 * @swagger
 * /api/ecocentro/{id}/rifiuti:
 *   get:
 *     summary: Recupera le percentuali di rifiuti di un ecocentro
 *     description: Ottiene tutte le percentuali dei diversi tipi di rifiuto per un ecocentro specifico
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dell'ecocentro
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Percentuali rifiuti recuperate con successo
 *       404:
 *         description: Ecocentro non trovato
 *       500:
 *         description: Errore del server
 *     tags:
 *       - Ecocentro
 */
router.get('/api/ecocentro/:id/rifiuti', async (req, res) => {
  try {
    const ecocentro = await Ecocentro.findById(req.params.id)
      .populate('situazioneRifiuti.tipoRifiuto');
    
    if (!ecocentro) {
      return res.status(404).json({ messaggio: 'Ecocentro non trovato' });
    }
    
    res.json(ecocentro.situazioneRifiuti);
  } catch (errore) {
    res.status(500).json({ messaggio: errore.message });
  }
});

/**
 * @swagger
 * /api/ecocentro/{id}/rifiuti:
 *   patch:
 *     summary: Aggiorna le percentuali di rifiuti di un ecocentro
 *     description: Aggiorna o aggiunge percentuali per specifici tipi di rifiuto in un ecocentro
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dell'ecocentro
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: object
 *               properties:
 *                 tipoRifiuto:
 *                   type: string
 *                   description: ID del tipo di rifiuto
 *                 percentuale:
 *                   type: number
 *                   description: Percentuale di riempimento (0-100)
 *               required:
 *                 - tipoRifiuto
 *                 - percentuale
 *     responses:
 *       200:
 *         description: Percentuali rifiuti aggiornate con successo
 *       404:
 *         description: Ecocentro non trovato
 *       400:
 *         description: Dati non validi
 *     tags:
 *       - Ecocentro
 */
router.patch('/api/ecocentro/:id/rifiuti', async (req, res) => {
  try {
    const ecocentro = await Ecocentro.findById(req.params.id);
    
    if (!ecocentro) {
      return res.status(404).json({ messaggio: 'Ecocentro non trovato' });
    }
    
    // Rimuovi i tipi di rifiuto esistenti che stai aggiornando
    const nuoviTipiRifiutoIds = req.body.map(item => item.tipoRifiuto.toString());
    
    // Mantieni solo i tipi di rifiuto che non sono nella richiesta
    ecocentro.situazioneRifiuti = ecocentro.situazioneRifiuti.filter(item => 
      !nuoviTipiRifiutoIds.includes(item.tipoRifiuto.toString())
    );
    
    // Aggiungi i nuovi tipi di rifiuto/percentuali
    ecocentro.situazioneRifiuti = [
      ...ecocentro.situazioneRifiuti,
      ...req.body
    ];
    
    await ecocentro.save();
    
    res.json(ecocentro.situazioneRifiuti);
  } catch (errore) {
    res.status(400).json({ messaggio: errore.message });
  }
});

module.exports = router;