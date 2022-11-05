import { Request, Response } from 'express';

const notFound = (_req: Request, res: Response) => {
  res.status(404).json({ statusCode: 404, message: 'Not Found' });
};

export default notFound;
