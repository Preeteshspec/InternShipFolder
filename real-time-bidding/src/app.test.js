const request = require('supertest');
const app = require('./app');
const { sequelize } = require('./models');

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe('GET /', () => {
  it('should return 200 OK', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe('Real-time Bidding API');
  });
});

afterAll(async () => {
  await sequelize.close();
});
