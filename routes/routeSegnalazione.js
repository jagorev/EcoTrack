const express = require('express');
const router = express.Router();
const Segnalazione = require('../models/Segnalazione');

/**
 * @swagger
 * /api/segnalazione:
 *   get:
 *     summary: Recupera tutte le Segnalazioni
 *     description: Ottiene la lista di tutte le segnalazioni con relativi dettagli
 *     tags:
 *       - Segnalazione
 *     responses:
 *       200:
 *         description: Lista di segnalazioni ottenuta con successo
 *       500:
 *         description: Errore del server
 */

/**
 * @swagger
 * /api/segnalazione:
 *   post:
 *     summary: Crea una nuova segnalazione
 *     description: Registra una nuova segnalazione nel sistema.
 *     tags:
 *       - Segnalazione
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idSegnalazione:
 *                 type: string
 *                 description: ID della segnalazione
 *               idUtente:
 *                 type: string
 *                 description: ID dell'utente che invia la segnalazione
 *               data:
 *                 type: string
 *                 format: date-time
 *                 description: Data in cui è stata ricevuta la segnalazione
 *               posizione:
 *                 type: object
 *                 properties:
 *                   latitudeGradi:
 *                     type: number
 *                   latitudeMinuti:
 *                     type: number
 *                   latitudeSecondi:
 *                     type: number
 *                   longitudeGradi:
 *                     type: number
 *                   longitudeMinuti:
 *                     type: number
 *                   longitudeSecondi:
 *                     type: number
 *                 description: Coordinate della posizione della segnalazione
 *               corpoSegnalazione:
 *                 type: string
 *                 description: Contenuto testuale della segnalazione
 *               stato:
 *                 type: string
 *                 description: Stato della segnalazione
 *               media:
 *                 type: string
 *                 description: URL o percorso del file multimediale allegato (opzionale)
 *     responses:
 *       201:
 *         description: Segnalazione creata con successo
 *       400:
 *         description: Richiesta non valida
 *     tags:
 *       - Segnalazione
 */
router.post('/api/segnalazione', async (req, res) => {
    try {
        const nuovaSegnalazione = new Segnalazione(req.body);
        const segnalazioneSalvata = await nuovaSegnalazione.save();
        res.status(201).json(segnalazioneSalvata);
    }
    catch (err) {
        res.status(400).json({ messaggio: err.message });
    }
});

/**
 * @swagger
 * /api/prenotazione/{id}:
 *   patch:
 *     summary: Modifica una segnalazione
 *     description: Modifica solo i campi specificati di una segnalazione esistente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID della segnalazione da modificare
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idSegnalazione:
 *                 type: string
 *                 description: ID della segnalazione
 *               idUtente:
 *                 type: string
 *                 description: ID dell'utente che invia la segnalazione
 *               data:
 *                 type: string
 *                 format: date-time
 *                 description: Data in cui è stata ricevuta la segnalazione
 *               posizione:
 *                 type: object
 *                 properties:
 *                   latitudeGradi:
 *                     type: number
 *                   latitudeMinuti:
 *                     type: number
 *                   latitudeSecondi:
 *                     type: number
 *                   longitudeGradi:
 *                     type: number
 *                   longitudeMinuti:
 *                     type: number
 *                   longitudeSecondi:
 *                     type: number
 *                 description: Coordinate della posizione della segnalazione
 *               corpoSegnalazione:
 *                 type: string
 *                 description: Contenuto testuale della segnalazione
 *               stato:
 *                 type: string
 *                 description: Stato della segnalazione
 *               media:
 *                 type: string
 *                 description: URL o percorso del file multimediale allegato (opzionale)
 *     responses:
 *       200:
 *         description: Segnalazione aggiornata con successo
 *       404:
 *         description: Segnalazione non trovata
 *       400:
 *         description: Richiesta non valida
 *     tags:
 *       - Segnalazione
 */
router.patch('/api/prenotazione/:id', async (req, res) => {
    try {
        const segnalazioneAggiornata = await Segnalazione.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!segnalazioneAggiornata) {
            return res.status(404).json({ messaggio: 'Segnalazione non trovata' });
        }

        res.json(segnalazioneAggiornata);
    }
    catch (err) {
        res.status(400).json({ messaggio: err.message });
    }
});

/**
 * @swagger
 * /api/prenotazione/{id}:
 *   delete:
 *     summary: Elimina una segnalazione
 *     description: Rimuove una segnalazione dal sistema.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID della segnalazione da eliminare
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Segnalazione eliminata con successo
 *       404:
 *         description: Segnalazione non trovata
 *       500:
 *         description: Errore del server
 *     tags:
 *       - Segnalazione
 */
router.delete('/api/prenotazione/:id', async (req, res) => {
    try {
        const segnalazioneEliminata = await Segnalazione.findByIdAndDelete(req.params.id);

        if (!segnalazioneEliminata) {
            return res.status(404).json({ messaggio: 'Segnalazione non trovata' });
        }

        res.json({ messaggio: 'Segnalazione eliminata con successo' });
    } catch (err) {
        res.status(500).json({ messaggio: err.message });
    }
});

module.exports = router;