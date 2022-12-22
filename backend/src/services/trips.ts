import { Op } from "sequelize";
import { Sequelize } from "sequelize-typescript";

import StationStatisticsRequest from "../interfaces/StationStatisticsRequest";
import Trip from "../models/trip";

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
      [Sequelize.literal(`AVG("distanceMeters") FILTER (WHERE "startStationId" = '${stationStatisticsRequest.id}')`), 'departuresAverageDistance'],
      [Sequelize.literal(`COUNT("id") FILTER (WHERE "startStationId" = '${stationStatisticsRequest.id}')`), 'departuresCount'],
      [Sequelize.literal(`AVG("distanceMeters") FILTER (WHERE "endStationId" = '${stationStatisticsRequest.id}')`), 'arrivalsAverageDistance'],
      [Sequelize.literal(`COUNT("id") FILTER (WHERE "endStationId" = '${stationStatisticsRequest.id}')`), 'arrivalsCount']
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