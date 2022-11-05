import supertest from 'supertest';
import createServer from '../utils/server';

const app = createServer();

describe('health check route', () => {
  describe('if the app is up and running', () => {
    it('should return status 200 and message that the app is running', async () => {
      const { statusCode, body } = await supertest(app).get('/api/v1/health');
      expect(statusCode).toBe(200);
      expect(body).toStrictEqual({ message: 'app is running' });
    });
  });
});
