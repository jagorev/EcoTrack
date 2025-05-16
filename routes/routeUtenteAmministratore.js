const express = require('express');
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
router.post('/api/loginAdmin', (req, res) => {
  const { username, password } = req.body;

  // Credenziali hardcoded (puoi sostituirle con database/env)
  const adminUsername = 'admin';
  const adminPassword = 'password123';

  if (username === adminUsername && password === adminPassword) {
    res.sendStatus(200); // OK
  } else {
    res.sendStatus(401); // Unauthorized
  }
});

module.exports = router;
