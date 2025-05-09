const express = require('express');
const router = express.Router();
const UtenteRegistrato = require('../models/UtenteRegistrato');

// Rotta per ottenere tutti gli utenti
router.get('/api/utenteRegistrato', async (req, res) => {
  const utentiRegistrati = await UtenteRegistrato.find();
  res.json(utentiRegistrati);
});

// Rotta per aggiungere un nuovo utente
router.post('/api/utenteRegistrato', async (req, res) => {
  const nuovoUtente = new UtenteRegistrato(req.body);
  await nuovoUtente.save();
  res.status(201).json(nuovoUtente);
});

module.exports = router;