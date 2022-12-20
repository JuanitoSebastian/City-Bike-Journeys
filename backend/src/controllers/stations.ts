import express from 'express';
import { RequestHandler, Request, Response } from 'express';

import ListRequest from '../interfaces/ListRequest';
import StationsService from '../services/stations';
import { validateListRequest } from '../validation/requests';

const router = express.Router();

router.get('/', (async (request: Request, response: Response) => {
    const listRequest: ListRequest = validateListRequest(request);

    const stations = await StationsService.getMany(listRequest);

    response.json(stations);
  }) as RequestHandler);

export default router;