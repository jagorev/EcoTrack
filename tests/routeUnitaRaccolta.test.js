const request = require('supertest');
const app = process.env.SERVER_URL; // Sostituisci con require('../app') se possibile
jest.setTimeout(10000);

describe('UnitaRaccolta API Tests', () => {
    let unitaRaccoltaId = '';
    // Inserisci qui ID validi per tipoRaccolta e sensore già presenti nel DB di test
    const tipoRaccoltaId = '6829eb793c090b1d8858d94e';
    const sensoreId = '6829ebda3c090b1d8858d952';

    test('POST /api/unitaRaccolta - Crea una nuova unità di raccolta', async () => {
        const response = await request(app)
            .post('/api/unitaRaccolta')
            .send({
                tipoRaccolta: tipoRaccoltaId,
                sensore: sensoreId,
                livelloSaturazione: 50,
                capienza: 120,
                latGradi: 45,
                latPrimi: 30,
                latSecondi: 15,
                lonGradi: 9,
                lonPrimi: 12,
                lonSecondi: 30
            });

        expect(response.status).toBe(201);
        expect(response.body.capienza).toBe(120);
        expect(response.body.livelloSaturazione).toBe(50);
        expect(response.body._id).toBeDefined();
        unitaRaccoltaId = response.body._id;
    });

    test('GET /api/unitaRaccolta - Ottieni tutte le unità di raccolta', async () => {
        const response = await request(app).get('/api/unitaRaccolta');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('PATCH /api/unitaRaccolta/:id - Modifica una unità di raccolta', async () => {
        const response = await request(app)
            .patch(`/api/unitaRaccolta/${unitaRaccoltaId}`)
            .send({
                livelloSaturazione: 80,
                capienza: 150
            });

        expect(response.status).toBe(200);
        expect(response.body.livelloSaturazione).toBe(80);
        expect(response.body.capienza).toBe(150);
    });

    test('DELETE /api/unitaRaccolta/:id - Elimina una unità di raccolta', async () => {
        const response = await request(app).delete(`/api/unitaRaccolta/${unitaRaccoltaId}`);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Unità di raccolta eliminata con successo');
    });

    test('DELETE /api/unitaRaccolta/:id - Elimina unità di raccolta non esistente', async () => {
        const response = await request(app).delete('/api/unitaRaccolta/000000000000000000000000');
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('Unità di raccolta non trovata');
    });
});