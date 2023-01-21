import type { PagingDetails, Station } from "../utils/interfaces";
import axios from "axios";
import { parseApiResponsePagingDetails, parseStationArray } from "../utils/validation";

const baseUrl = `${process.env.API_URL}/station`;

/**
 * Fetches multiple stations from the API 
 * @returns A tuple [PagingDetails, Station[]]
 */
const getStations = async (): Promise<[PagingDetails, Station[]]> => {
  const apiResponse = await axios.get(baseUrl);
  const parsedApiResponse = parseApiResponsePagingDetails(apiResponse.data);
  const stations = parseStationArray(parsedApiResponse.data);
  return [parsedApiResponse.paging, stations];
};

export default {
  getStations
};