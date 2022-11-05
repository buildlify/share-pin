import { Post } from '@prisma/client';
import status from 'http-status';
import prisma from '../libs/prisma';
import { CreatePostInput, UpdateVoteCountInput } from '../schemas/post.schema';
import { HttpException } from '../utils/http-exception';

const createNewPost = async (postData: CreatePostInput): Promise<string> => {
  const post = await prisma.post.create({
    data: {
      ...postData,
    },
    select: {
      id: true,
    },
  });

  return post.id;
};

const updateVoteCount = async (voteData: UpdateVoteCountInput): Promise<string> => {
  const { postId, userId, agree } = voteData;
  const post = await prisma.post.findUniqueOrThrow({
    where: {
      id: postId,
    },
  });

  if (post.userId === userId)
    throw new HttpException(status.CONFLICT, 'cant vote on own post');

  if (post.disagree.includes(userId) || post.agree.includes(userId))
    throw new HttpException(status.CONFLICT, 'already voted on post');

  let action: 'agree' | 'disagree';
  agree ? (action = 'agree') : (action = 'disagree');

  await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      [action]: {
        push: userId,
      },
    },
  });

  return 'success';
};

const getPostById = async (postId: string): Promise<Post | null> => {
  const post = await prisma.post.findUniqueOrThrow({
    where: {
      id: postId,
    },
  });

  return post;
};

export { createNewPost, updateVoteCount, getPostById };
