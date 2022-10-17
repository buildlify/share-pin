import pino from 'pino';
import dayjs from 'dayjs';

export const log = pino({
  base: {
    pid: false,
  },

  ...(process.env.NODE_ENV === 'development' && {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
      },
    },
  }),
  timestamp: () => `,"time":"${dayjs().format()}"`,
});
