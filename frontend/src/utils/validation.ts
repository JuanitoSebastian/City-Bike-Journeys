import type { ApiReponse, ApiResponsePagingDetails, PagingDetails, Station, StationStatistics } from './interfaces';

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
  'total' in pagingDetails && typeof pagingDetails.total === 'number' &&
  'page' in pagingDetails && typeof pagingDetails.page === 'number' &&
  'pages' in pagingDetails && typeof pagingDetails.pages === 'number';
};

export const parsePagingDetails = (pagingDetails: unknown): PagingDetails => {
  if (!pagingDetails || !isPagingDetails(pagingDetails)) {
    throw new Error('Incorrect type, not PagingDetails');
  }

  return pagingDetails;
};

const isStation = (station: unknown): station is Station => {
  return typeof station === 'object' && station !== null &&
  'id' in station && typeof station.id === 'string' &&
  'name' in station && typeof station.name === 'string' &&
  'address' in station && typeof station.address === 'string' &&
  'city' in station && typeof station.city === 'string' &&
  'maximumCapacity' in station && typeof station.maximumCapacity === 'number' &&
  'latitude' in station && typeof station.latitude === 'number' &&
  'longitude' in station && typeof station.longitude === 'number';
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
  'arrivalsCount' in stationStatistics && typeof stationStatistics.arrivalsCount === 'number' &&
  'departuresCount' in stationStatistics && typeof stationStatistics.departuresCount === 'number' &&
  'arrivalsAverageDistance' in stationStatistics && typeof stationStatistics.arrivalsAverageDistance === 'number' &&
  'departuresAverageDistance' in stationStatistics && typeof stationStatistics.departuresAverageDistance === 'number';
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