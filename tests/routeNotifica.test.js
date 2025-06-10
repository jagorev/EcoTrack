const request = require('supertest');
const app = process.env.SERVER_URL; 

jest.setTimeout(10000); 

describe('Notifica API Tests', () => {
  let notificaId = '';

  test('POST /api/notifiche - Crea una nuova notifica', async () => {
    const response = await request(app)
      .post('/api/notifiche')
      .send({
        corpoNotifica: 'Test Notifica',
        dataInvio: new Date().toISOString(),
      });

    expect(response.status).toBe(201);
    expect(response.body.corpoNotifica).toBe('Test Notifica');
    notificaId = response.body._id;
  });

  test('GET /api/notifiche/:id - Ottieni una notifica per ID', async () => {
    const response = await request(app).get(`/api/notifiche/${notificaId}`);
    expect(response.status).toBe(200);
    expect(response.body._id).toBe(notificaId);
    expect(response.body.corpoNotifica).toBe('Test Notifica');
  });

  test('PUT /api/notifiche/:id - Modifica una notifica', async () => {
    const response = await request(app)
      .put(`/api/notifiche/${notificaId}`)
      .send({
        corpoNotifica: 'Notifica Aggiornata',
      });

    expect(response.status).toBe(200);
    expect(response.body.corpoNotifica).toBe('Notifica Aggiornata');
  });

  test('GET /api/notifiche - Ottieni tutte le notifiche', async () => {
    const response = await request(app).get('/api/notifiche');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test('DELETE /api/notifiche/:id - Elimina una notifica', async () => {
    const response = await request(app).delete(`/api/notifiche/${notificaId}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Notifica eliminata');
  });

  test('GET /api/notifiche/:id - Ottieni una notifica non esistente', async () => {
    const response = await request(app).get(`/api/notifiche/${notificaId}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Notifica non trovata');
  });
});