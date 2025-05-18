const express = require('express');
const router = express.Router();
const UtenteRegistrato = require('../models/UtenteRegistrato');

/**
 * @swagger
 * /api/utenteRegistrato:
 *   get:
 *     summary: Recupera tutti gli utenti registrati
 *     description: Restituisce la lista completa degli utenti registrati nel sistema.
 *     tags:
 *       - Utenti Registrati
 *     responses:
 *       200:
 *         description: Lista di utenti recuperata con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UtenteRegistrato'
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
 *     description: Crea e salva un nuovo utente nel database.
 *     tags:
 *       - Utenti Registrati
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UtenteRegistratoInput'
 *     responses:
 *       201:
 *         description: Utente creato con successo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UtenteRegistrato'
 *       400:
 *         description: Richiesta non valida
 */
// Rotta per aggiungere un nuovo utente
router.post('/api/utenteRegistrato', async (req, res) => {
  try {
    const nuovoUtente = new UtenteRegistrato(req.body);
    await nuovoUtente.save();
    res.status(201).json(nuovoUtente);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


module.exports = router;
