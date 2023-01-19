import express, { Response, Request } from 'express';
import { RequestHandler } from 'express';
import TripsService from '../services/trips';
import { validateTripListRequest } from '../validation/requests';

const router = express.Router();

router.get('/', (async (request: Request, response: Response) => {
  const tripListRequest = validateTripListRequest(request);
  const trips = await TripsService.getMany(tripListRequest);
  response.json({ data: trips });
}) as RequestHandler);

export default router;