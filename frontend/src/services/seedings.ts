import axios from 'axios';
import { seeding } from '../stores';
import { get } from 'svelte/store';
import type { Seeding } from '../utils/interfaces';
import { parseApiResponse, parseSeeding } from '../utils/validation';

const baseUrl = `${process.env.API_URL}/seeding`;

let polling;
let fetchingSeeding: boolean = false;

/**
 * Fetches the latest Seeding from API. 
 * On error undefined is returned.
 */
const getLatestSeeding = async (): Promise<Seeding|undefined> => {
  try {
    const response = await axios.get(baseUrl);
    const parsedApiResponse = parseApiResponse(response.data);
    const parsedSeeding = parseSeeding(parsedApiResponse.data);
    return parsedSeeding;
  } catch (error) {
    return undefined;
  }
};

/**
 * Fetch Seeding and set it to store.
 */
const fetchSeedingFromApiAndSetToStore = async () => {
  fetchingSeeding = true;
  const seedingFromApi = await getLatestSeeding();
  seeding.set(seedingFromApi);
  fetchingSeeding = false;
};

/**
 * This method is called from setInterval. If a succesfull seeding is
 * returned from API, polling is cancelled.
 */
const poll = async () => {
  if (fetchingSeeding) {
    return;
  }

  await fetchSeedingFromApiAndSetToStore();

  if (get(seeding) && get(seeding).latestSeeding !== null) {
    clearInterval(polling);
  }
};

/**
 * Starts polling the API and sets the response to seeding store.
 * Polling is stopped when a a succesfull seeding is received.
 */
const startPollingSeedingApi = async () => {
  await fetchSeedingFromApiAndSetToStore();
  if (polling) {
    clearInterval(polling);
  }
  polling = setInterval(poll, 5000);
};

export default {
  startPollingSeedingApi
};