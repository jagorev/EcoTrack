const express = require('express');
const UtenteAmministratore = require('../models/UtenteAmministratore');
const router = express.Router();

/**
 * @swagger
 * /api/loginAdmin:
 *   post:
 *     summary: Login per l'amministratore
 *     description: Permette all'amministratore di accedere tramite username e password.
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

module.exports = router;
