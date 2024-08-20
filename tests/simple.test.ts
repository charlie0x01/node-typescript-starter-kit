import request from 'supertest';

import app from '../src/app';
describe('Simple', () => {
  test('Welcome APIs Test', async () => {
    // define number of assertions expected to be true
    expect.assertions(2);
    // test request
    const response = await request(app).get('/api/v1');
    // assertion 1, test is response success is equel to true
    expect(response?.body?.success).toBe(true);
    // assertion 2, test response message is equel to expected message
    expect(response?.body?.message).toBe('Welcome to Node Typescript Starter Kit');
  });
});
