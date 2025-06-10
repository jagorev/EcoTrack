const request = require('supertest');
const app = process.env.SERVER_URL; 

jest.setTimeout(10000); 

describe('Tipo Raccolta API Tests', () => {
  let tipoRaccoltaId = '';

  test('POST /api/tipoRaccolta - Crea un nuovo tipo di raccolta', async () => {
    const response = await request(app)
      .post('/api/tipoRaccolta')
      .send({
        tipo: 'Plastica', // Campo corretto basato sul modello TipoRaccolta
      });

    expect(response.status).toBe(201);
    expect(response.body.tipo).toBe('Plastica'); // Verifica che il campo 'tipo' sia corretto
    tipoRaccoltaId = response.body._id; // Salva l'ID per i test successivi
  });

  test('GET /api/tipoRaccolta - Ottieni tutti i tipi di raccolta', async () => {
    const response = await request(app).get('/api/tipoRaccolta');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

});