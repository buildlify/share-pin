import { Request, Response } from 'express';
import {
  checkCredentials,
  sendEmailWithRegisterLink,
} from '../services/auth.service';
import status from 'http-status';
import {
  LoginUserInput,
  RegisterNewUserInput,
  VerifyEmailInput,
} from '../schemas/auth.schema';
import { RequestWithBodyInput } from '../types';
import { signJwt, verifyJwt } from '../services/jwt.service';
import { checkIfUserExists, createNewUser } from '../services/user.service';
import { HttpException } from '../utils/http-exception';
import { createSession } from '../services/session.service';

const verifyEmailHandler = async (
  req: RequestWithBodyInput<VerifyEmailInput>,
  res: Response,
) => {
  await sendEmailWithRegisterLink(req.body);
  return res.status(status.OK).send({ message: 'email sent successfully' });
};

const validateRegisterTokenHandler = async (req: Request, res: Response) => {
  const { decoded } = verifyJwt(req.params.token);

  if (!decoded) {
    return res.status(status.UNAUTHORIZED).send({ message: 'token invalid' });
  }

  return res
    .status(status.OK)
    .send({ email: decoded.email, message: 'token valid' });
};

const registerNewUserHandler = async (
  req: RequestWithBodyInput<RegisterNewUserInput>,
  res: Response,
) => {
  const emailExists = await checkIfUserExists('email', req.body.email);
  const usernameExists = await checkIfUserExists('username', req.body.username);
  if (emailExists || usernameExists)
    throw new HttpException(status.CONFLICT, 'user already exists');

  const user = await createNewUser(req.body);
  if (!user) throw new HttpException(status.CONFLICT, 'error creating user');

  const sessionId = await createSession(user.id);

  const refreshToken = signJwt(
    { sessionId },
    { expiresIn: process.env.JWT_REFRESH_TOKEN_TTL },
  );
  const accessToken = signJwt(
    { userId: user.id },
    { expiresIn: process.env.JWT_ACCESS_TOKEN_TTL },
  );

  res.cookie('x-refresh', refreshToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });
  res.cookie('x-token', accessToken, {
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });

  return res
    .status(status.CREATED)
    .send({ user, message: 'user create successfully' });
};

const loginUserHandler = async (
  req: RequestWithBodyInput<LoginUserInput>,
  res: Response,
) => {
  const user = await checkCredentials(req.body);
  // todo create functionality so when log out, delete session
  const sessionId = await createSession(user.id);

  const refreshToken = signJwt(
    { sessionId },
    { expiresIn: process.env.JWT_REFRESH_TOKEN_TTL },
  );
  const accessToken = signJwt(
    { userId: user.id },
    { expiresIn: process.env.JWT_ACCESS_TOKEN_TTL },
  );

  res.cookie('x-refresh', refreshToken, {
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
  });
  res.cookie('x-token', accessToken, {
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
  });

  return res.status(status.OK).send({ user, message: 'logged in successfully' });
};
export {
  verifyEmailHandler,
  validateRegisterTokenHandler,
  registerNewUserHandler,
  loginUserHandler,
};
