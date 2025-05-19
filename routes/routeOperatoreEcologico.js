/**
 * DELETE /api/operatoriEcologici/:id
 * Elimina un operatore ecologico per id
 */
router.delete('/api/operatoriEcologici/:id', async (req, res) => {
  try {
    const OperatoreEcologico = require('../models/OperatoreEcologico');
    const deleted = await OperatoreEcologico.findByIdAndDelete(req.params.id);
    if (deleted) {
      res.json({ message: 'Operatore eliminato' });
    } else {
      res.status(404).json({ error: 'Operatore non trovato' });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});