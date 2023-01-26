import express, { Response, Request } from 'express';
import { RequestHandler } from 'express';
import TripsService from '../services/trips';
import { validateTripListRequest } from '../validation/requests';
import { parseTripResponseDataArray } from '../validation/responses';

const router = express.Router();

router.get('/', (async (request: Request, response: Response) => {
  const tripListRequest = validateTripListRequest(request);
  const trips = await TripsService.getMany(tripListRequest);
  const tripsCount = await TripsService.getCount();

  const paging = {
    total: tripsCount,
    page: Math.ceil(tripListRequest.offset / tripListRequest.limit),
    pages: Math.ceil(tripsCount / tripListRequest.limit)
  };
  const tripsResponseData = parseTripResponseDataArray(trips);

  response.json({ data: tripsResponseData, paging });
}) as RequestHandler);

export default router;