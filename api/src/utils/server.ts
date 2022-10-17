import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';

const createServer = () => {
  const app = express();

  // enable cors
  app.use(cors());

  // gzip compression for better performance
  app.use(compression());

  // set security HTTP headers
  app.use(helmet());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // disable for security
  app.disable('x-powered-by');

  return app;
};

export default createServer;
