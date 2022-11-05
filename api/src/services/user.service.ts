import { RegisterNewUserInput } from '../schemas/auth.schema';
import prisma from '../libs/prisma';
import bcrypt from 'bcrypt';
import { Post, User } from '@prisma/client';

const checkIfUserExists = async (
  property: 'email' | 'username',
  value: string,
): Promise<Omit<User, 'updatedAt'> | undefined> => {
  const user = await prisma.user.findUnique({
    where: {
      [property]: value,
    },
    select: {
      id: true,
      email: true,
      username: true,
      createdAt: true,
      password: true,
    },
  });

  if (!user) return undefined;
  return user;
};
const createNewUser = async (
  userInfo: RegisterNewUserInput,
): Promise<Omit<User, 'password' | 'updatedAt'>> => {
  const salt = await bcrypt.genSalt(Number(process.env.SALT_WORK_FACTOR));
  const hash = await bcrypt.hashSync(userInfo.password, salt);

  userInfo.password = hash;

  const user = await prisma.user.create({
    data: {
      ...userInfo,
    },
    select: {
      id: true,
      email: true,
      username: true,
      createdAt: true,
    },
  });

  return user;
};

const getUserById = async (
  userId: string,
): Promise<Omit<User, 'password' | 'updatedAt'>> => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
    select: {
      id: true,
      email: true,
      username: true,
      createdAt: true,
    },
  });

  return user;
};
const getUsersPosts = async (userId: string): Promise<Post[]> => {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: userId,
    },
    select: {
      posts: true,
    },
  });

  return user.posts;
};

const updateUsername = async (userId: string, username: string): Promise<User> => {
  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      username,
    },
  });

  return user;
};
export {
  checkIfUserExists,
  createNewUser,
  getUserById,
  getUsersPosts,
  updateUsername,
};
