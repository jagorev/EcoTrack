const express = require('express');
const router = express.Router();
const UnitaRaccolta = require('../models/UnitaRaccolta');

/**
 * @swagger
 * /api/unitaRaccolta:
 *   get:
 *     summary: Recupera tutte le Unità di Raccolta
 *     description: Ottiene la lista di tutte le unità di raccolta con i relativi dettagli, inclusi tipo raccolta e sensore associato.
 *     responses:
 *       200:
 *         description: Lista di unità di raccolta ottenuta con successo
 *       500:
 *         description: Errore interno del server
 */
router.get('/api/unitaRaccolta', async (req, res) => {
    try {
        const unitaRaccolta = await UnitaRaccolta.find()
            .populate('tipoRaccolta')
            .populate('sensore');
        res.json(unitaRaccolta);
    } catch (err) {
        console.error('Errore durante il recupero delle unità di raccolta:', err);
        res.status(500).json({ message: 'Errore interno del server' });
    }
});

/**
 * @swagger
 * /api/unitaRaccolta:
 *   post:
 *     summary: Crea una nuova Unità di Raccolta
 *     description: Registra una nuova unità di raccolta nel sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipoRaccolta:
 *                 type: string
 *                 description: ID del tipo di raccolta associato
 *               sensore:
 *                 type: string
 *                 description: ID del sensore associato
 *               livelloSaturazione:
 *                 type: number
 *                 description: Livello di saturazione dell'unità di raccolta
 *               capienza:
 *                 type: number
 *                 description: Capienza massima dell'unità di raccolta
 *     responses:
 *       201:
 *         description: Unità di raccolta creata con successo
 *       500:
 *         description: Errore interno del server
 */
router.post('/api/unitaRaccolta', async (req, res) => {
    const { tipoRaccolta, sensore, livelloSaturazione, capienza } = req.body;

    try {
        const unitaRaccolta = new UnitaRaccolta({
            tipoRaccolta,
            sensore,
            livelloSaturazione,
            capienza
        });
        await unitaRaccolta.save();
        res.status(201).json(unitaRaccolta);
    }
    catch (err) {
        console.error('Errore durante la creazione dell\'unità di raccolta:', err);
        res.status(500).json({ message: 'Errore interno del server' });
    }
});

/**
 * @swagger
 * /api/unitaRaccolta/{id}:
 *   patch:
 *     summary: Modifica un'Unità di Raccolta
 *     description: Modifica i campi specificati di una unità di raccolta esistente.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dell'unità di raccolta da modificare
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipoRaccolta:
 *                 type: string
 *                 description: ID del tipo di raccolta associato
 *               sensore:
 *                 type: string
 *                 description: ID del sensore associato
 *               livelloSaturazione:
 *                 type: number
 *                 description: Livello di saturazione dell'unità di raccolta
 *               capienza:
 *                 type: number
 *                 description: Capienza massima dell'unità di raccolta
 *     responses:
 *       200:
 *         description: Unità di raccolta aggiornata con successo
 *       404:
 *         description: Unità di raccolta non trovata
 *       500:
 *         description: Errore interno del server
 */
router.patch('/api/unitaRaccolta/:id', async (req, res) => {

    try {
        const unitaRaccoltaAggiornata = await UnitaRaccolta.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!unitaRaccoltaAggiornata) {
            return res.status(404).json({ message: 'Unità di raccolta non trovata' });
        }

        res.json(unitaRaccoltaAggiornata);
    }
    catch (err) {
        console.error('Errore durante l\'aggiornamento dell\'unità di raccolta:', err);
        res.status(500).json({ message: 'Errore interno del server' });
    }
});

/**
 * @swagger
 * /api/unitaRaccolta/{id}:
 *   delete:
 *     summary: Elimina un'Unità di Raccolta
 *     description: Rimuove una unità di raccolta dal sistema tramite il suo ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID dell'unità di raccolta da eliminare
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Unità di raccolta eliminata con successo
 *       404:
 *         description: Unità di raccolta non trovata
 *       500:
 *         description: Errore interno del server
 */
router.delete('/api/unitaRaccolta/:id', async (req, res) => {
    try {
        const unitaRaccoltaEliminata = await UnitaRaccolta.findByIdAndDelete(req.params.id);

        if (!unitaRaccoltaEliminata) {
            return res.status(404).json({ message: 'Unità di raccolta non trovata' });
        }

        res.json({ message: 'Unità di raccolta eliminata con successo' });
    }
    catch (err) {
        console.error('Errore durante l\'eliminazione dell\'unità di raccolta:', err);
        res.status(500).json({ message: 'Errore interno del server' });
    }
});

module.exports = router;