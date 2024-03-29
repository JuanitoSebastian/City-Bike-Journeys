import { Request } from 'express';
import ValidationError from '../errors/ValidationError';

import StationListRequest, { StationListOrder, StationListSortBy } from '../interfaces/StationListRequest';
import StationRequest from '../interfaces/StationRequest';
import StationStatisticsRequest from '../interfaces/StationStatisticsRequest';
import { Language } from '../interfaces/StringInLanguage';
import { DEFAULT_LANGUAGE, DEFAULT_QUERY_LIMIT } from '../utils/constants';
import { parseDate } from './basicTypes';
import TripListRequest from '../interfaces/TripListRequest';

const stationIdRegex = /^[0-9]{3,5}$/;

/**
 * Parses given Request object and extracts a ListRequest from query parameters.
 * @param request Request object to parse
 * @returns Always a StationListRequest. If a value cannot be parsed it replaced by a default value.
 */
export const validateListRequest = (request: Request): StationListRequest => {

  let limit = Number(request.query.limit) || DEFAULT_QUERY_LIMIT;

  if (limit > 50 || limit < 1) { 
    limit = DEFAULT_QUERY_LIMIT;
  }

  const listRequest: StationListRequest = {
    limit,
    offset: Number(request.query.offset) || 0,
    language: enumFromStringValue(Language, request.query.language?.toString()) || DEFAULT_LANGUAGE,
    sortBy: enumFromStringValue(StationListSortBy, request.query.order_by?.toString()) || StationListSortBy.Id,
    order: enumFromStringValue(StationListOrder, request.query.order?.toString()) || StationListOrder.ASC
  };

  return listRequest;
};

/**
 * Parses given Request object and extracts a StationRequest from parameters.
 * @param request Request object to parse
 * @throws With invalid id
 * @returns StationRequest. If id is invalid, an error is thrown.
 */
export const validateStationRequest = (request: Request): StationRequest => {
  const id = request.params.id;

  if (!stationIdRegex.test(id)) { throw new ValidationError('Invalid station id'); }

  const stationRequest: StationRequest = {
    id: request.params.id,
    language: enumFromStringValue(Language, request.query.language?.toString()) || DEFAULT_LANGUAGE 
  };
  return stationRequest;
};

/**
 * Parses given Request object and extracts a StationStatisticsRequest from parameters.
 * @param request Request object to parse
 * @throws With invalid id or invalid date range
 * @returns StationStatisticsRequest. If a value cannot be parsed or value is invalid, an error is thrown.
 */
export const validateStationStatisticsRequest = (request: Request): StationStatisticsRequest => {
  const id = request.params.id;
  let startDate: string | undefined;
  let endDate: string | undefined;

  if (!stationIdRegex.test(id)) { throw new ValidationError('Invalid station id'); }
  
  try {
    startDate = parseDate(request.query.start_date?.toString());
    endDate = parseDate(request.query.end_date?.toString());
  } catch {
    return {
      id,
      startDate,
      endDate
    };
  }

  if (startDate > endDate || endDate < startDate) { throw new ValidationError('Invalid date range'); }

  return {
    id,
    startDate,
    endDate
  };
};

/**
 * Parses given Request object and extracts a TripListRequest from query parameters
 * @param request Request object to parse
 * @returns Always a TripListRequest. If a value cannot be parsed it replaced by a default value.
 */
export const validateTripListRequest = (request: Request): TripListRequest => {
  let limit = Number(request.query.limit) || DEFAULT_QUERY_LIMIT;

  if (limit > 50 || limit < 1) { 
    limit = DEFAULT_QUERY_LIMIT;
  }

  const tripListRequest: TripListRequest = {
    limit,
    offset: Number(request.query.offset) || 0,
    language: enumFromStringValue(Language, request.query.language?.toString()) || DEFAULT_LANGUAGE,
  };

  return tripListRequest;

};

/**
 * Parses an enum from a string. Enum has to have an associated string to it.
 * @param enumToParse Enum type
 * @param value String to parse
 * @returns On succeed an enum. On fail undefined.
 */
const enumFromStringValue = <T> (enumToParse: { [s: string]: T}, value: string | undefined): T | undefined => {
  if (!value) return undefined;
  return (Object.values(enumToParse) as unknown as string[]).includes(value)
    ? value as unknown as T
    : undefined;
};