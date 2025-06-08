const express = require('express');
const router = express.Router();
const UnitaRaccolta = require('../models/UnitaRaccolta');
const TipoRaccolta = require('../models/TipoRaccolta');
const TipoSensore = require('../models/TipoSensore');
const Posizione = require('../models/Posizione');

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
 *     tags:
 *       - Unità di Raccolta
 */

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
 *               latGradi:
 *                 type: number
 *                 description: Gradi di latitudine
 *               latPrimi:
 *                 type: number
 *                 description: Primi di latitudine
 *               latSecondi:
 *                 type: number
 *                 description: Secondi di latitudine
 *               lonGradi:
 *                 type: number
 *                 description: Gradi di longitudine
 *               lonPrimi:
 *                 type: number
 *                 description: Primi di longitudine
 *               lonSecondi:
 *                 type: number
 *                 description: Secondi di longitudine
 *             required:
 *               - tipoRaccolta
 *               - sensore
 *               - livelloSaturazione
 *               - capienza
 *               - latGradi
 *               - latPrimi
 *               - latSecondi
 *               - lonGradi
 *               - lonPrimi
 *               - lonSecondi
 *     responses:
 *       201:
 *         description: Unità di raccolta creata con successo
 *       500:
 *         description: Errore interno del server
 *     tags:
 *       - Unità di Raccolta
 */

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
 *               posizione:
 *                 type: object
 *                 properties:
 *                   latitudineGradi:
 *                     type: number
 *                   latitudinePrimi:
 *                     type: number
 *                   latitudineSecondi:
 *                     type: number
 *                   longitudineGradi:
 *                     type: number
 *                   longitudinePrimi:
 *                     type: number
 *                   longitudineSecondi:
 *                     type: number
 *     responses:
 *       200:
 *         description: Unità di raccolta aggiornata con successo
 *       404:
 *         description: Unità di raccolta non trovata
 *       500:
 *         description: Errore interno del server
 *     tags:
 *       - Unità di Raccolta
 */

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
 *     tags:
 *       - Unità di Raccolta
 */
router.get('/api/unitaRaccolta', async (req, res) => {
    try {
        const unitaRaccolta = await UnitaRaccolta.find({}, 'livelloSaturazione posizione capienza')
            .populate('tipoRaccolta', 'tipo')
            .populate('sensore', 'tipo');
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
 *               latGradi:
 *                 type: number
 *                 description: Gradi di latitudine
 *               latPrimi:
 *                 type: number
 *                 description: Primi di latitudine
 *               latSecondi:
 *                 type: number
 *                 description: Secondi di latitudine
 *               lonGradi:
 *                 type: number
 *                 description: Gradi di longitudine
 *               lonPrimi:
 *                 type: number
 *                 description: Primi di longitudine
 *               lonSecondi:
 *                 type: number
 *                 description: Secondi di longitudine
 *             required:
 *               - tipoRaccolta
 *               - sensore
 *               - livelloSaturazione
 *               - capienza
 *               - latGradi
 *               - latPrimi
 *               - latSecondi
 *               - lonGradi
 *               - lonPrimi
 *               - lonSecondi
 *     responses:
 *       201:
 *         description: Unità di raccolta creata con successo
 *       500:
 *         description: Errore interno del server
 *     tags:
 *       - Unità di Raccolta
 */
router.post('/api/unitaRaccolta', async (req, res) => {
    const { tipoRaccolta, sensore, livelloSaturazione, capienza, latGradi, latPrimi, latSecondi, lonGradi, lonPrimi, lonSecondi } = req.body;

    try { //converti i dati in oggetti di tipo posizione
        const posizioneOggetto = {
            latitudineGradi: latGradi,
            latitudinePrimi: latPrimi,
            latitudineSecondi: latSecondi,
            longitudineGradi: lonGradi,
            longitudinePrimi: lonPrimi,
            longitudineSecondi: lonSecondi
        };
        const unitaRaccolta = new UnitaRaccolta({
            tipoRaccolta,
            sensore,
            livelloSaturazione,
            capienza,
            posizione: posizioneOggetto
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
 *               posizione:
 *                 type: object
 *                 properties:
 *                   latitudineGradi:
 *                     type: number
 *                   latitudinePrimi:
 *                     type: number
 *                   latitudineSecondi:
 *                     type: number
 *                   longitudineGradi:
 *                     type: number
 *                   longitudinePrimi:
 *                     type: number
 *                   longitudineSecondi:
 *                     type: number
 *     responses:
 *       200:
 *         description: Unità di raccolta aggiornata con successo
 *       404:
 *         description: Unità di raccolta non trovata
 *       500:
 *         description: Errore interno del server
 *     tags:
 *       - Unità di Raccolta
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
 *     tags:
 *       - Unità di Raccolta
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