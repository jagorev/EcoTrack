const express = require('express');
const router = express.Router();
const TipoRifiuto = require('../models/Trifiuto');

/**
 * @swagger
 * /api/tipoRifiuto:
 *   get:
 *     summary: Recupera tutti i tipi di rifiuto
 *     description: Ottiene la lista di tutti i tipi di rifiuto disponibili
 *     responses:
 *       200:
 *         description: Lista di tipi di rifiuto ottenuta con successo
 *       500:
 *         description: Errore del server
 */
router.get('/api/tipoRifiuto', async (req, res) => {
  try {
    const tipiRifiuto = await TipoRifiuto.find();
    res.json(tipiRifiuto);
  } catch (errore) {
    res.status(500).json({ messaggio: errore.message });
  }
});

/**
 * @swagger
 * /api/tipoRifiuto/{id}:
 *   get:
 *     summary: Recupera un tipo di rifiuto specifico
 *     description: Ottiene i dettagli di un tipo di rifiuto tramite il suo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del tipo di rifiuto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dettagli tipo di rifiuto recuperati con successo
 *       404:
 *         description: Tipo di rifiuto non trovato
 *       500:
 *         description: Errore del server
 */
router.get('/api/tipoRifiuto/:id', async (req, res) => {
  try {
    const tipoRifiuto = await TipoRifiuto.findById(req.params.id);
    
    if (!tipoRifiuto) {
      return res.status(404).json({ messaggio: 'Tipo di rifiuto non trovato' });
    }
    
    res.json(tipoRifiuto);
  } catch (errore) {
    res.status(500).json({ messaggio: errore.message });
  }
});

/**
 * @swagger
 * /api/tipoRifiuto:
 *   post:
 *     summary: Crea un nuovo tipo di rifiuto
 *     description: Registra un nuovo tipo di rifiuto nel sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome del tipo di rifiuto (es. Plastica, Vetro)
 *             required:
 *               - nome
 *     responses:
 *       201:
 *         description: Tipo di rifiuto creato con successo
 *       400:
 *         description: Dati non validi
 */
router.post('/api/tipoRifiuto', async (req, res) => {
  try {
    const nuovoTipoRifiuto = new TipoRifiuto(req.body);
    const tipoRifiutoSalvato = await nuovoTipoRifiuto.save();
    res.status(201).json(tipoRifiutoSalvato);
  } catch (errore) {
    res.status(400).json({ messaggio: errore.message });
  }
});

/**
 * @swagger
 * /api/tipoRifiuto/{id}:
 *   patch:
 *     summary: Aggiorna un tipo di rifiuto
 *     description: Modifica i dati di un tipo di rifiuto esistente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del tipo di rifiuto da modificare
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
 *                 description: Nome del tipo di rifiuto
 *     responses:
 *       200:
 *         description: Tipo di rifiuto aggiornato con successo
 *       404:
 *         description: Tipo di rifiuto non trovato
 *       400:
 *         description: Richiesta non valida
 */
router.patch('/api/tipoRifiuto/:id', async (req, res) => {
  try {
    const tipoRifiutoAggiornato = await TipoRifiuto.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!tipoRifiutoAggiornato) {
      return res.status(404).json({ messaggio: 'Tipo di rifiuto non trovato' });
    }
    
    res.json(tipoRifiutoAggiornato);
  } catch (errore) {
    res.status(400).json({ messaggio: errore.message });
  }
});

/**
 * @swagger
 * /api/tipoRifiuto/{id}:
 *   delete:
 *     summary: Elimina un tipo di rifiuto
 *     description: Rimuove un tipo di rifiuto dal sistema
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del tipo di rifiuto da eliminare
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tipo di rifiuto eliminato con successo
 *       404:
 *         description: Tipo di rifiuto non trovato
 *       500:
 *         description: Errore del server
 */
router.delete('/api/tipoRifiuto/:id', async (req, res) => {
  try {
    const tipoRifiutoEliminato = await TipoRifiuto.findByIdAndDelete(req.params.id);
    
    if (!tipoRifiutoEliminato) {
      return res.status(404).json({ messaggio: 'Tipo di rifiuto non trovato' });
    }
    
    res.json({ messaggio: 'Tipo di rifiuto eliminato con successo' });
  } catch (errore) {
    res.status(500).json({ messaggio: errore.message });
  }
});

module.exports = router;