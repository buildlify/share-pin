import express from 'express';
import cors from 'cors';
import compression from 'compression';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import errorHandler from '../middlewares/error-handler';
import notFound from '../middlewares/not-found';
import { router } from '../routes';
import deserializeUser from '../middlewares/deserialize-user';

const createServer = () => {
  const app = express();

  // enable cors
  app.use(cors({ credentials: true, origin: true }));

  // gzip compression for better performance
  app.use(compression());

  // set security HTTP headers
  app.use(helmet());

  // parse cookies
  app.use(cookieParser());

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // disable for security
  app.disable('x-powered-by');

  app.use(deserializeUser);

  app.use('/api/v1', router);

  app.use(notFound);

  app.use(errorHandler);

  return app;
};

export default createServer;
