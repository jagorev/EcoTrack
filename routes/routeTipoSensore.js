const express = require('express');
const router = express.Router();
const TipoSensore = require('../models/TipoSensore');

/**
 * @swagger
 * /api/tipoSensore:
 *   get:
 *     summary: Recupera tutti i tipi di sensore
 *     description: Ottiene la lista di tutti i tipi di sensore disponibili
 *     tags:
 *       - Tipo di Sensore
 *     responses:
 *       200:
 *         description: Lista di tipi di sensore ottenuta con successo
 *       500:
 *         description: Errore del server
 */
router.get('/api/tipoSensore', async (req, res) => {
  try {
    const tipiSensore = await TipoSensore.find();
    res.json(tipiSensore);
  } catch (errore) {
    res.status(500).json({ messaggio: errore.message });
  }
});

/**
 * @swagger
 * /api/tipoSensore:
 *   post:
 *     summary: Crea un nuovo tipo di sensore
 *     description: Aggiunge un nuovo tipo di sensore al sistema
 *     tags:
 *       - Tipo di Sensore
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo:
 *                 type: string
 *                 description: Nome del tipo di sensore (es. "Tliv", "Tpress")
 *             required:
 *               - tipo
 *     responses:
 *       201:
 *         description: Tipo di sensore creato con successo
 *       400:
 *         description: Dati non validi
 *       500:
 *         description: Errore del server
 */
router.post('/api/tipoSensore', async (req, res) => {
  try {
    const { tipo } = req.body;
    const nuovoTipoSensore = new TipoSensore({ tipo });
    const tipoSensoreSalvato = await nuovoTipoSensore.save();
    res.status(201).json(tipoSensoreSalvato);
  } catch (errore) {
    res.status(400).json({ messaggio: errore.message });
  }
});

/**
 * @swagger
 * /api/tipoSensore/{id}:
 *   delete:
 *     summary: Elimina un tipo di sensore
 *     description: Rimuove un tipo di sensore dal sistema
 *     tags:
 *       - Tipo di Sensore
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del tipo di sensore da eliminare
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tipo di sensore eliminato con successo
 *       404:
 *         description: Tipo di sensore non trovato
 *       500:
 *         description: Errore del server
 */
router.delete('/api/tipoSensore/:id', async (req, res) => {
  try {
    const tipoSensoreEliminato = await TipoSensore.findByIdAndDelete(req.params.id);
    
    if (!tipoSensoreEliminato) {
      return res.status(404).json({ messaggio: 'Tipo di sensore non trovato' });
    }
    
    res.json({ messaggio: 'Tipo di sensore eliminato con successo' });
  } catch (errore) {
    res.status(500).json({ messaggio: errore.message });
  }
});

module.exports = router;