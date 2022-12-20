import { Request } from "express";

import ListRequest, { Order, SortBy } from "../interfaces/ListRequest";
import { Language } from "../interfaces/StringInLanguage";
import { DEFAULT_LANGUAGE, DEFAULT_QUERY_LIMIT } from "../utils/constants";

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