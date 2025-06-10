const express = require('express');
const router = express.Router();
const AreaRaccoltaSpeciale = require('../models/AreaRaccoltaSpeciale');

/**
 * @swagger
 * /api/area-raccolta-speciale:
 *   get:
 *     summary: Recupera tutte le aree di raccolta per rifiuti speciali
 *     description: Ottiene la lista di tutte le aree di raccolta per rifiuti speciali disponibili
 *     responses:
 *       200:
 *         description: Lista di aree ottenuta con successo
 *       500:
 *         description: Errore del server
 *     tags:
 *       - AreaRaccoltaSpeciale
 */
router.get('/api/area-raccolta-speciale', async (req, res) => {
    try {
        const aree = await AreaRaccoltaSpeciale.find()
            .populate('posizione');
        res.json(aree);
    } catch (errore) {
        res.status(500).json({ messaggio: errore.message });
    }
});

/**
 * @swagger
 * /api/area-raccolta-speciale/{id}:
 *   get:
 *     summary: Recupera una specifica area di raccolta speciale
 *     description: Ottiene i dettagli di un'area tramite il suo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dell'area di raccolta speciale
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dettagli area recuperati con successo
 *       404:
 *         description: Area non trovata
 *       500:
 *         description: Errore del server
 *     tags:
 *       - AreaRaccoltaSpeciale
 */
router.get('/api/area-raccolta-speciale/:id', async (req, res) => {
    try {
        const area = await AreaRaccoltaSpeciale.findById(req.params.id)
            .populate('posizione');
        if (!area) {
            return res.status(404).json({ messaggio: 'Area di raccolta speciale non trovata' });
        }
        res.json(area);
    } catch (errore) {
        res.status(500).json({ messaggio: errore.message });
    }
});

/**
 * @swagger
 * /api/area-raccolta-speciale:
 *   post:
 *     summary: Crea una nuova area di raccolta speciale
 *     description: Aggiunge una nuova area di raccolta speciale al database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               indirizzo:
 *                 type: string
 *               orariApertura:
 *                 type: string
 *               telefono:
 *                 type: string
 *               tipologieRifiuti:
 *                 type: array
 *                 items:
 *                   type: string
 *               posizione:
 *                 type: string
 *               note:
 *                 type: string
 *             required:
 *               - nome
 *               - indirizzo
 *               - posizione
 *     responses:
 *       201:
 *         description: Area creata con successo
 *       400:
 *         description: Dati non validi
 *     tags:
 *       - AreaRaccoltaSpeciale
 */
router.post('/api/area-raccolta-speciale', async (req, res) => {
    try {
        const nuovaArea = new AreaRaccoltaSpeciale(req.body);
        const areaSalvata = await nuovaArea.save();
        res.status(201).json(areaSalvata);
    } catch (errore) {
        res.status(400).json({ messaggio: errore.message });
    }
});

/**
 * @swagger
 * /api/area-raccolta-speciale/{id}:
 *   patch:
 *     summary: Aggiorna parzialmente un'area di raccolta speciale
 *     description: Modifica solo i campi specificati di un'area di raccolta speciale
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dell'area da modificare
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
 *               indirizzo:
 *                 type: string
 *               orariApertura:
 *                 type: string
 *               telefono:
 *                 type: string
 *               tipologieRifiuti:
 *                 type: array
 *                 items:
 *                   type: string
 *               posizione:
 *                 type: string
 *               note:
 *                 type: string
 *     responses:
 *       200:
 *         description: Area aggiornata con successo
 *       404:
 *         description: Area non trovata
 *       400:
 *         description: Richiesta non valida
 *     tags:
 *       - AreaRaccoltaSpeciale
 */
router.patch('/api/area-raccolta-speciale/:id', async (req, res) => {
    try {
        const areaAggiornata = await AreaRaccoltaSpeciale.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!areaAggiornata) {
            return res.status(404).json({ messaggio: 'Area di raccolta speciale non trovata' });
        }
        res.json(areaAggiornata);
    } catch (errore) {
        res.status(400).json({ messaggio: errore.message });
    }
});

/**
 * @swagger
 * /api/area-raccolta-speciale/{id}:
 *   delete:
 *     summary: Elimina un'area di raccolta speciale
 *     description: Rimuove un'area di raccolta speciale dal database tramite il suo ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dell'area da eliminare
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Area eliminata con successo
 *       404:
 *         description: Area non trovata
 *       500:
 *         description: Errore del server
 *     tags:
 *       - AreaRaccoltaSpeciale
 */
router.delete('/api/area-raccolta-speciale/:id', async (req, res) => {
    try {
        const areaEliminata = await AreaRaccoltaSpeciale.findByIdAndDelete(req.params.id);
        if (!areaEliminata) {
            return res.status(404).json({ messaggio: 'Area di raccolta speciale non trovata' });
        }
        res.json({ messaggio: 'Area di raccolta speciale eliminata con successo' });
    } catch (errore) {
        res.status(500).json({ messaggio: errore.message });
    }
});

module.exports = router;