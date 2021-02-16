const app = require('../../../src/app');
const request = require('supertest');

describe('login Test ', () => { 

    test('should return 400 if missing github code', () => {
        const response = request(app).get('/api/login').send();
        expect(response.status).toBe(400);
    });
    
});
