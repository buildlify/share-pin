import { object, string } from 'zod';

export const updateUsernameSchema = object({
  body: object({
    userId: string({ required_error: 'userId is required' }),
    newUsername: string({ required_error: 'newUsername is required' }),
  }),
});

export type UpdateUsernameInput = typeof updateUsernameSchema._input.body;
