import { Request } from "express"
import ListRequest from "../interfaces/ListRequest"
import { Language } from "../interfaces/StringInLanguage";
import { DEFAULT_QUERY_LIMIT } from "../utils/constants";

export const validateListRequest = (request: Request): ListRequest => {
  const listRequest: ListRequest = {
    limit: Number(request.query.limit) || DEFAULT_QUERY_LIMIT,
    offset: Number(request.query.offset) || 0,
    language: request.query.language as Language || Language.English,
    sortBy: request.query.list_by?.toString() || 'id',
    order: request.query.order?.toString() || 'ASC'
  };

  return listRequest;
};