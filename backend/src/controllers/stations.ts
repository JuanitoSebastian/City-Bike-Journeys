import express, { NextFunction } from 'express';
import { RequestHandler, Request, Response } from 'express';

import StationListRequest from '../interfaces/StationListRequest';
import StationRequest from '../interfaces/StationRequest';
import StationStatisticsRequest from '../interfaces/StationStatisticsRequest';
import { Language } from '../interfaces/StringInLanguage';
import StationsService from '../services/stations';
import TripsService from '../services/trips';
import { validateListRequest, validateStationRequest, validateStationStatisticsRequest } from '../validation/requests';

const router = express.Router();

/**
 * Returns a list of stations
 * Query parameters:
 * - limit: Number of stations to return
 * - offset: How much is list offsetted by [for pagination]
 * - language: Preferred language for name, name of city and address [en, fi, sv]
 * - order_by: Field to sort results by [id, name]
 * - order: Order to return results by [ASC, DESC]
 */
router.get('/', (async (request: Request, response: Response) => {
  const listRequest: StationListRequest = validateListRequest(request);
  const stations = await StationsService.getMany(listRequest);
  const stationsCount = await StationsService.getCount();
  
  const paging = {
    total: stationsCount,
    page: Math.ceil(listRequest.offset / listRequest.limit),
    pages: Math.ceil(stationsCount / listRequest.limit)
  };

  response.json({ data: stations, paging });
}) as RequestHandler);

/**
 * Returns a single Station by id
 * Query parameters:
 * - id: Id of preferred Station (required)
 * - language: Preferred language for name, name of city and address [en, fi, sv] (not required)
 */
router.get('/:id', (async (request: Request, response: Response, next: NextFunction) => {
  try {
    const stationRequest: StationRequest = validateStationRequest(request);

    const station = await StationsService.getSingle(stationRequest);

    if (station === null) {
      const error = { name: 'NotFoundError', message: 'Station was not found' };
      next(error);
      return;
    }

    response.json({ data: station });
  } catch (error) {
    next(error);
  }
}) as RequestHandler);

/**
 * Returns statistics about a single Station
 * Query parameters:
 * - id: Id of preferred Station (required)
 * - start_date: Start date for filtering (not required)
 * - end_date: End date for filtering (not required)
 */
router.get('/:id/statistics', (async (request: Request, response: Response, next: NextFunction) => {
  try {
    const stationStatisticsRequest: StationStatisticsRequest = validateStationStatisticsRequest(request);

    const station = await StationsService.getSingle({ id: stationStatisticsRequest.id, language: Language.English});

    if (station === null) {
      const error = { name: 'NotFoundError', message: 'Station was not found' };
      next(error);
      return;
    }


    const tripsStatistics = await TripsService.getStationTripStatistics(stationStatisticsRequest);
    response.json({ data: tripsStatistics });
  } catch (error) {
    next(error);
  }
}) as RequestHandler);

export default router;