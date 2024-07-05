// tests/views/example.spec.js
const { test, expect, request } = require('@playwright/test');

test.describe('Views Tests', () => {
  test('GET /docs should return Swagger UI', async ({ request }) => {
    const response = await request.get('/docs');
    expect(response.status()).toBe(200);
  });

});
