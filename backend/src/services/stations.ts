import { Sequelize } from 'sequelize-typescript';
import ListRequest from '../interfaces/ListRequest';
import StationRequest from '../interfaces/StationRequest';
import { Language } from '../interfaces/StringInLanguage';

import City from '../models/city';
import CityName from '../models/cityName';
import Station from '../models/station';
import StationAddress from '../models/stationAddress';
import StationName from '../models/stationName';

const getMany = async (listRequest: ListRequest): Promise<Station[]> => {

  const languageCity = listRequest.language === Language.English ? Language.Finnish : listRequest.language;
  const languageAddress = listRequest.language === Language.English ? Language.Finnish : listRequest.language;

  const stations = await Station.findAll({
    subQuery: false,
    raw: true,
    nest: true,
    limit: listRequest.limit,
    offset: listRequest.offset,
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
      { model: StationName, attributes: [], where: { language: listRequest.language } }
    ],
    order: [[listRequest.sortBy, listRequest.order]]
  });

  return stations;
};

const getSingle = async (stationRequest: StationRequest): Promise<Station | null> => {
  const languageCity = stationRequest.language === Language.English ? Language.Finnish : stationRequest.language;
  const languageAddress = stationRequest.language === Language.English ? Language.Finnish : stationRequest.language;

  const station = await Station.findByPk(stationRequest.id, {
    subQuery: false,
    raw: true,
    nest: true,
    attributes: [
      'id',
      [Sequelize.col('names.name'), 'name'],
      [Sequelize.col('addresses.address'), 'address'],
      [Sequelize.col('city.names.cityName'), 'city'],
      'maximumCapacity',
      'latitude',
<<<<<<< HEAD
      'longitude'
=======
      'longitude',
      [Sequelize.literal('(SELECT COUNT(*) FROM "Trips" WHERE "Trips"."endStationId" = "Station"."id")'), 'arrivals'],
      [Sequelize.literal('(SELECT COUNT(*) FROM "Trips" WHERE "Trips"."startStationId" = "Station"."id")'), 'departures']
>>>>>>> 918a7bed3917975c938691bc7504ea91281f0b0e
    ],
    include: [
      { model: City, include: [{ model: CityName, attributes: [], where: { language: languageCity } }] },
      { model: StationAddress, attributes: [], where: { language: languageAddress } },
      { model: StationName, attributes: [], where: { language: stationRequest.language } }
    ]
  });

  return station;
};

export default {
  getMany: getMany,
  getSingle: getSingle
};