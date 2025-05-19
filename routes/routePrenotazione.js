const express = require('express');
const router = express.Router();
const Prenotazione = require('../models/Prenotazione');

/**
 * @swagger
 * /api/prenotazione:
 *   get:
 *     summary: Recupera tutte le prenotazioni
 *     description: Ottiene la lista di tutte le prenotazioni con relativi dettagli
 *     responses:
 *       200:
 *         description: Lista di prenotazioni ottenuta con successo
 *       500:
 *         description: Errore del server
 *     tags:
 *       - Prenotazione
 */
router.get('/api/prenotazione', async (req, res) => {
  try {
    const prenotazioni = await Prenotazione.find()
      .populate('idUtente')
      .populate('idEcocentro')
      .populate('tipiRifiuto');
    res.json(prenotazioni);
  } catch (errore) {
    res.status(500).json({ messaggio: errore.message });
  }
});

/**
 * @swagger
 * /api/prenotazione/{id}:
 *   get:
 *     summary: Recupera una prenotazione specifica
 *     description: Ottiene i dettagli di una prenotazione tramite il suo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID della prenotazione
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dettagli prenotazione recuperati con successo
 *       404:
 *         description: Prenotazione non trovata
 *       500:
 *         description: Errore del server
 *     tags:
 *       - Prenotazione
 */
router.get('/api/prenotazione/:id', async (req, res) => {
  try {
    const prenotazione = await Prenotazione.findById(req.params.id)
      .populate('idUtente')
      .populate('idEcocentro')
      .populate('tipiRifiuto');
    
    if (!prenotazione) {
      return res.status(404).json({ messaggio: 'Prenotazione non trovata' });
    }
    
    res.json(prenotazione);
  } catch (errore) {
    res.status(500).json({ messaggio: errore.message });
  }
});

/**
 * @swagger
 * /api/prenotazione:
 *   post:
 *     summary: Crea una nuova prenotazione
 *     description: Registra una nuova prenotazione nel sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idUtente:
 *                 type: string
 *                 description: ID dell'utente che effettua la prenotazione
 *               idEcocentro:
 *                 type: string
 *                 description: ID dell'ecocentro dove conferire i rifiuti
 *               data:
 *                 type: string
 *                 format: date-time
 *                 description: Data e ora della prenotazione
 *               tipiRifiuto:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array di ID dei tipi di rifiuto da conferire
 *             required:
 *               - idUtente
 *               - idEcocentro
 *               - data
 *               - tipiRifiuto
 *     responses:
 *       201:
 *         description: Prenotazione creata con successo
 *       400:
 *         description: Dati non validi
 *     tags:
 *       - Prenotazione
 */
router.post('/api/prenotazione', async (req, res) => {
  try {
    const nuovaPrenotazione = new Prenotazione(req.body);
    const prenotazioneSalvata = await nuovaPrenotazione.save();
    res.status(201).json(prenotazioneSalvata);
  } catch (errore) {
    res.status(400).json({ messaggio: errore.message });
  }
});

/**
 * @swagger
 * /api/prenotazione/{id}:
 *   patch:
 *     summary: Aggiorna parzialmente una prenotazione
 *     description: Modifica solo i campi specificati di una prenotazione esistente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID della prenotazione da modificare
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idEcocentro:
 *                 type: string
 *                 description: ID dell'ecocentro dove conferire i rifiuti
 *               data:
 *                 type: string
 *                 format: date-time
 *                 description: Data e ora della prenotazione
 *               tipiRifiuto:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Array di ID dei tipi di rifiuto da conferire
 *     responses:
 *       200:
 *         description: Prenotazione aggiornata con successo
 *       404:
 *         description: Prenotazione non trovata
 *       400:
 *         description: Richiesta non valida
 *     tags:
 *       - Prenotazione
 */
router.patch('/api/prenotazione/:id', async (req, res) => {
  try {
    const prenotazioneAggiornata = await Prenotazione.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!prenotazioneAggiornata) {
      return res.status(404).json({ messaggio: 'Prenotazione non trovata' });
    }
    
    res.json(prenotazioneAggiornata);
  } catch (errore) {
    res.status(400).json({ messaggio: errore.message });
  }
});

/**
 * @swagger
 * /api/prenotazione/{id}:
 *   delete:
 *     summary: Elimina una prenotazione
 *     description: Rimuove una prenotazione dal sistema
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID della prenotazione da eliminare
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Prenotazione eliminata con successo
 *       404:
 *         description: Prenotazione non trovata
 *       500:
 *         description: Errore del server
 *     tags:
 *       - Prenotazione
 */
router.delete('/api/prenotazione/:id', async (req, res) => {
  try {
    const prenotazioneEliminata = await Prenotazione.findByIdAndDelete(req.params.id);
    
    if (!prenotazioneEliminata) {
      return res.status(404).json({ messaggio: 'Prenotazione non trovata' });
    }
    
    res.json({ messaggio: 'Prenotazione eliminata con successo' });
  } catch (errore) {
    res.status(500).json({ messaggio: errore.message });
  }
});

module.exports = router;