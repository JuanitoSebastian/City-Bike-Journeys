import { isDate } from 'util/types';
import StationResponseData from '../interfaces/StationResponseData';
import StationStatisticsResponseData from '../interfaces/StationStatisticsResponseData';
import TripResponseData from '../interfaces/TripResponseData';
import { isArray, isNumber, isString } from './basicTypes';
import InternalValidationError from '../errors/InternalValidationError';

const isStationResponseData = (stationResponseData: unknown): stationResponseData is StationResponseData => {
  return typeof stationResponseData === 'object' && stationResponseData !== null &&
    'id' in stationResponseData && isString(stationResponseData.id) &&
    'name' in stationResponseData && isString(stationResponseData.name) &&
    'address' in stationResponseData && isString(stationResponseData.address) &&
    'city' in stationResponseData && isString(stationResponseData.city) &&
    'maximumCapacity' in stationResponseData && isNumber(stationResponseData.maximumCapacity) &&
    'latitude' in stationResponseData && isNumber(stationResponseData.latitude) &&
    'longitude' in stationResponseData && isNumber(stationResponseData.longitude);
};

export const parseStationResponseData = (stationResponseData: unknown): StationResponseData => {
  if (!stationResponseData || !isStationResponseData(stationResponseData)) {
    throw new InternalValidationError('Incorrect type, not StationResponseData');
  }

  return stationResponseData;
};

export const parseStationResponseDataArray = (stationResponseDataArray: unknown): StationResponseData[] => {
  if (!stationResponseDataArray || !isArray(stationResponseDataArray)) {
    throw new InternalValidationError('Incorrect type, not Array');
  }

  for (const station of stationResponseDataArray) {
    if (!station || !isStationResponseData(station)) {
      throw new InternalValidationError('Incorrect type, not Station');
    }
  }
  
  return stationResponseDataArray;
};

const isStationStatisticsResponseData = (stationStatisticsResponseData: unknown): stationStatisticsResponseData is StationStatisticsResponseData => {
  return typeof stationStatisticsResponseData === 'object' && stationStatisticsResponseData !== null &&
    'arrivalsCount' in stationStatisticsResponseData && isNumber(stationStatisticsResponseData.arrivalsCount) &&
    'departuresCount' in stationStatisticsResponseData && isNumber(stationStatisticsResponseData.departuresCount) &&
    'arrivalsAverageDistance' in stationStatisticsResponseData && 
    (isNumber(stationStatisticsResponseData.arrivalsAverageDistance) || stationStatisticsResponseData.arrivalsAverageDistance === null) &&
    'departuresAverageDistance' in stationStatisticsResponseData && 
    (isNumber(stationStatisticsResponseData.departuresAverageDistance) || stationStatisticsResponseData.departuresAverageDistance === null);
};

export const parseStationStatisticsResponseData = (stationStatisticsResponseData: unknown): StationStatisticsResponseData => {
  if (!stationStatisticsResponseData || !isStationStatisticsResponseData(stationStatisticsResponseData)) {
    throw new InternalValidationError('Incorrect type, not StationStatisticsResponseData');
  }

  return stationStatisticsResponseData;
};

const isTripResponseData = (tripResponseData: unknown): tripResponseData is TripResponseData => {
  return typeof tripResponseData === 'object' && tripResponseData !== null &&
    'id' in tripResponseData && isNumber(tripResponseData.id) &&
    'startTime' in tripResponseData && isDate(tripResponseData.startTime) &&
    'endTime' in tripResponseData && isDate(tripResponseData.endTime) &&
    'startStation' in tripResponseData && isString(tripResponseData.startStation) &&
    'endStation' in tripResponseData && isString(tripResponseData.endStation) &&
    'distanceMeters' in tripResponseData && isNumber(tripResponseData.distanceMeters) &&
    'durationSeconds' in tripResponseData && isNumber(tripResponseData.durationSeconds);
};

export const parseTripResponseData = (tripResponseData: unknown): TripResponseData => {
  if (!tripResponseData || !isTripResponseData(tripResponseData)) {
    throw new InternalValidationError('Incorrect type, not TripResponseData');
  }

  return tripResponseData;
};

export const parseTripResponseDataArray = (tripResponseDataArray: unknown): TripResponseData[] => {
  if (!tripResponseDataArray || !isArray(tripResponseDataArray)) {
    throw new InternalValidationError('Incorrect type, not an array');
  }

  for (const tripResponseData of tripResponseDataArray) {
    if (!tripResponseData || !isTripResponseData(tripResponseData)) {
      throw new InternalValidationError('Incorrect type, not type TripResponseData');
    }
  }

  return tripResponseDataArray;
};