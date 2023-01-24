import axios from 'axios';
import type { PagingDetails, Trip, TripsQueryParameters } from '../utils/interfaces';
import { parseApiResponsePagingDetails, parseTripArray } from '../utils/validation';

const baseUrl = `${process.env.API_URL}/trip`;

/**
 * Fetch trips from API
 * @param params: Trips query parameters
 * @returns A tuple [PagingDetails, Trip[]]
 */
const getTrips = async (params: TripsQueryParameters): Promise<[PagingDetails, Trip[]]> => {
  const apiResponse = await axios.get(baseUrl,
    { params: { language: params.language.value, limit: params.limit, offset: params.offset } }
  );
  const parsedApiResponse = parseApiResponsePagingDetails(apiResponse.data);
  const parsedTrips = parseTripArray(parsedApiResponse.data);
  return [parsedApiResponse.paging, parsedTrips];
};

export default {
  getTrips
};