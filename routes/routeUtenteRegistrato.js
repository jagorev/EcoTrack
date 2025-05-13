const express = require('express');
const router = express.Router();
const UtenteRegistrato = require('../models/UtenteRegistrato');

/**
 * @swagger
 * /api/utenteRegistrato:
 *   get:
 *     summary: Recupera tutti gli utenti registrati
 *     responses:
 *       200:
 *         description: Lista di tutti gli utenti
 */
// Rotta per ottenere tutti gli utenti
router.get('/api/utenteRegistrato', async (req, res) => {
  const utentiRegistrati = await UtenteRegistrato.find();
  res.json(utentiRegistrati);
});

/**
 * @swagger
 * /api/utenteRegistrato:
 *   post:
 *     summary: Registra un nuovo utente
 *     description: Crea e salva un nuovo utente nel sistema
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nome utente
 *               email:
 *                 type: string
 *                 description: Email di contatto
 *               telefono:
 *                 type: string
 *                 description: Numero di telefono
 *             required:
 *               - username
 *               - email
 *               - telefono
 *     responses:
 *       201:
 *         description: Utente creato con successo
 *       400:
 *         description: Richiesta non valida
 */
// Rotta per aggiungere un nuovo utente
router.post('/api/utenteRegistrato', async (req, res) => {
  const nuovoUtente = new UtenteRegistrato(req.body);
  await nuovoUtente.save();
  res.status(201).json(nuovoUtente);
});

module.exports = router;