const request = require('supertest');
const app = process.env.SERVER_URL; // Usa SERVER_URL dal file .envs
jest.setTimeout(10000);

describe('Ecocentro API Tests', () => {
    let ecocentroId = '';

    test('POST /api/ecocentro - Crea un nuovo ecocentro', async () => {
        const response = await request(app)
            .post('/api/ecocentro')
            .send({
                nome: 'Ecocentro Test',
                indirizzo: 'Via Test 123',
                orariApertura: 'Lun-Ven 8-18',
                telefono: '0123456789'
            });

        expect(response.status).toBe(201);
        expect(response.body.nome).toBe('Ecocentro Test');
        ecocentroId = response.body._id;
    });

    test('GET /api/ecocentro/:id - Ottieni un ecocentro per ID', async () => {
        const response = await request(app).get(`/api/ecocentro/${ecocentroId}`);
        expect(response.status).toBe(200);
        expect(response.body._id).toBe(ecocentroId);
        expect(response.body.nome).toBe('Ecocentro Test');
    });

    test('PATCH /api/ecocentro/:id - Modifica un ecocentro', async () => {
        const response = await request(app)
            .patch(`/api/ecocentro/${ecocentroId}`)
            .send({
                nome: 'Ecocentro Aggiornato',
            });

        expect(response.status).toBe(200);
        expect(response.body.nome).toBe('Ecocentro Aggiornato');
    });

    test('GET /api/ecocentro - Ottieni tutti gli ecocentri', async () => {
        const response = await request(app).get('/api/ecocentro');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('DELETE /api/ecocentro/:id - Elimina un ecocentro', async () => {
        const response = await request(app).delete(`/api/ecocentro/${ecocentroId}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Ecocentro eliminato');
    });

    test('GET /api/ecocentro/:id - Ottieni un ecocentro non esistente', async () => {
        const response = await request(app).get(`/api/ecocentro/${ecocentroId}`);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Ecocentro non trovato');
    });
});