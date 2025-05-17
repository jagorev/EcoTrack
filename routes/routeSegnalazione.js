const express = require('express');
const router = express.Router();
const Segnalazione = require('../models/Segnalazione');

/**
 * @swagger
 * /api/prenotazione:
 *   get:
 *     summary: Recupera tutte le Segnalazioni
 *     description: Ottiene la lista di tutte le segnalazioni con relativi dettagli
 *     responses:
 *       200:
 *         description: Lista di segnalazioni ottenuta con successo
 *       500:
 *         description: Errore del server
 */
router.get('/api/segnalazione', async (req, res) => {
    try {
        const segnalazioni = Segnalazione.find()
            .populate('idUtente')
            .populate('data')
            .populate('posizione')
            .populate('corpoSegnalazione')
            .populate('stato')
            .populate('media');
        res.json(segnalazioni);
    }
    catch (err) {
        res.status(500).json({ messaggio: errore.message });
    }
});