import { boolean, object, string } from 'zod';

export const createPostSchema = object({
  body: object({
    title: string({ required_error: 'title is required' }),
    body: string({ required_error: 'body is required' }),
    userId: string({ required_error: 'userId is required' }),
  }),
});

export type CreatePostInput = typeof createPostSchema._input.body;

export const updateVoteCountSchema = object({
  body: object({
    postId: string({ required_error: 'postId is required' }),
    agree: boolean({ required_error: 'agree is required' }),
    userId: string({ required_error: 'userId is required' }),
  }),
});

export type UpdateVoteCountInput = typeof updateVoteCountSchema._input.body;
