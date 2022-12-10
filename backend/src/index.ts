import express from 'express';
const app = express();

import sanitizedConfig from './utils/config';
import { initDatabase } from './utils/db';
import tripsRouter from './controllers/trips';

app.use(express.json());
app.use('/api/trips', tripsRouter);

const start = async () => {
  await initDatabase();
  app.listen(sanitizedConfig.PORT, () => {
    console.log(`Server running on port ${sanitizedConfig.PORT}`);
  });
};

void start();