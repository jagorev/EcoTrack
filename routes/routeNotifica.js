const express = require('express');
const router = express.Router();
const Notifica = require('../models/Notifica');

// GET tutte le notifiche
router.get('/', async (req, res) => {
  try {
    const notifiche = await Notifica.find().populate('destinatario');
    res.json(notifiche);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET notifica per ID
router.get('/:id', async (req, res) => {
  try {
    const notifica = await Notifica.findById(req.params.id).populate('destinatario');
    if (!notifica) return res.status(404).json({ message: 'Notifica non trovata' });
    res.json(notifica);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST nuova notifica
router.post('/', async (req, res) => {
  try {
    const notifica = new Notifica({
      corpoNotifica: req.body.corpoNotifica,
      destinatario: req.body.destinatario,
    });
    const nuovaNotifica = await notifica.save();
    res.status(201).json(nuovaNotifica);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE notifica per ID
router.delete('/:id', async (req, res) => {
  try {
    const notifica = await Notifica.findByIdAndDelete(req.params.id);
    if (!notifica) return res.status(404).json({ message: 'Notifica non trovata' });
    res.json({ message: 'Notifica eliminata' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
