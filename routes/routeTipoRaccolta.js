const express = require('express');
const router = express.Router();
const TipoRaccolta = require('../models/TipoRaccolta');

/**
 * @swagger
 * /api/tipoRaccolta:
 *   get:
 *     summary: Recupera tutti i tipi di raccolta
 *     description: Ottiene la lista di tutti i tipi di raccolta disponibili
 *     tags:
 *       - Tipo di Raccolta
 *     responses:
 *       200:
 *         description: Lista di tipi di raccolta ottenuta con successo
 *       500:
 *         description: Errore del server
 */
router.get('/api/tipoRaccolta', async (req, res) => {
  try {
    const tipiRaccolta = await TipoRaccolta.find();
    res.json(tipiRaccolta);
  } catch (errore) {
    res.status(500).json({ messaggio: errore.message });
  }
});

/**
 * @swagger
 * /api/tipoRaccolta:
 *   post:
 *     summary: Crea un nuovo tipo di raccolta
 *     description: Aggiunge un nuovo tipo di raccolta al sistema
 *     tags:
 *       - Tipo di Raccolta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo:
 *                 type: string
 *                 description: Nome del tipo di raccolta (es. "Carta", "Vetro", "Plastica")
 *             required:
 *               - tipo
 *     responses:
 *       201:
 *         description: Tipo di raccolta creato con successo
 *       400:
 *         description: Dati non validi
 *       500:
 *         description: Errore del server
 */
router.post('/api/tipoRaccolta', async (req, res) => {
  try {
    const { tipo } = req.body;
    const nuovoTipoRaccolta = new TipoRaccolta({ tipo });
    const tipoRaccoltaSalvato = await nuovoTipoRaccolta.save();
    res.status(201).json(tipoRaccoltaSalvato);
  } catch (errore) {
    res.status(400).json({ messaggio: errore.message });
  }
});

module.exports = router;