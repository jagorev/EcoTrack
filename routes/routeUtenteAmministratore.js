const express = require('express');
const jwt = require('jsonwebtoken');
const UtenteAmministratore = require('../models/UtenteAmministratore');
const router = express.Router();

/**
 * @swagger
 * /api/loginAdmin:
 *   post:
 *     summary: Login per amministratore
 *     description: Autentica un amministratore con username e password forniti nel body.
 *     tags:
 *       - Amministratore
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login effettuato con successo, token JWT restituito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Credenziali non valide
 */
router.post('/api/loginAdmin', async (req, res) => {
  const { username, password } = req.body;
  const admin = await UtenteAmministratore.findOne({ username, password });
  if (admin) {
    const token = jwt.sign(
      { username: admin.username, id: admin._id },
      process.env.JWT_SECRET || 'supersegreto',
      { expiresIn: '1h' }
    );
    res.json({ token });
  } else {
    res.sendStatus(401);
  }
});

/**
 * @swagger
 * /api/UtenteAmministratore:
 *   get:
 *     summary: Ottiene la lista degli amministratori
 *     description: Restituisce tutti gli amministratori. Richiede un token JWT valido.
 *     tags:
 *       - Amministratore
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista di amministratori restituita con successo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UtenteAmministratore'
 *       401:
 *         description: Token mancante
 *       403:
 *         description: Token non valido
 */
router.get('/api/UtenteAmministratore', verifyToken, async (req, res) => {
  const admins = await UtenteAmministratore.find();
  res.json(admins);
});

/**
 * @swagger
 * /api/UtenteAmministratore:
 *   post:
 *     summary: Crea un nuovo amministratore
 *     description: Inserisce un nuovo utente amministratore nel sistema.
 *     tags:
 *       - Amministratore
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UtenteAmministratore'
 *     responses:
 *       201:
 *         description: Amministratore creato con successo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UtenteAmministratore'
 */
router.post('/api/UtenteAmministratore', verifyToken, async (req, res) => {
  const nuovoUtente = new UtenteAmministratore(req.body);
  await nuovoUtente.save();
  res.status(201).json(nuovoUtente);
});

/**
 * @swagger
 * /api/UtenteAmministratore/{id}:
 *   delete:
 *     summary: Elimina un amministratore
 *     description: Elimina un amministratore dal sistema. Richiede token JWT.
 *     tags:
 *       - Amministratore
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Amministratore eliminato
 *       401:
 *         description: Token mancante
 *       403:
 *         description: Token non valido
 *       404:
 *         description: Amministratore non trovato
 */
router.delete('/api/UtenteAmministratore/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const deleted = await UtenteAmministratore.findByIdAndDelete(id);
  if (deleted) res.json({ message: 'Amministratore eliminato' });
  else res.status(404).json({ error: 'Amministratore non trovato' });
});

// Middleware per verifica token
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

module.exports = router;
