import { Op } from "sequelize";
import { Sequelize } from "sequelize-typescript";

import StationStatisticsRequest from "../interfaces/StationStatisticsRequest";
import Trip from "../models/trip";

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

export default {
  getStationTripStatistics
};