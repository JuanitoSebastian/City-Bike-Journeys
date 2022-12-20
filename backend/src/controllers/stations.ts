import express from 'express';
import { RequestHandler, Request, Response } from 'express';

import ListRequest from '../interfaces/ListRequest';
import StationRequest from '../interfaces/StationRequest';
import StationsService from '../services/stations';
import { validateListRequest, validateStationRequest } from '../validation/requests';

const router = express.Router();

router.get('/', (async (request: Request, response: Response) => {
  const listRequest: ListRequest = validateListRequest(request);
  const stations = await StationsService.getMany(listRequest);

  response.json({data:  stations });
}) as RequestHandler);

router.get('/:id', (async (request: Request, response: Response) => {
  const stationRequest: StationRequest = validateStationRequest(request);

  const station = await StationsService.getSingle(stationRequest);

  if (station === null) {
    // TODO: Proper error management
    response.status(404).send('Not found');
    return;
  }
  response.json({ data: station });
}) as RequestHandler);

export default router;