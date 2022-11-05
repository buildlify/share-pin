import { NextFunction, Request, Response } from 'express';

type Error = { statusCode: number; message: string };

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- next has to be here even though it is unused
  next: NextFunction,
) => {
  error.statusCode = error.statusCode || 500;
  error.message = error.message || 'error';
  res.status(error.statusCode).json({
    statusCode: error.statusCode,
    message: error.message,
  });
};

export default errorHandler;
