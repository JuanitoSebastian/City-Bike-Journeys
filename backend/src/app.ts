import express from 'express';
import middleware from './utils/middleware';
import cors from 'cors';


import tripsRouter from './controllers/trips';
import stationsRouter from './controllers/stations';
import seedingsRouter from './controllers/seedings';
import testRouter from './controllers/testing';
import sanitizedConfig from './utils/config';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/trip', tripsRouter);
app.use('/station', stationsRouter);
app.use('/seeding', seedingsRouter);

if (sanitizedConfig.NODE_ENV === 'test') {
  app.use('/test', testRouter);
}

app.use(middleware.unknownEndPoint);
app.use(middleware.errorHandler);


export default app;