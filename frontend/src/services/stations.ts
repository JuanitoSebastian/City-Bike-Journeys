import type { PagingDetails, Station, StationsQueryParameters } from '../utils/interfaces';
import axios from 'axios';
import { parseApiResponsePagingDetails, parseStationArray } from '../utils/validation';

const baseUrl = `${process.env.API_URL}/station`;

/**
 * Fetches multiple stations from the API 
 * @param params: Stations query parameters
 * @returns A tuple [PagingDetails, Station[]]
 */
const getStations = async (params: StationsQueryParameters): Promise<[PagingDetails, Station[]]> => {
  const apiResponse = await axios.get(baseUrl, 
    { params: { order: params.order.value, language: params.language.value, order_by: params.orderBy.value, limit: params.limit, offset: params.offset  } }
  );
  const parsedApiResponse = parseApiResponsePagingDetails(apiResponse.data);
  const stations = parseStationArray(parsedApiResponse.data);
  return [parsedApiResponse.paging, stations];
};

export default {
  getStations
};