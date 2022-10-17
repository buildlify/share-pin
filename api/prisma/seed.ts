import { PrismaClient } from '@prisma/client';
import { log } from '../src/utils/logger';

const prisma = new PrismaClient();

const seedDatabase = async () => {
  log.info('add this later');
};

seedDatabase()
  .catch((e) => {
    // todo: add type here
    // todo: add type here
    // todo: add type here
    log.info(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
