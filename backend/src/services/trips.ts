import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import StationStatisticsRequest from '../interfaces/StationStatisticsRequest';
import TripListRequest from '../interfaces/TripListRequest';
import Station from '../models/station';
import StationName from '../models/stationName';
import Trip from '../models/trip';

/**
 * Fetches multiple trips from DB
 * @param tripListRequest Requesst with limit and offset
 * @returns A list of Trip objects with the following fields:
 * - id
 * - startTime
 * - endTime
 * - startStation: name of start station (in given language from request)
 * - endStation: name of end station (in given language from request)
 * - distanceMeters
 * - durationSeconds
 */
const getMany = async (tripListRequest: TripListRequest): Promise<Trip[]> =>  {
  const trips = await Trip.findAll({
    subQuery: false,
    raw: true,
    nest: true,
    limit: tripListRequest.limit,
    offset: tripListRequest.offset,
    attributes: [
      'id',
      'startTime',
      'endTime',
      [Sequelize.col('startStation.names.name'), 'startStation'],
      [Sequelize.col('endStation.names.name'), 'endStation'],
      'distanceMeters',
      'durationSeconds'
    ],
    include: [
      { model: Station, as: 'startStation', on: { id: { [Op.eq]: Sequelize.col('Trip.startStationId') } }, attributes: [], include: [{ model: StationName, attributes: [], where: { language: tripListRequest.language } }]},
      { model: Station, as: 'endStation', on: { id: { [Op.eq]: Sequelize.col('Trip.endStationId') } }, attributes: [], include: [{ model: StationName, attributes: [], where: { language: tripListRequest.language } }]}
    ],
    order: [['startTime', 'ASC']]
  });

  return trips;
};

/**
 * Fetches statistics of a single station from database
 * @param stationStatisticsRequest Station id and filter by date
 * @returns A Trip object with the following fields:
 * - arrivalsCount: number of arrivals to station
 * - departuresCount: number of departures from station
 * - arrivalsAverageDistance: Average distance of arriving trips
 * - departuresAverageDistance: Average distance of departing trips
 */
const getStationTripStatistics = async (stationStatisticsRequest: StationStatisticsRequest): Promise<Trip | null> => {

  const whereDates = stationStatisticsRequest.startDate && stationStatisticsRequest.endDate
    ? {
      startTime: {
        [Op.gt]: stationStatisticsRequest.startDate
      },
      endTime: {
        [Op.lt]: stationStatisticsRequest.endDate
      }
    }
    : {};

  const trips = await Trip.findOne({
    attributes: [
      [Sequelize.literal(`COUNT("id") FILTER (WHERE "endStationId" = '${stationStatisticsRequest.id}')`), 'arrivalsCount'],
      [Sequelize.literal(`COUNT("id") FILTER (WHERE "startStationId" = '${stationStatisticsRequest.id}')`), 'departuresCount'],
      [Sequelize.literal(`AVG("distanceMeters") FILTER (WHERE "endStationId" = '${stationStatisticsRequest.id}')`), 'arrivalsAverageDistance'],
      [Sequelize.literal(`AVG("distanceMeters") FILTER (WHERE "startStationId" = '${stationStatisticsRequest.id}')`), 'departuresAverageDistance'],
    ],
    where: {
      [Op.and]: {
        ...whereDates,
        [Op.or]: {
          startStationId: stationStatisticsRequest.id,
          endStationId: stationStatisticsRequest.id
        } 
      }
    }
  });

  return trips;
};

/**
 * Counts all Trips in DB
 * @returns Number of all trips
 */
const getCount = async (): Promise<number> => {
  const count = await Trip.count();
  return count;
};

export default {
  getMany,
  getStationTripStatistics,
  getCount
};