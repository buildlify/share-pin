import supertest from 'supertest';
import createServer from '../utils/server';
import * as authService from '../services/auth.service';
import * as userService from '../services/user.service';
import * as sessionService from '../services/session.service';
import { authFixtures } from '../__fixtures__';

const app = createServer();
describe('auth routes', () => {
  describe('verify email route', () => {
    describe('if a valid email is passed', () => {
      it('should return status code 200', async () => {
        const sendEmailMock = jest
          .spyOn(authService, 'sendEmailWithRegisterLink')
          // @ts-ignore -- cannot pass promise type
          .mockReturnValueOnce(authFixtures.emailPayload);

        const { statusCode, body } = await supertest(app)
          .post('/api/v1/auth/verify-email')
          .send(authFixtures.emailInput);

        expect(statusCode).toBe(200);
        expect(body).toEqual(authFixtures.emailPayload);
        expect(sendEmailMock).toHaveBeenCalledWith(authFixtures.emailInput);
      });
    });
    describe('if invalid email is passed', () => {
      it('should return status code 400', async () => {
        const { statusCode } = await supertest(app)
          .post('/api/v1/auth/verify-email')
          .send({ email: 'invalid-email' });
        expect(statusCode).toBe(400);
      });
    });
    describe('if no email is passed', () => {
      it('should return status code 400', async () => {
        const { statusCode } = await supertest(app).post(
          '/api/v1/auth/verify-email',
        );
        expect(statusCode).toBe(400);
      });
    });
  });
  describe('validate register token route', () => {
    describe('if valid register token is passed', () => {
      it('should return status code 200 and response that token is valid', async () => {
        const { statusCode, body } = await supertest(app)
          .post('/api/v1/auth/validate-register-token')
          .send(authFixtures.tokenInput);

        expect(statusCode).toBe(200);
        expect(body).toEqual(authFixtures.tokenPayloadValid);
      });
    });
    describe('if invalid or expired register token is passed', () => {
      it('should return status code 401 and response that token is not valid', async () => {
        const { statusCode, body } = await supertest(app)
          .post('/api/v1/auth/validate-register-token')
          .send({ token: 'invalid or expired token' });

        expect(statusCode).toBe(401);
        expect(body).toEqual(authFixtures.tokenPayloadInvalid);
      });
    });
    describe('if no token is passed', () => {
      it('should return status code 400', async () => {
        const { statusCode } = await supertest(app).post(
          '/api/v1/auth/validate-register-token',
        );

        expect(statusCode).toBe(400);
      });
    });
  });
  describe('register new user route', () => {
    describe('if valid data is passed', () => {
      it('should return status code 200', async () => {
        const checkIfUserExistsMock = jest
          .spyOn(userService, 'checkIfUserExists')
          // @ts-ignore -- cannot pass promise type
          .mockReturnValueOnce(false);
        const createNewUserMock = jest
          .spyOn(userService, 'createNewUser')
          // @ts-ignore -- cannot pass promise type
          .mockReturnValueOnce('test');
        const createSessionMock = jest
          .spyOn(sessionService, 'createSession')
          // @ts-ignore -- cannot pass promise type
          .mockReturnValueOnce('test');

        const { statusCode } = await supertest(app)
          .post('/api/v1/auth/register')
          .send(authFixtures.registerUserInput);

        expect(checkIfUserExistsMock).toBeCalledTimes(1);
        expect(createNewUserMock).toBeCalledTimes(1);
        expect(createSessionMock).toBeCalledTimes(1);

        expect(statusCode).toBe(201);
      });
    });
    describe('if invalid email is passed', () => {
      it('should return status code 400 and response that token is not valid', async () => {
        const { statusCode } = await supertest(app)
          .post('/api/v1/auth/validate-register-token')
          .send(authFixtures.registerUserInputInvalidEmail);

        expect(statusCode).toBe(400);
      });
    });
    describe('if username with less than 3 characters is passed', () => {
      it('should return status code 400', async () => {
        const { statusCode } = await supertest(app)
          .post('/api/v1/auth/validate-register-token')
          .send(authFixtures.registerUserInputInvalidUsername);

        expect(statusCode).toBe(400);
      });
    });
    describe('if password with less than 8 characters is passed', () => {
      it('should return status code 400', async () => {
        const { statusCode } = await supertest(app)
          .post('/api/v1/auth/validate-register-token')
          .send(authFixtures.registerUserInputInvalidPassword);

        expect(statusCode).toBe(400);
      });
    });
  });
});
