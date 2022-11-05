import status from 'http-status';
import { HttpException } from '../utils/http-exception';
import { LoginUserInput, VerifyEmailInput } from '../schemas/auth.schema';
import { sendRegisterEmail } from './mail.service';
import { SuccessMessage } from '../types';
import { checkIfUserExists } from './user.service';
import { signJwt, verifyJwt } from './jwt.service';
import bcrypt from 'bcrypt';
import { getSession } from './session.service';
import { log } from '../utils/logger';
import { User } from '@prisma/client';

const sendEmailWithRegisterLink = async ({
  email,
}: VerifyEmailInput): Promise<SuccessMessage> => {
  const userExists = await checkIfUserExists('email', email);

  if (userExists) throw new HttpException(status.CONFLICT, 'user already exists');

  const emailSent = await sendRegisterEmail(email);
  if (!emailSent) throw new HttpException(status.BAD_GATEWAY, 'error sending email');

  return { message: 'success' };
};

const reIssueNewAccessToken = async (
  refreshToken: string,
): Promise<string | false> => {
  const { decoded } = verifyJwt(refreshToken);
  if (!decoded || !decoded.sessionId) return false;

  try {
    const session = await getSession(decoded.sessionId.id);

    if (!session) return false;

    const accessToken = signJwt({}, { expiresIn: process.env.JWT_ACCESS_TOKEN_TTL });

    return accessToken;
  } catch (error) {
    log.error(error);
    return false;
  }
};

const checkCredentials = async (
  data: LoginUserInput,
): Promise<Omit<User, 'updatedAt'>> => {
  const { email, password } = data;

  const user = await checkIfUserExists('email', email);
  if (!user) throw new HttpException(status.UNAUTHORIZED, 'invalid credentials');

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) throw new HttpException(status.UNAUTHORIZED, 'invalid credentials');

  let userWithoutPassword = user;

  userWithoutPassword = { ...userWithoutPassword, password: '' };

  return userWithoutPassword;
};

export { sendEmailWithRegisterLink, reIssueNewAccessToken, checkCredentials };
