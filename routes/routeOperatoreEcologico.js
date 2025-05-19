const express = require('express');
const router = express.Router();
const OperatoreEcologico = require('../models/OperatoreEcologico');
const jwt = require('jsonwebtoken');

// Middleware per verifica token (come negli altri route)
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
 * /api/operatoriEcologici:
 *   get:
 *     summary: Ottiene la lista degli operatori ecologici
 *     description: Restituisce tutti gli operatori. Richiede un token JWT valido.
 *     tags:
 *       - Operatori Ecologici
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista di operatori restituita con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/OperatoreEcologico'
 *       401:
 *         description: Token mancante
 *       403:
 *         description: Token non valido
 */
router.get('/api/operatoriEcologici', verifyToken, async (req, res) => {
  const operatori = await OperatoreEcologico.find();
  res.json(operatori);
});

/**
 * @swagger
 * /api/operatoriEcologici:
 *   post:
 *     summary: Crea un nuovo operatore ecologico
 *     description: Inserisce un nuovo operatore ecologico nel sistema.
 *     tags:
 *       - Operatori Ecologici
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OperatoreEcologico'
 *     responses:
 *       201:
 *         description: Operatore creato con successo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OperatoreEcologico'
 */
router.post('/api/operatoriEcologici', async (req, res) => {
  try {
    const nuovoOperatore = new OperatoreEcologico(req.body);
    await nuovoOperatore.save();
    res.status(201).json(nuovoOperatore);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

/**
 * @swagger
 * /api/operatoriEcologici/{id}:
 *   delete:
 *     summary: Elimina un operatore ecologico
 *     description: Elimina un operatore dal sistema. Richiede token JWT.
 *     tags:
 *       - Operatori Ecologici
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Operatore eliminato
 *       401:
 *         description: Token mancante
 *       403:
 *         description: Token non valido
 *       404:
 *         description: Operatore non trovato
 */
router.delete('/api/operatoriEcologici/:id', verifyToken, async (req, res) => {
  try {
    const deleted = await OperatoreEcologico.findByIdAndDelete(req.params.id);
    if (deleted) res.json({ message: 'Operatore eliminato' });
    else res.status(404).json({ error: 'Operatore non trovato' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;