import { Request, Response, NextFunction } from 'express';
import status from 'http-status';

const requireUser = (_req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  if (!user) {
    return res.status(status.FORBIDDEN).send({ message: 'forbidden' });
  }

  return next();
};

export default requireUser;
