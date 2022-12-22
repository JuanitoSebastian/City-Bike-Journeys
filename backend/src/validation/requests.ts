import { Request } from "express";

import ListRequest, { Order, SortBy } from "../interfaces/ListRequest";
import StationRequest from "../interfaces/StationRequest";
import StationStatisticsRequest from "../interfaces/StationStatisticsRequest";
import { Language } from "../interfaces/StringInLanguage";
import { DEFAULT_LANGUAGE, DEFAULT_QUERY_LIMIT } from "../utils/constants";
import { parseDate } from "./basicTypes";

/**
 * Parses given Request object and extracts a ListRequest from query parameters.
 * @param request Request object to parse
 * @returns Always a ListRequest. If a value cannot be parsed it replaced by a default value.
 */
export const validateListRequest = (request: Request): ListRequest => {

  let limit = Number(request.query.limit) || DEFAULT_QUERY_LIMIT;

  if (limit > 50) { 
    limit = DEFAULT_QUERY_LIMIT;
  }

  const listRequest: ListRequest = {
    limit,
    offset: Number(request.query.offset) || 0,
    language: enumFromStringValue(Language, request.query.language?.toString()) || DEFAULT_LANGUAGE,
    sortBy: enumFromStringValue(SortBy, request.query.list_by?.toString()) || SortBy.Id,
    order: enumFromStringValue(Order, request.query.order?.toString()) || Order.ASC
  };

  return listRequest;
};

export const validateStationRequest = (request: Request): StationRequest => {
  const stationRequest: StationRequest = {
    id: request.params.id,
    language: enumFromStringValue(Language, request.query.language?.toString()) || DEFAULT_LANGUAGE 
  };
  return stationRequest;
};

export const validateStationStatisticsRequest = (request: Request): StationStatisticsRequest => {
  try {
    const startDate = parseDate(request.query.start_date?.toString());
    const endDate = parseDate(request.query.end_date?.toString());
    return {
      id: request.params.id,
      startDate,
      endDate
    };
  } catch {
    return {
      id: request.params.id,
      startDate: undefined,
      endDate: undefined
    };
  }
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