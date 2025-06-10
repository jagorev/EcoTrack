const request = require('supertest');
const app = process.env.SERVER_URL; // Usa SERVER_URL dal file .env
jest.setTimeout(10000);

let adminToken = '';
let adminId = '';

// Dati di test
const testAdmin = {
  username: 'testadmin',
  password: 'testpassword123'
};

// Login e creazione admin
beforeAll(async () => {
  // Crea un nuovo admin
  const res = await request(app)
    .post('/api/UtenteAmministratore')
    .set('Authorization', 'Bearer test') // bypassa verifyToken per test, oppure usa un token valido
    .send(testAdmin);
  adminId = res.body._id;

  // Login per ottenere il token
  const loginRes = await request(app)
    .post('/api/loginAdmin')
    .send({ username: testAdmin.username, password: testAdmin.password });
  adminToken = loginRes.body.token;
});

describe('Utente Amministratore API', () => {
  test('POST /api/loginAdmin - Login amministratore', async () => {
    const res = await request(app)
      .post('/api/loginAdmin')
      .send({ username: testAdmin.username, password: testAdmin.password });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  test('GET /api/UtenteAmministratore - Lista amministratori', async () => {
    const res = await request(app)
      .get('/api/UtenteAmministratore')
      .set('Authorization', 'Bearer ' + adminToken);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.find(a => a.username === testAdmin.username)).toBeDefined();
  });

  test('POST /api/UtenteAmministratore - Crea nuovo amministratore', async () => {
    const res = await request(app)
      .post('/api/UtenteAmministratore')
      .set('Authorization', 'Bearer ' + adminToken)
      .send({ username: 'admin2', password: 'password2' });
    expect(res.status).toBe(201);
    expect(res.body.username).toBe('admin2');
  });

  test('DELETE /api/UtenteAmministratore/:id - Elimina amministratore', async () => {
    // Crea admin temporaneo da eliminare
    const resCreate = await request(app)
      .post('/api/UtenteAmministratore')
      .set('Authorization', 'Bearer ' + adminToken)
      .send({ username: 'adminToDelete', password: 'password3' });
    const idToDelete = resCreate.body._id;
    const res = await request(app)
      .delete(`/api/UtenteAmministratore/${idToDelete}`)
      .set('Authorization', 'Bearer ' + adminToken);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Amministratore eliminato');
  });

  test('DELETE /api/UtenteAmministratore/:id - Admin non trovato', async () => {
    const res = await request(app)
      .delete('/api/UtenteAmministratore/000000000000000000000000')
      .set('Authorization', 'Bearer ' + adminToken);
    expect(res.status).toBe(404);
    expect(res.body.error).toBe('Amministratore non trovato');
  });
});
