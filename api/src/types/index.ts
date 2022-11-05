import { Request } from 'express';

export type RequestWithBodyInput<T> = Request<
  Record<string, never>,
  Record<string, never>,
  T
>;

export type SuccessMessage = { message: 'success' };
