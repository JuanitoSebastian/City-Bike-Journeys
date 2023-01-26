import type { ApiReponse, ApiResponsePagingDetails, PagingDetails, Station, StationStatistics, Trip } from './interfaces';

const isArray = (array: unknown): array is [] => {
  return Array.isArray(array);
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect type, not string');
  }

  return text;
};

export const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect date: ' + date);
  }

  return date;
};

export const parseUnkownArray = (unknown: unknown): unknown[] => {
  if (!isArray(unknown)) {
    throw new Error('Incorrect type, not array');
  }
  return unknown;
};

const isNumber = (num: unknown): num is number => {
  return typeof num === 'number' || num instanceof Number;
};

export const parseNumber = (numberToParse: unknown): number => {
  if (!numberToParse || !isNumber(numberToParse)) {
    throw new Error('Incorrect type, not a number');
  }

  return numberToParse;
};

const isPagingDetails = (pagingDetails: unknown): pagingDetails is PagingDetails => {
  return typeof pagingDetails === 'object' && pagingDetails !== null &&
  'total' in pagingDetails && isNumber(pagingDetails.total) &&
  'page' in pagingDetails && isNumber(pagingDetails.page) &&
  'pages' in pagingDetails && isNumber(pagingDetails.pages);
};

export const parsePagingDetails = (pagingDetails: unknown): PagingDetails => {
  if (!pagingDetails || !isPagingDetails(pagingDetails)) {
    throw new Error('Incorrect type, not PagingDetails');
  }

  return pagingDetails;
};

const isStation = (station: unknown): station is Station => {
  return typeof station === 'object' && station !== null &&
  'id' in station && isString(station.id) &&
  'name' in station && isString(station.name) &&
  'address' in station && isString(station.address) &&
  'city' in station && isString(station.city) &&
  'maximumCapacity' in station && isNumber(station.maximumCapacity) &&
  'latitude' in station && isNumber(station.latitude) &&
  'longitude' in station && isNumber(station.longitude);
};

export const parseStation = (station: unknown): Station => {
  if (!station || !isStation(station)) {
    throw new Error('Incorrect type, not Station');
  }

  return station;
};

export const parseStationArray = (stationArray: unknown): Station[] => {
  if (!stationArray || !isArray(stationArray)) {
    throw new Error('Incorrect type, not Array');
  }

  for (const station of stationArray) {
    if (!station || !isStation(station)) {
      throw new Error('Incorrect type, not Station');
    }
  }
  
  return stationArray;
};

const isStationStatistics = (stationStatistics: unknown): stationStatistics is StationStatistics => {
  return typeof stationStatistics === 'object' && stationStatistics !== null &&
  'arrivalsCount' in stationStatistics && isNumber(stationStatistics.arrivalsCount) &&
  'departuresCount' in stationStatistics && isNumber(stationStatistics.departuresCount) &&
  'arrivalsAverageDistance' in stationStatistics && (stationStatistics.arrivalsAverageDistance === null || isNumber(stationStatistics.arrivalsAverageDistance)) &&
  'departuresAverageDistance' in stationStatistics && (stationStatistics.arrivalsAverageDistance === null || isNumber(stationStatistics.departuresAverageDistance));
};

export const parseStationStatistics = (stationStatistics: unknown): StationStatistics => {
  if (!stationStatistics || !isStationStatistics(stationStatistics)) {
    throw new Error('Incorrect type, not StationStatistics');
  }

  return stationStatistics;
};

const isApiResponse = (apiResponse: unknown): apiResponse is ApiReponse => {
  return typeof apiResponse === 'object' && apiResponse !== null &&
  'data' in apiResponse;
};

export const parseApiResponse = (apiResponse: unknown): ApiReponse => {
  if (!apiResponse || !isApiResponse(apiResponse)) {
    throw new Error('Incorrect type, not ApiResponse');
  }

  return apiResponse;
};

const isApiReponsePagingDetails = (apiResponsePagingDetails: unknown): apiResponsePagingDetails is ApiResponsePagingDetails => {
  return typeof apiResponsePagingDetails === 'object' && apiResponsePagingDetails !== null &&
  'paging' in apiResponsePagingDetails && isPagingDetails(apiResponsePagingDetails.paging) &&
  'data' in apiResponsePagingDetails;
};

export const parseApiResponsePagingDetails = (apiresponsePagingDetails: unknown): ApiResponsePagingDetails => {
  if (!apiresponsePagingDetails || !isApiReponsePagingDetails(apiresponsePagingDetails)) {
    throw new Error('Incorrect type, not ApiResponsePagingDetails');
  }

  return apiresponsePagingDetails;
};

const isTrip = (trip: unknown): trip is Trip => {
  return typeof trip === 'object' && trip !== null &&
    'id' in trip && typeof trip.id === 'number' &&
    'startTime' in trip && isString(trip.startTime) && isDate(trip.startTime) &&
    'endTime' in trip && isString(trip.endTime) && isDate(trip.endTime) &&
    'startStation' in trip && isString(trip.startStation) &&
    'endStation' in trip && isString(trip.endStation) &&
    'distanceMeters' in trip && isNumber(trip.distanceMeters) &&
    'durationSeconds' in trip && isNumber(trip.durationSeconds);
};

export const parseTrip = (trip: unknown): Trip => {
  if (!trip || !isTrip(trip)) {
    throw new Error('Incorrect type, not Trip');
  }

  return trip;
};

export const parseTripArray = (tripArray: unknown): Trip[] => {
  if (!tripArray || !isArray(tripArray)) {
    throw new Error('Incorrect type, not Array');
  }

  for (const trip of tripArray) {
    if (!trip || !isTrip(trip)) {
      throw new Error('Incorrect type, not Station');
    }
  }
  
  return tripArray;
};