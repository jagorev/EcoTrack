const express = require('express');
const UtenteAmministratore = require('../models/UtenteAmministratore');
const router = express.Router();

/**
 * @swagger
 * /api/loginAdmin:
 *   post:
 *     summary: Login per l'amministratore
 *     description: Permette all'amministratore di accedere tramite username e password nel body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: admin
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login effettuato con successo
 *       401:
 *         description: Credenziali non valide
 */
router.post('/api/loginAdmin', async (req, res) => {
  const { username, password } = req.body;
  const admin = await UtenteAmministratore.findOne({ username, password });
  if (admin) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

/**
 * @swagger
 * /api/loginAdmin:
 *   get:
 *     summary: Login (via query) per l'amministratore
 *     description: |
 *       Versione GET dello stesso login:
 *       le credenziali vengono passate in query string
 *       (/api/loginAdmin?username=admin&password=pwd).
 *     parameters:
 *       - in: query
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         example: admin
 *       - in: query
 *         name: password
 *         required: true
 *         schema:
 *           type: string
 *         example: password123
 *     responses:
 *       200:
 *         description: Login effettuato con successo
 *       401:
 *         description: Credenziali non valide
 */
// router.get('/api/UtenteAmministratore', async (req, res) => {
//   const { username, password } = req.query;
//   const admin = await UtenteAmministratore.findOne({ username, password });
//   if (admin) {
//     res.sendStatus(200);
//   } else {
//     res.sendStatus(401);
//   }
// });
router.get('/api/UtenteAmministratore', async (req, res) => {
  const admins = await UtenteAmministratore.find();
  res.json(admins);
});
router.post('/api/UtenteAmministratore', async (req, res) => {
  const nuovoUtente = new UtenteAmministratore(req.body);
  await nuovoUtente.save();
  res.status(201).json(nuovoUtente);
});


module.exports = router;
