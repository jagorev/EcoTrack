const request = require('supertest');
const app = require('../percorso/alla/tua/app'); // Sostituisci con il percorso corretto della tua app Express

jest.setTimeout(10000);

describe('Ecocentro API Tests', () => {
    let ecocentroId = '';

    test('POST /api/ecocentri - Crea un nuovo ecocentro', async () => {
        const response = await request(app)
            .post('/api/ecocentri')
            .send({
                nome: 'Ecocentro Test',
                indirizzo: 'Via Test 123',
                orari: 'Lun-Ven 8-18',
            });

        expect(response.status).toBe(201);
        expect(response.body.nome).toBe('Ecocentro Test');
        ecocentroId = response.body._id;
    });

    test('GET /api/ecocentri/:id - Ottieni un ecocentro per ID', async () => {
        const response = await request(app).get(`/api/ecocentri/${ecocentroId}`);
        expect(response.status).toBe(200);
        expect(response.body._id).toBe(ecocentroId);
        expect(response.body.nome).toBe('Ecocentro Test');
    });

    test('PUT /api/ecocentri/:id - Modifica un ecocentro', async () => {
        const response = await request(app)
            .put(`/api/ecocentri/${ecocentroId}`)
            .send({
                nome: 'Ecocentro Aggiornato',
            });

        expect(response.status).toBe(200);
        expect(response.body.nome).toBe('Ecocentro Aggiornato');
    });

    test('GET /api/ecocentri - Ottieni tutti gli ecocentri', async () => {
        const response = await request(app).get('/api/ecocentri');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('DELETE /api/ecocentri/:id - Elimina un ecocentro', async () => {
        const response = await request(app).delete(`/api/ecocentri/${ecocentroId}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Ecocentro eliminato');
    });

    test('GET /api/ecocentri/:id - Ottieni un ecocentro non esistente', async () => {
        const response = await request(app).get(`/api/ecocentri/${ecocentroId}`);
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Ecocentro non trovato');
    });
});