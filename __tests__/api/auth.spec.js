// tests/api/example.spec.js
const { test, expect, request } = require('@playwright/test');

test.describe('API Tests', () => {
  test('GET /api/v1/auth should return 200', async ({ request }) => {
    const response = await request.get('/api/v1/auth');
    expect(response.status()).toBe(200);
  });

});
