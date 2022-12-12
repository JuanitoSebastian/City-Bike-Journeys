import express from 'express';
import { RequestHandler } from 'express';
import City from '../models/city';
import CityName from '../models/cityName';
import Station from '../models/station';
import StationAddress from '../models/stationAddress';
import StationName from '../models/stationName';

const router = express.Router();

router.get('/', (async (_request, response) => {
  const trips = await Station.findAll({
    include: [
      { model: City, include: [CityName] },
      { model: StationName },
      { model: StationAddress }
    ]
  });
  response.json(trips);
}) as RequestHandler);

export default router;