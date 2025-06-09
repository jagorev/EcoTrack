const express = require('express');
const router = express.Router();
const UtenteRegistrato = require('../models/UtenteRegistrato');
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Token mancante' });
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET || 'supersegreto', (err, user) => {
    if (err) return res.status(403).json({ error: 'Token non valido' });
    req.user = user;
    next();
  });
}

/**
 * @swagger
 * /api/utenteRegistrato:
 *   get:
 *     summary: Recupera tutti gli utenti registrati
 *     description: Restituisce la lista completa degli utenti registrati nel sistema.
 *     tags:
 *       - Utente Registrato
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
// Proteggi la GET degli utenti registrati
router.get('/api/utenteRegistrato', verifyToken, async (req, res) => {
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
 *       - Utente Registrato
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

/**
 * DELETE /api/utenteRegistrato/:id
 * Elimina un utente registrato per id
 */
router.delete('/api/utenteRegistrato/:id', verifyToken, async (req, res) => {
  try {
    const deleted = await UtenteRegistrato.findByIdAndDelete(req.params.id);
    if (deleted) res.json({ message: 'Utente eliminato' });
    else res.status(404).json({ error: 'Utente non trovato' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * PUT /api/utenteRegistrato/:id
 * Modifica i dati di un utente registrato per id
 */
router.put('/api/utenteRegistrato/:id', verifyToken, async (req, res) => {
  try {
    const updated = await UtenteRegistrato.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (updated) res.json(updated);
    else res.status(404).json({ error: 'Utente non trovato' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

