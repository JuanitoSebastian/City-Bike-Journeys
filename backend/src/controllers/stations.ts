import express from 'express';
import { RequestHandler, Request, Response } from 'express';
import { Sequelize } from 'sequelize-typescript';

import { DEFAULT_QUERY_LIMIT } from '../utils/constants';
import { Language } from '../types';
import City from '../models/city';
import CityName from '../models/cityName';
import Station from '../models/station';
import StationAddress from '../models/stationAddress';
import StationName from '../models/stationName';

const router = express.Router();

router.get('/', (async (request: Request, response: Response) => {
    const limit = Number(request.query.limit) || DEFAULT_QUERY_LIMIT;
    const offset = Number(request.query.offset) || 0;
    const languageName = request.query.language || Language.English;
    const languageCity = languageName === Language.English ? Language.Finnish : languageName;
    const languageAddress = languageName === Language.English ? Language.Finnish : languageName;

    const stations = await Station.findAll({
      subQuery: false,
      raw: true,
      nest: true,
      limit,
      offset,
      attributes: [
        'id',
        [Sequelize.col('names.name'), 'name'],
        [Sequelize.col('addresses.address'), 'address'],
        [Sequelize.col('city.names.cityName'), 'city'],
        'maximumCapacity',
        'latitude',
        'longitude'
      ],
      include: [
        { model: City, include: [{ model: CityName, attributes: [], where: { language: languageCity } }] },
        { model: StationAddress, attributes: [], where: { language: languageAddress } },
        { model: StationName, attributes: [], where: { language: languageName } }
      ],
      order: [['id', 'ASC']]
    });

    response.json(stations);
  }) as RequestHandler);

export default router;