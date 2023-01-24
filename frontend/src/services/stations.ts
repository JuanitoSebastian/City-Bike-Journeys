import type { PagingDetails, Station, StationsQueryParameters, StationStatistics } from '../utils/interfaces';
import axios from 'axios';
import { parseApiResponse, parseApiResponsePagingDetails, parseStation, parseStationArray, parseStationStatistics } from '../utils/validation';

const baseUrl = `${process.env.API_URL}/station`;

/**
 * Fetches multiple stations from the API 
 * @param params: Stations query parameters
 * @returns A tuple [PagingDetails, Station[]]
 */
const getStations = async (params: StationsQueryParameters): Promise<[PagingDetails, Station[]]> => {
  const apiResponse = await axios.get(baseUrl,
    { params: { order: params.order.value, language: params.language.value, order_by: params.orderBy.value, limit: params.limit, offset: params.offset } }
  );
  const parsedApiResponse = parseApiResponsePagingDetails(apiResponse.data);
  const stations = parseStationArray(parsedApiResponse.data);
  return [parsedApiResponse.paging, stations];
};

/**
 * Fetch a single station form the API
 * @param stationId: id of station to fetch
 * @returns On success station object. On fail undefined.
 */
const getStation = async (stationId: string): Promise<Station | undefined> => {
  try {
    const apiResponse = await axios.get(`${baseUrl}/${stationId}`);
    const parsedApiResponse = parseApiResponse(apiResponse.data);
    const station = parseStation(parsedApiResponse.data);
    return station;
  } catch (error) {
    return undefined;
  }
};

/**
 * Fetch StationStatistics with a given stationId from API.
 * @param stationId: Id of station
 * @returns On success StationStatistics object. On fail undefined.
 */
const getStationStatistics = async (stationId: string): Promise<StationStatistics | undefined> => {
  try {
    const apiResponse = await axios(`${baseUrl}/${stationId}/statistics`);
    const parsedApiResponse = parseApiResponse(apiResponse.data);
    const stationStatistics = parseStationStatistics(parsedApiResponse.data);
    return stationStatistics;
  } catch (error) {
    return undefined;
  }
};

export default {
  getStations,
  getStation,
  getStationStatistics
};