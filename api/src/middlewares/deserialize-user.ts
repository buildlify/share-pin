import { Request, Response, NextFunction } from 'express';
import { reIssueNewAccessToken } from '../services/auth.service';
import { verifyJwt } from '../services/jwt.service';
import { log } from '../utils/logger';

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  const refreshToken: string = req.cookies?.['x-refresh'];
  const accessToken: string = req.cookies?.['x-token'];

  if (!refreshToken || !accessToken) return next();

  const { decoded: accessDecoded } = verifyJwt(accessToken);

  if (accessDecoded) {
    res.locals.user = accessDecoded;
    return next();
  }

  // at this point, access token is expired && refresh token is still valid
  try {
    const newAccessToken = await reIssueNewAccessToken(refreshToken);
    // todo: what happens when refresh token expires?? and functionality for session expires, delete after?
    if (newAccessToken) {
      res.cookie('x-token', newAccessToken, {
        httpOnly: true,
        sameSite: 'strict',
        secure: true,
      });

      const decoded = verifyJwt(newAccessToken);
      res.locals.user = decoded;

      return next();
    }
    return next();
  } catch (error) {
    log.error(error);
    return next();
  }
};

export default deserializeUser;
