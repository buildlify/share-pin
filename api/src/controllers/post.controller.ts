import { Response, Request } from 'express';
import status from 'http-status';
import { CreatePostInput, UpdateVoteCountInput } from '../schemas/post.schema';
import {
  createNewPost,
  getPostById,
  updateVoteCount,
} from '../services/post.service';
import { getUsersPosts } from '../services/user.service';
import { RequestWithBodyInput } from '../types';

const createPostHandler = async (
  req: RequestWithBodyInput<CreatePostInput>,
  res: Response,
) => {
  // todo have to not only authenticate but authorize here and make sure only logged in who is ALSO current user can create there own post not someone elses.
  const postId = await createNewPost(req.body);
  return res.status(status.CREATED).send({ postId });
};

const updateVoteCountHandler = async (
  req: RequestWithBodyInput<UpdateVoteCountInput>,
  res: Response,
) => {
  await updateVoteCount(req.body);
  return res.status(status.OK).send({ message: 'post updated successfully' });
};

const getPostHandler = async (req: Request, res: Response) => {
  const post = await getPostById(req.params.id);
  return res.status(status.OK).send({ post });
};

const getUsersPostsHandler = async (req: Request, res: Response) => {
  const posts = await getUsersPosts(req.params.id);
  return res.status(status.OK).send({ posts });
};

export {
  createPostHandler,
  updateVoteCountHandler,
  getPostHandler,
  getUsersPostsHandler,
};
