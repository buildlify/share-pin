import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';
import status from 'http-status';

const validate =
  (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (e) {
      const err = e as ZodError;
      return res.status(status.BAD_REQUEST).send(err.errors);
    }
  };

export default validate;
