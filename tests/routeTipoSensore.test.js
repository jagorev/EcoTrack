const request = require('supertest');
const app = process.env.SERVER_URL; // Usa SERVER_URL dal file .env

jest.setTimeout(10000); // Timeout globale di 10 secondi

describe('TipoSensore API Tests', () => {
  let tipoSensoreId = '';

  test('POST /api/tipoSensore - Crea un nuovo tipo di sensore', async () => {
    const response = await request(app)
      .post('/api/tipoSensore')
      .send({ tipo: 'Tliv' });
    expect(response.status).toBe(201);
    expect(response.body.tipo).toBe('Tliv');
    tipoSensoreId = response.body._id;
  });

  test('GET /api/tipoSensore - Ottieni tutti i tipi di sensore', async () => {
    const response = await request(app).get('/api/tipoSensore');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.find(ts => ts._id === tipoSensoreId)).toBeDefined();
  });

  test('DELETE /api/tipoSensore/:id - Elimina un tipo di sensore', async () => {
    const response = await request(app).delete(`/api/tipoSensore/${tipoSensoreId}`);
    expect(response.status).toBe(200);
    expect(response.body.messaggio).toBe('Tipo di sensore eliminato con successo');
  });

  test('DELETE /api/tipoSensore/:id - Elimina tipo di sensore non esistente', async () => {
    const response = await request(app).delete('/api/tipoSensore/000000000000000000000000');
    expect(response.status).toBe(404);
    expect(response.body.messaggio).toBe('Tipo di sensore non trovato');
  });
});
