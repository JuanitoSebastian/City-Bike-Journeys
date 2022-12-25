import http from 'http';
import app from './app';
import { initDatabase } from './services/db';
import sanitizedConfig from './utils/config';

const server = http.createServer(app);

const start = async () => {
  await initDatabase();
  server.listen(sanitizedConfig.PORT, () => {
    console.log(`Server running on port ${sanitizedConfig.PORT}`);
  });
};

void start();
