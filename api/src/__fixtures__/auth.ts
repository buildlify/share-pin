import { signJwt } from '../services/jwt.service';
import { faker } from '@faker-js/faker';

export const emailInput = { email: 'test@email.com' };
export const emailPayload = { message: 'success' };
export const tokenInput = {
  token: signJwt({}, { expiresIn: '1m' }),
};
export const tokenPayloadValid = { message: 'token valid' };
export const tokenPayloadInvalid = { message: 'token invalid' };

export const registerUserPayload = {
  userId: faker.word.noun(5),
};

export const registerUserInput = {
  email: faker.internet.email(),
  username: faker.word.noun(5),
  password: faker.internet.password(),
};
export const registerUserInputInvalidEmail = {
  email: faker.word.noun(5),
  username: faker.word.noun(5),
  password: faker.internet.password(),
};
export const registerUserInputInvalidUsername = {
  email: faker.internet.email(),
  username: faker.word.noun(1),
  password: faker.word.noun(5),
};
export const registerUserInputInvalidPassword = {
  email: faker.internet.email(),
  username: faker.word.noun(5),
  password: faker.word.noun(1),
};
