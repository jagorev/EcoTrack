const request = require('supertest');
const app = process.env.SERVER_URL; 

jest.setTimeout(10000); 

describe('TipoRifiuto API Tests', () => {
  let tipoRifiutoId = '';

  test('POST /api/tipoRifiuto - Crea un nuovo tipo di rifiuto', async () => {
    const response = await request(app)
      .post('/api/tipoRifiuto')
      .send({ nome: 'Plastica' });
    expect(response.status).toBe(201);
    expect(response.body.nome).toBe('Plastica');
    tipoRifiutoId = response.body._id;
  });

  test('GET /api/tipoRifiuto - Ottieni tutti i tipi di rifiuto', async () => {
    const response = await request(app).get('/api/tipoRifiuto');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.find(tr => tr._id === tipoRifiutoId)).toBeDefined();
  });

  test('GET /api/tipoRifiuto/:id - Ottieni tipo di rifiuto per ID', async () => {
    const response = await request(app).get(`/api/tipoRifiuto/${tipoRifiutoId}`);
    expect(response.status).toBe(200);
    expect(response.body._id).toBe(tipoRifiutoId);
    expect(response.body.nome).toBe('Plastica');
  });

  test('PATCH /api/tipoRifiuto/:id - Modifica tipo di rifiuto', async () => {
    const response = await request(app)
      .patch(`/api/tipoRifiuto/${tipoRifiutoId}`)
      .send({ nome: 'Carta' });
    expect(response.status).toBe(200);
    expect(response.body.nome).toBe('Carta');
  });

  test('DELETE /api/tipoRifiuto/:id - Elimina tipo di rifiuto', async () => {
    const response = await request(app).delete(`/api/tipoRifiuto/${tipoRifiutoId}`);
    expect(response.status).toBe(200);
    expect(response.body.messaggio).toBe('Tipo di rifiuto eliminato con successo');
  });

  test('GET /api/tipoRifiuto/:id - Tipo di rifiuto non esistente', async () => {
    const response = await request(app).get('/api/tipoRifiuto/000000000000000000000000');
    expect(response.status).toBe(404);
    expect(response.body.messaggio).toBe('Tipo di rifiuto non trovato');
  });

  test('DELETE /api/tipoRifiuto/:id - Elimina tipo di rifiuto non esistente', async () => {
    const response = await request(app).delete('/api/tipoRifiuto/000000000000000000000000');
    expect(response.status).toBe(404);
    expect(response.body.messaggio).toBe('Tipo di rifiuto non trovato');
  });
});
