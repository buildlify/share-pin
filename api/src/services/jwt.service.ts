import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';
import { log } from '../utils/logger';

const signJwt = (
  payload: Record<string, unknown>,
  options: jwt.SignOptions,
): string => {
  return jwt.sign(payload, `${process.env.JWT_PRIVATE_KEY}`, {
    ...(options && options),
    algorithm: 'RS256',
  });
};

const verifyJwt = (token: string): { decoded: JwtPayload | undefined } => {
  try {
    let decoded = jwt.verify(token, `${process.env.JWT_PUBLIC_KEY}`);
    decoded = decoded as JwtPayload;
    return {
      decoded,
    };
  } catch (err) {
    const error = err as JsonWebTokenError;
    log.error(error.message);
    return {
      decoded: undefined,
    };
  }
};

export { signJwt, verifyJwt };
