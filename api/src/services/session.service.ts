import { Session } from '@prisma/client';
import prisma from '../libs/prisma';
import getNextMonthsDate from '../utils/get-next-months-date';

const createSession = async (userId: string) => {
  const expires = getNextMonthsDate();
  const sessionId = await prisma.session.create({
    data: {
      userId,
      expires,
    },
    select: {
      id: true,
    },
  });

  return sessionId;
};

const getSession = async (sessionId: string): Promise<Session | null> => {
  const session = await prisma.session.findUniqueOrThrow({
    where: {
      id: sessionId,
    },
  });
  return session;
};

export { createSession, getSession };
