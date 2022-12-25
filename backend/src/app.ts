import express from 'express';
import middleware from './utils/middleware';

import tripsRouter from './controllers/trips';
import stationsRouter from './controllers/stations';

const app = express();

app.use(express.json());
app.use('/api/trip', tripsRouter);
app.use('/api/station', stationsRouter);
app.use(middleware.unknownEndPoint);
app.use(middleware.errorHandler);


export default app;