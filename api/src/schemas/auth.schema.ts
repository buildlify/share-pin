import { object, string } from 'zod';

export const verifyEmailSchema = object({
  body: object({
    email: string({ required_error: 'email is required' }).email({
      message: 'invalid email',
    }),
  }),
});

export type VerifyEmailInput = typeof verifyEmailSchema._input.body;

export const registerNewUserSchema = object({
  body: object({
    email: string({ required_error: 'email is required' }).email({
      message: 'invalid email',
    }),
    username: string({ required_error: 'username is required' }).min(3, {
      message: 'username must be more then 2 characters',
    }),
    password: string({ required_error: 'password is required' }).min(8, {
      message: 'password must be more then 7 characters',
    }),
  }),
});

export type RegisterNewUserInput = typeof registerNewUserSchema._input.body;

export const loginUserSchema = object({
  body: object({
    email: string({ required_error: 'email is required' }).email({
      message: 'invalid email',
    }),
    password: string({ required_error: 'password is required' }).min(8, {
      message: 'password must be more then 7 characters',
    }),
  }),
});

export type LoginUserInput = typeof loginUserSchema._input.body;
