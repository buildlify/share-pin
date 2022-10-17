import 'dotenv/config';
import { log } from './utils/logger';
import createServer from './utils/server';

const app = createServer();
const port = process.env.PORT || 4000;
app.listen(port, async () => {
  log.info(`app is running on port ${port}`);
});
