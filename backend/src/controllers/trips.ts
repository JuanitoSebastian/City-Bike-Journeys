import express from 'express';
import { RequestHandler } from 'express';
import Trip from '../models/trip';

const router = express.Router();

router.get('/', (async (_request, response) => {
  const trips = await Trip.findAll();
  response.json(trips);
}) as RequestHandler);

export default router;