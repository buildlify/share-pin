import 'dotenv/config';
import { log } from './utils/logger';
import createServer from './utils/server';
import swaggerDocs from './utils/swagger';

const app = createServer();

const port = Number(process.env.PORT) || 4000;

app.listen(port, async () => {
  log.info(`app is running on port ${port}`);

  // todo: do NOT use this in production
  swaggerDocs(app, port);
});
